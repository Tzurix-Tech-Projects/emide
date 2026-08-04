# PRD — EMIDÊ: de catálogo estático para loja funcional

> **Estado atual:** a loja está preservada atrás de
> `NEXT_PUBLIC_STORE_ENABLED=false` para permitir o lançamento institucional.
> Os itens necessários para reativação estão em `BACKLOG-LOJA.md`.

## Problem Statement
Hoje o site EMIDÊ é uma vitrine estática: produtos vivem hardcoded em `lib/products.ts`, o carrinho só existe no `localStorage` do navegador, e o "checkout" é uma mensagem de WhatsApp gerada em runtime que não fica registrada em lugar nenhum. Isso significa: (1) qualquer mudança de produto exige deploy de código, (2) não existe histórico de pedidos — se o cliente fecha o WhatsApp ou a conversa some, o pedido some junto, (3) não há como saber quantos pedidos entraram, status, ou dados do cliente sem vasculhar o WhatsApp manualmente. Isso trava crescimento: catálogo não escala além do que um dev consegue editar, e não há visibilidade operacional sobre vendas.

## Goals
1. Produtos passam a ser cadastrados/editados via painel admin, sem deploy — tempo de publicar um produto novo cai de "PR + deploy" para minutos.
2. Todo pedido enviado pelo cliente fica persistido no banco antes de abrir o WhatsApp, com itens, valores e dados do cliente.
3. Painel admin permite ver lista de pedidos e mudar status (novo → confirmado → enviado), dando visibilidade operacional que hoje não existe.
4. Fluxo de compra do cliente (loja → carrinho → WhatsApp) não piora em nenhum passo — mesma fricção de hoje ou menor.
5. Zero downtime de catálogo durante a migração: produtos atuais de `lib/products.ts` migram para o banco sem perda de dados.

## Non-Goals
- **Pagamento online (cartão/Pix integrado)**: fora de escopo. O fechamento continua via WhatsApp — negociação de pagamento é manual, como hoje. Motivo: adicionar gateway de pagamento é outro projeto inteiro (compliance, taxas, conciliação).
- **Autenticação/conta para o cliente final**: cliente da loja continua sem login, comprando como visitante. Motivo: fricção desnecessária para o modelo atual de checkout via WhatsApp.
- **Gestão de estoque com baixa automática**: painel não vai controlar quantidade disponível por SKU nesta fase. Motivo: sem integração de pagamento, não há momento determinístico de "venda confirmada" para baixar estoque automaticamente — fica para fase futura.
- **Multi-usuário/permissões granulares no admin**: um único papel de admin (dono da loja). Sem RBAC. Motivo: operação é pequena, não há hoje mais de uma pessoa gerenciando.
- **Notificações automáticas (email/push) de status de pedido**: cliente não recebe atualização automática de status — comunicação de andamento continua pelo próprio WhatsApp manualmente. Motivo: exigiria serviço de email/SMS extra, não crítico pro MVP.

## User Stories

**Dono da loja (admin)**
- Como dono da loja, quero fazer login num painel protegido para que só eu (ou quem eu autorizar) gerencie produtos e pedidos.
- Como dono da loja, quero cadastrar um produto novo (nome, categoria, preço, variante, tamanhos, descrição, imagem, modo buy/quote) sem precisar de deploy, para publicar rápido.
- Como dono da loja, quero editar ou desativar um produto existente para corrigir preço/descrição ou tirar de circulação sem apagar histórico.
- Como dono da loja, quero ver a lista de pedidos recebidos, mais recentes primeiro, com itens e valor total, para acompanhar o volume de vendas.
- Como dono da loja, quero mudar o status de um pedido (novo / confirmado / enviado / cancelado) para ter controle do fluxo operacional.
- Como dono da loja, quero ver os dados de contato do cliente em cada pedido para conseguir localizá-lo fora do WhatsApp se a conversa se perder.

**Cliente da loja**
- Como cliente, quero navegar o catálogo e montar meu carrinho exatamente como hoje, sem fricção nova.
- Como cliente, ao finalizar o pedido, quero ser redirecionado ao WhatsApp com a mensagem pronta, como já acontece hoje — só que agora meu pedido também fica registrado.
- Como cliente, se um produto ficar indisponível/desativado, quero que ele simplesmente não apareça na loja (sem erro quebrado).

**Edge cases**
- Como dono da loja, se eu editar o preço de um produto depois que um pedido já foi feito, quero que o pedido antigo mantenha o preço registrado no momento da compra (não o preço atual).
- Como cliente, se eu tentar montar um pedido e a conexão falhar ao salvar no banco, quero ainda conseguir ser redirecionado ao WhatsApp (checkout não pode travar por causa da persistência).

## Requirements

### Must-Have (P0)
**Schema Supabase — produtos**
- Tabela `products`: id, slug (unique), name, category, price (nullable), variant, sizes (array/jsonb), description, mode (buy/quote), image_url, active (bool, default true), created_at, updated_at.
- Acceptance: migração populada com os 8 produtos atuais de `lib/products.ts` sem perda de campo.

