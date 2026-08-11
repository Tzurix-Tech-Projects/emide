# Fontes oficiais da EMIDÊ

- `Hermione.woff2`: display, peso 400.
- `Articulat-CF-Light.woff2`: corpo e interface, peso 300.

Ambas são carregadas por `next/font/local` em `app/fonts.ts` com
`font-display: swap`. Só a Articulat tem preload: a Hermione aparece apenas em
trechos marcados por `DisplayAccent` e não justifica o custo em toda página. A redistribuição deve continuar respeitando a licença
fornecida pela titular da marca.
