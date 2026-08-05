# EMIDÊ — Backlog para concluir a loja

Este documento preserva o trabalho necessário para reativar a loja com
segurança. O lançamento atual é institucional e mantém
`NEXT_PUBLIC_STORE_ENABLED=false`.

## Regra de ativação

A loja só pode voltar ao ar quando todas as tarefas P0 estiverem concluídas,
validadas em produção e aprovadas pela responsável da EMIDÊ. A ativação é feita
com `NEXT_PUBLIC_STORE_ENABLED=true` em um projeto Vercel exclusivo da marca.

## Dependências do cliente

- [x] Confirmar o uso da `HERMIONE-DEMO` fornecida, limitada a A-Z. Em
      04/08/2026 foi aprovado o uso em títulos em caixa alta, com Articulat CF
      Light nos caracteres acentuados que não existem no arquivo.
- [x] Confirmar os números oficiais de WhatsApp. O conteúdo entregue em
      04/08/2026 informa `(13) 99150-4516` e `(13) 99167-5615`.
- [x] Confirmar o endereço comercial informado no conteúdo: Av. Bernardino de
      Campos, 18 — Sala 408, Vila Belmiro, Santos/SP.
- [ ] Confirmar e-mail, Instagram, razão social e CNPJ.
- [ ] Aprovar todas as afirmações comerciais e técnicas da home, FAQ e produtos.
- [ ] Aprovar os textos dos cases Doin Motors, Clinvet Hospital Veterinário e
      Michael Kors, incluindo autorização para citar as marcas.
- [ ] Entregar os logos oficiais e autorizações das empresas que poderão compor
      a grade de prova social. Não publicar logos simulados.
- [ ] Entregar fontes verificáveis para os percentuais de 40%, 84% e 30%
      sugeridos no conteúdo. Até lá, manter apenas benefícios qualitativos.
- [x] Entregar fotografias para a home institucional; curadoria do lançamento
      salva em `public/images/institucional/`.
- [ ] Aprovar a seleção final de fotografias por SKU para o catálogo da loja.
- [ ] Definir frete, prazo, formas de pagamento, troca, devolução e atendimento.

## Fase 1 — Identidade e conteúdo do catálogo (P0)

### Trabalho

- [x] Instalar Hermione e Articulat CF Light com `next/font/local`.
- [x] Aplicar Hermione nos títulos em caixa alta e Articulat como fallback
      exclusivo dos acentos, sem fallback tipográfico do sistema.
- [x] Gerar favicon e ícones sociais a partir do símbolo oficial, sem distorção.
- [x] Mapear as fotos recebidas aos oito SKUs, selecionar capa e galeria e gerar
      as versões finais locais em WebP/AVIF.
- [x] Impedir o uso dos caminhos locais inexistentes em `/produtos/*.jpg` por
      meio do mapa canônico `lib/product-images.ts`.
- [x] Revisar nome, variante, volume, descrição, preço e disponibilidade de cada item.
- [x] Criar proposta de imagem Open Graph 1200×630 com o logo oficial.
- [ ] Aprovar com a marca a seleção fotográfica, o catálogo revisado e a imagem Open Graph.

### Estado da Fase 1 em 04/08/2026

- Articulat CF Light, favicon, Apple icon, Open Graph, capas e galerias estão
  implementados. A Hermione DEMO foi aprovada para títulos em caixa alta, com
  fallback Articulat somente nos caracteres acentuados.
- A revisão factual e as fontes de cada foto estão em `docs/CATALOGO-FASE-1.md`.
- O Supabase ainda guarda os oito caminhos JPG antigos. A chave pública não tem
  permissão de atualização (RLS), então o runtime usa o mapa local sem gerar 4xx.
- Publicação no bucket `produtos` e aprovação comercial permanecem dependências
  de uma sessão administrativa e da responsável da EMIDÊ.

### Artefatos

- `public/fonts/*.woff2`
- `public/brand/`
- imagens publicadas no bucket `produtos`
- catálogo aprovado no Supabase

### Critérios de aceite

- Nenhuma requisição de imagem retorna 4xx.
- O navegador confirma Hermione nos títulos e Articulat CF Light no corpo.
- Logo, favicon e compartilhamento social usam ativos oficiais.
- A cliente aprova o catálogo e a apresentação visual em desktop e mobile.

## Fase 2 — Catálogo realmente dinâmico (P0)

### Trabalho

- [ ] Remover a geração estática permanente da home e de `/loja`, ou adicionar
      revalidação/invalidação compatível com o painel.
- [ ] Invalidar a home, a loja e a página do produto após criar, editar, ativar
      ou desativar um item.
- [ ] Garantir que produtos inativos retornem 404 e não apareçam no sitemap.
- [ ] Tratar indisponibilidade do Supabase com estado de recuperação.

