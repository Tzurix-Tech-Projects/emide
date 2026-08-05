# CLAUDE.md — EMIDÊ

Loja de perfumaria de ambientes premium com painel administrativo. Next.js 15
(App Router), TypeScript, Tailwind, Framer Motion, Phosphor icons, Supabase.
Checkout via WhatsApp.

## Antes de mexer no design
Leia `DESIGN.md`. Pontos que costumam ser "corrigidos" por engano e NÃO devem ser:
- Serif (Hermione) nos títulos é intencional (site editorial).
- Corpo é Articulat CF Light; os dois arquivos oficiais são locais e obrigatórios.
- `gold` (#D5A72C) e `gold-dark` (#AB7311) não são texto pequeno sobre branco
  nem botão com texto branco. Ações claras usam `forest` (#0D3120).
- Base escura oficial é `#1D1D1B`; acentos oficiais são `#E6D14C`,
  `#D5A72C` e `#AB7311`.
- Verde `#0D3120` é superfície institucional de apoio, não substitui o carvão
  nem compete com o dourado como acento.
- Use somente os logos oficiais em `public/brand/`, sem redesenhar ou recolorir.
- Na home, use a seleção de `public/images/institucional/`; evite artes com
  preço ou texto promocional embutido em seções permanentes.
- Grade de 1px vem de bordas nos itens, não de `gap-px` com fundo colorido.

## Fonte da verdade
- Catálogo público: `lib/products.ts` (lê do Supabase)
- Painel: `lib/admin.ts`
- Carrinho: `lib/cart.tsx` (Context + localStorage)
- Pedido: `lib/orders.ts` (RPC `create_order`)
- WhatsApp e preço: `lib/whatsapp.ts`
- Nome, domínio e descrição: `lib/site.ts`
- Tokens: `tailwind.config.ts`; utilitários de UI: `app/globals.css`

## Regras técnicas
- Animações só em `transform`/`opacity`, isoladas em client leaves com cleanup,
  e sempre atrás de `useReducedMotion`. Conteúdo nunca depende da animação para
  ficar visível.
- Full-height: `min-h-[100dvh]`, nunca `h-screen`.
- Zero emojis. Ícones Phosphor weight `light`, `aria-hidden` quando decorativos.
- Foco visível em todo controle. Nada de `outline-none` sem substituto.
- Sempre incluir empty/loading/error onde houver dados.
- Ritmo vertical pelas classes `.section-tight` / `.section` / `.section-wide`.

## Config obrigatória
`.env.local` com `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_SITE_URL`,
`NEXT_PUBLIC_STORE_ENABLED`, `NEXT_PUBLIC_SUPABASE_URL` e
`NEXT_PUBLIC_SUPABASE_ANON_KEY`.
Fotos curadas em `public/produtos/` e mapeadas por `lib/product-images.ts`.
Fontes licenciadas em `public/fonts/` e registradas em `app/fonts.ts`.

O lançamento institucional usa `NEXT_PUBLIC_STORE_ENABLED=false`. Não ative a
loja antes de concluir os P0 de `BACKLOG-LOJA.md`.

## Verificações
`npm run lint`, `npx tsc --noEmit`, `npm run build`.