**Schema Supabase — pedidos**
- Tabela `orders`: id, customer_name, customer_phone, customer_address (nullable), status (enum: novo/confirmado/enviado/cancelado, default novo), subtotal, created_at.
- Tabela `order_items`: id, order_id (fk), product_id (fk), product_name_snapshot, variant_snapshot, price_snapshot, qty.
- Acceptance: preço e nome do produto são congelados no momento do pedido (snapshot), não recalculados via join.

**Leitura do catálogo pela loja**
- `app/loja` e `app/produto/[slug]` passam a buscar produtos do Supabase (Server Component / React Query conforme já padronizado no CLAUDE.md) em vez de importar `PRODUCTS` estático.
- Só produtos com `active = true` aparecem na loja.
- Acceptance: Given um produto com `active = false`, When a loja carrega, Then ele não aparece na listagem nem é acessível por URL direta (404).

**Checkout registra pedido antes do WhatsApp**
- Ao clicar em finalizar pedido, sistema grava `orders` + `order_items` no Supabase e só então redireciona pro `wa.me` com a mensagem (mesmo formato de hoje).
- Se a gravação falhar, o redirecionamento ao WhatsApp acontece mesmo assim (não bloqueia o cliente) — falha é logada, não impede a venda.
- Acceptance: Given carrinho com 2 itens, When cliente finaliza, Then existe 1 registro em `orders` com 2 `order_items` e o wa.me abre com a mesma mensagem que abre hoje.

**Admin — autenticação**
- Rota `/admin` protegida via Supabase Auth (email/senha). Usuário não autenticado é redirecionado para `/admin/login`.
- Acceptance: acessar `/admin` sem sessão redireciona para login; com sessão válida, carrega o painel.

**Admin — CRUD de produtos**
- Listagem de produtos (inclui inativos, com indicação visual).
- Formulário de criar/editar produto com os campos do schema.
- Ação de ativar/desativar (soft delete, não exclusão física).
- Acceptance: criar produto no admin faz ele aparecer na loja pública em até um refresh, sem deploy.

**Admin — lista e status de pedidos**
- Listagem de pedidos ordenada por `created_at desc`, mostrando cliente, itens, subtotal, status.
- Ação de mudar status (dropdown ou botões: novo/confirmado/enviado/cancelado).
- Acceptance: mudar status no admin persiste e reflete na próxima leitura da lista.

### Nice-to-Have (P1)
- Upload de imagem de produto direto no admin (Supabase Storage) em vez de exigir caminho manual em `public/produtos/`.
- Busca/filtro por categoria e status na listagem de pedidos e produtos do admin.
- Campo de observação/nota interna por pedido (texto livre, só visível no admin).
- Exportar pedidos filtrados por período em CSV.

### Future Considerations (P2)
- Controle de estoque por SKU com baixa automática ligada a confirmação de pedido.
- Múltiplos usuários admin com papéis (ex: atendente só vê pedidos, não edita produtos).
- Notificação automática ao cliente (WhatsApp Business API ou email) quando status do pedido muda.
- Pagamento online integrado (Pix/cartão) como alternativa ao fechamento manual via WhatsApp.

## Success Metrics
**Leading (dias a semanas)**
- 100% dos produtos atuais migrados e visíveis na loja sem regressão visual/funcional.
- Tempo de publicar produto novo: de "requer PR" para < 5 min via admin.
- Taxa de erro no fluxo de checkout (registro de pedido) < 1% das tentativas.

**Lagging (semanas a meses)**
- Volume de pedidos rastreados no admin vs. estimativa manual anterior (hoje: zero rastreamento formal) — meta: 100% dos pedidos WhatsApp têm registro correspondente no banco.
- Redução de tempo do dono da loja gasto organizando pedidos manualmente (medida qualitativa via feedback direto).

## Status da implementação
As três fases previstas foram entregues: schema no Supabase, catálogo lido do
banco, pedido gravado antes do redirecionamento ao WhatsApp, e painel com
autenticação, CRUD de produtos e status de pedidos.

## Open Questions
- Convenção de imagens: os 8 produtos migrados ainda apontam para caminhos em
  `public/produtos/`, e os arquivos não existem. Definir se as fotos vão para o
  Supabase Storage pelo painel ou se os arquivos são publicados nessa pasta. — **dono do produto**
- Formato de telefone do cliente no pedido: validar e formatar (DDI+DDD) ou
  aceitar texto livre? Hoje é texto livre. — **dono do produto**
- RLS: confirmar que o modelo aplicado (leitura pública só de produtos ativos,
  escrita restrita a autenticados) atende à operação. — **engenharia**

## Timeline Considerations
- Sem prazo contratual externo. O fasamento seguido foi:
  1. **Fase 1 (fundação)**: schema Supabase (products, orders, order_items),
     migração dos 8 produtos e loja lendo do banco.
  2. **Fase 2 (checkout)**: gravação do pedido antes do redirect ao WhatsApp.
  3. **Fase 3 (admin)**: auth, CRUD de produtos e listagem/status de pedidos.