### Critérios de aceite

- Um produto criado no painel aparece na loja sem novo deploy.
- Alterações de preço e descrição aparecem após a invalidação esperada.
- Produto desativado some da listagem e sua URL retorna 404.
- A home institucional continua disponível se o catálogo falhar.

## Fase 3 — Checkout e pedidos (P0)

### Trabalho

- [ ] Corrigir o fluxo para aguardar a tentativa de gravação antes de abrir o WhatsApp.
- [ ] Evitar pedido duplicado em clique repetido com idempotência.
- [ ] Validar e normalizar telefone, quantidade, preço e endereço.
- [ ] Exibir estados de envio, sucesso e falha com recuperação clara.
- [ ] Confirmar que snapshots preservam nome, variante e preço do momento da compra.
- [ ] Definir comportamento quando o WhatsApp estiver indisponível ou bloqueado.

### Critérios de aceite

- Um carrinho com dois itens gera um pedido e dois itens no banco.
- O WhatsApp só abre depois da tentativa de persistência.
- Clique repetido não cria pedidos duplicados.
- Falha no banco não impede o contato, mas fica observável e compreensível.

## Fase 4 — Segurança e banco reproduzível (P0)

### Trabalho

- [ ] Versionar schema, migrations, funções RPC, índices, triggers e seed.
- [ ] Versionar e testar RLS de `products`, `orders`, `order_items` e Storage.
- [ ] Permitir leitura anônima apenas de produtos ativos.
- [ ] Impedir leitura anônima de pedidos e dados pessoais.
- [ ] Restringir CRUD, upload e mudança de status a administradores autorizados.
- [ ] Proteger as rotas do painel no servidor, além do redirecionamento no cliente.
- [ ] Adicionar testes automatizados de acesso anônimo e autenticado.

### Critérios de aceite

- Usuário anônimo não lê nem altera pedidos, itens ou produtos inativos.
- Usuário autenticado não ganha acesso administrativo apenas por estar logado;
  deve pertencer à lista/papel autorizado.
- Migrations recriam um ambiente vazio sem operações manuais.
- Testes de RLS passam contra a API real local ou de staging.

## Fase 5 — Legal, privacidade e operação (P0)

### Trabalho

- [ ] Publicar aviso de privacidade com finalidade, base legal, retenção,
      compartilhamentos e canal para direitos do titular.
- [ ] Publicar razão social, CNPJ, endereço e canais de atendimento.
- [ ] Publicar condições de pagamento, entrega, troca, devolução e arrependimento.
- [ ] Definir retenção e exclusão de dados de pedidos.
- [ ] Documentar quem atende pedidos e quem administra o catálogo.

### Critérios de aceite

- Cliente entende quais dados são coletados antes de finalizar.
- Informações empresariais e condições da oferta ficam acessíveis no rodapé.
- Existe responsável operacional pelo pedido do recebimento ao encerramento.

## Fase 6 — Qualidade e observabilidade (P1)

- [ ] Testes E2E: catálogo, filtro, produto, carrinho, checkout, login e admin.
- [ ] Testes de teclado, leitor de tela, 375px, tablet e landscape.
- [ ] Corrigir foco do drawer: trap, retorno ao acionador e rota de escape.
- [ ] Monitorar erros de checkout e integração com Supabase.
- [ ] Configurar analytics com consentimento quando aplicável.
- [ ] Configurar Search Console, sitemap e medição de conversões.
- [ ] Medir Core Web Vitals com imagens e fontes finais.

## Fase 7 — Deploy e ativação (P0)

### Preparação

- [ ] Criar projeto Vercel exclusivo para a EMIDÊ com root directory
      `CLIENTES/emide-loja` ou repositório próprio.
- [ ] Não reutilizar o vínculo Vercel `tzurix` do diretório pai.
- [ ] Configurar todas as variáveis de produção e preview.
- [ ] Validar DNS, HTTPS, canonical, robots e sitemap no domínio final.
- [ ] Fazer backup do banco antes da ativação.

### Cutover

1. Validar staging com `NEXT_PUBLIC_STORE_ENABLED=true`.
2. Executar checklist funcional, visual, legal e de segurança.
3. Aprovar com a responsável da EMIDÊ.
4. Ativar a flag em produção e publicar.
5. Monitorar erros, pedidos e contatos nas primeiras horas.

### Rollback

- Voltar `NEXT_PUBLIC_STORE_ENABLED=false` e publicar novamente.
- O institucional permanece disponível e o banco não é removido.
- Registrar o motivo do rollback antes de uma nova tentativa.

## Encerramento

A loja é considerada concluída somente quando os P0 estiverem aprovados, o
deploy estiver isolado, o domínio responder por HTTPS e pelo menos um pedido de
teste tiver percorrido catálogo, carrinho, banco, painel e contato sem falhas.
