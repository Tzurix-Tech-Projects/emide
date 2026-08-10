# CLAUDE.md — EMIDÊ

Loja de perfumaria de ambientes premium com painel administrativo. Next.js 15
(App Router), TypeScript, Tailwind, GSAP, Phosphor icons, Supabase.
Checkout via WhatsApp.

## Antes de mexer no design
Leia `DESIGN.md`. Pontos que costumam ser "corrigidos" por engano e NÃO devem ser:
- Títulos são Articulat CF Light. A Hermione entregue é o `HERMIONE-DEMO`, com
  29 codepoints (só A-Z maiúsculo): entra apenas via `DisplayAccent`, em trecho
  escolhido a dedo. Não volte a aplicá-la automaticamente por palavra.
- Corpo é Articulat CF Light; os dois arquivos oficiais são locais e obrigatórios.
- Caixa alta em português precisa de entrelinha folgada (1.12+). Apertar corta
  Ê, Ã e Ç, sobretudo dentro das máscaras de animação.
- Tamanhos de título saem dos tokens fluidos `text-display-*`, não de utilitários
  soltos por breakpoint.
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
- GSAP é a única biblioteca de animação. Toda animação passa pelo hook
  `useGsap` (`lib/use-gsap.ts`), que já isola escopo, limpa no unmount e só roda
  com `prefers-reduced-motion: no-preference`. Só `transform`/`opacity`.
  Conteúdo nunca depende da animação para ficar visível.
- Abrir/fechar simples fica em CSS (ver FAQ), não em JavaScript.
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
