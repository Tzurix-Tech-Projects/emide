# EMIDÊ — Backlog para concluir a loja

Este documento preserva o trabalho necessário para reativar a loja com
segurança. O lançamento atual é institucional e mantém
`NEXT_PUBLIC_STORE_ENABLED=false`.

## Regra de ativação

A loja só pode voltar ao ar quando todas as tarefas P0 estiverem concluídas,
validadas em produção e aprovadas pela responsável da EMIDÊ. A ativação é feita
com `NEXT_PUBLIC_STORE_ENABLED=true` em um projeto Vercel exclusivo da marca.

## Dependências do cliente

- [ ] Fornecer os arquivos licenciados Hermione e Articulat CF Light em WOFF2.
- [ ] Confirmar o número oficial do WhatsApp em formato DDI + DDD + número.
- [ ] Confirmar e-mail, Instagram, razão social, CNPJ e endereço comercial.
- [ ] Aprovar todas as afirmações comerciais e técnicas da home, FAQ e produtos.
- [x] Entregar fotografias para a home institucional; curadoria do lançamento
      salva em `public/images/institucional/`.
- [ ] Aprovar a seleção final de fotografias por SKU para o catálogo da loja.
- [ ] Definir frete, prazo, formas de pagamento, troca, devolução e atendimento.

## Fase 1 — Identidade e conteúdo do catálogo (P0)

### Trabalho

- [ ] Instalar Hermione e Articulat CF Light com `next/font/local`.
- [ ] Gerar favicon e ícones sociais a partir do símbolo oficial, sem distorção.
- [ ] Mapear as fotos recebidas aos oito SKUs, selecionar capa e galeria e subir
      as versões finais em WebP/AVIF.
- [ ] Remover todos os caminhos locais inexistentes em `/produtos/*.jpg`.
- [ ] Revisar nome, variante, volume, descrição, preço e disponibilidade de cada item.
- [ ] Criar imagem Open Graph 1200×630 aprovada pela marca.

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
