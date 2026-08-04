# EMIDÊ — Inteligência Olfativa

Site institucional de perfumaria de ambientes com uma loja preservada atrás de
feature flag, checkout via WhatsApp e painel administrativo. Next.js 15 (App
Router), TypeScript, Tailwind, Framer Motion e Supabase.

## Rodar localmente

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Abra http://localhost:3000

## Variáveis de ambiente

Todas em `.env.local` (modelo em `.env.local.example`):

| Variável | Para que serve |
|---|---|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número que recebe pedidos e propostas (DDI+DDD+número, só dígitos). Sem um número válido, o institucional usa o Instagram como fallback. |
| `NEXT_PUBLIC_STORE_ENABLED` | `false` no lançamento institucional. Só usar `true` após concluir `BACKLOG-LOJA.md`. |
| `NEXT_PUBLIC_SITE_URL` | Domínio público. Alimenta canonical, Open Graph e `sitemap.xml`. |
| `NEXT_PUBLIC_SUPABASE_URL` | Projeto Supabase. Também define o host liberado para imagens em `next.config.mjs`. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave pública do Supabase. |

## Estrutura

```
app/
  layout.tsx              Metadados, skip link, Providers, Header, Footer, CartDrawer
  page.tsx                Home institucional; coleção e destaques entram apenas com a loja ativa
  loja/                   Catálogo com filtro por categoria refletido na URL
  produto/[slug]/         Detalhe do produto (SSG por slug) com schema Product
  admin/                  Painel: login, CRUD de produtos, lista e status de pedidos
  robots.ts · sitemap.ts  SEO técnico
  icon.svg                Favicon
  fonts.ts                Slot das fontes da marca, hoje em fallback
  globals.css             Tokens de foco, ritmo de seção, botões e campos
components/
  Header · Footer · Hero · ProductCard · CartDrawer
  FAQ · Reveal · WhatsAppActions
lib/
  products.ts             Leitura pública do catálogo
  admin.ts                Leitura e escrita do painel
  cart.tsx                Carrinho (Context + localStorage)
  orders.ts               Gravação do pedido via RPC create_order
  whatsapp.ts             URLs wa.me e formatação de preço
  site.ts                 Nome, domínio e descrição do site
```

## Como funciona o checkout

O carrinho vive no cliente (Context + `localStorage`). Ao finalizar, o pedido é
gravado no Supabase e o cliente é levado ao `wa.me` com a mensagem montada por
`buildOrderUrl`. Se a gravação falhar, o redirecionamento acontece assim mesmo:
a venda não trava por causa da persistência.

Produtos com `mode: "quote"` não entram no carrinho — abrem uma mensagem de
proposta B2B.

## Identidade, fotos e fontes

- **Logos oficiais**: `public/brand/emide-logo-dark.png`,
  `emide-logo-light.png` e `emide-symbol.png`.

- **Fotos institucionais**: seleção do lançamento em
  `public/images/institucional/`. Fotos do catálogo continuam cadastradas pelo
  painel ou em `public/produtos/`; ver `public/produtos/README.txt`.
- **Fontes**: Hermione e Articulat CF Light. Coloque os `.woff2` licenciados em
  `public/fonts/` e descomente os blocos em `app/fonts.ts`. A entrega dos
  arquivos é uma dependência obrigatória antes da publicação final.

## Paleta

| Token | Hex | Uso |
|---|---|---|
| `charcoal` | `#1D1D1B` | Texto forte, seção profissional |
| `forest` | `#0D3120` | Superfície institucional de apoio, faixas e CTA final |
| `gold` | `#D5A72C` | Detalhe sobre fundo escuro |
| `gold-light` | `#E6D14C` | Texto e bordas sobre fundo escuro |
| `gold-dark` | `#AB7311` | Linhas e detalhes sobre fundo claro |
| `mist` | `#F5F4F1` | Fundo de seção |

> **Contraste:** os dourados da marca reprovam em AA como texto pequeno sobre
> branco e como botão com texto branco. Por isso ações e texto funcional sobre
> fundo claro usam `forest`; dourados ficam em detalhes ou sobre fundos escuros
> com contraste medido. Não mude sem medir novamente.

## Verificações

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Deploy

Vercel. Configure as cinco variáveis de ambiente no painel do projeto antes do
primeiro deploy de produção. O projeto deve receber um vínculo Vercel próprio;
não use o vínculo `tzurix` encontrado no diretório pai.

## Estado do lançamento

- Institucional: ativo por padrão.
- Loja pública: desativada por padrão.
- Continuação da loja: ver `BACKLOG-LOJA.md`.
