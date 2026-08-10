# EMIDÊ — Diretrizes de design

Referência de direção de arte e interface do site. Leia antes de mexer em
layout, tipografia, cor ou movimento.

## 1. Contexto

Perfumaria de ambientes premium. Público: empresas, arquitetos, hotéis,
clínicas, escritórios e clientes de alto padrão. O clima é "quiet luxury"
editorial: cada elemento respira. O lançamento atual é institucional; a loja
permanece preservada no código e só volta ao ar após o backlog de produção.

## 2. Decisões que costumam ser revertidas por engano

- **Hermione é obrigatória nos títulos.** O site é editorial, não um dashboard.
- **Articulat CF Light é obrigatória no corpo e na interface.** Os arquivos
  licenciados estão em `public/fonts/`; não substituir por Inter, Sora ou
  outra família em produção.
- **Dourado é o acento; verde é superfície de apoio.** A base escura oficial é
  `#1D1D1B` e o verde institucional `#0D3120` entra em faixas, CTAs e seções
  escuras pontuais. Sem glow, sem glassmorphism e sem gradiente chamativo fora
  do dourado da própria marca.

## 3. Tokens

Fonte da verdade: `tailwind.config.ts`.

```
charcoal    #1D1D1B   base escura oficial, texto forte e seção profissional
forest      #0D3120   superfície institucional de apoio e CTA final
gold-light  #E6D14C   destaque claro sobre fundo escuro
gold        #D5A72C   dourado principal e detalhes
gold-dark   #AB7311   linhas e detalhes sobre fundo claro; não usar em texto pequeno
paper       #FFFFFF   fundo
mist        #F5F4F1   fundo de seção
line        #D7D4CC   divisores de 1px com contraste reforçado
ink         #3F3F3B   corpo de texto secundário; 10,58:1 sobre branco
```

Regra de contraste: `gold` e `gold-dark` reprovam em AA como texto pequeno
sobre branco e como botão com texto branco. Em fundo claro, ações e texto
funcional usam `forest`; dourados ficam em linhas, detalhes não textuais ou
texto claro sobre superfícies escuras com contraste medido.

Tipografia: `font-sans` = Articulat CF Light 300 em tudo; `font-display` =
Hermione 400 apenas como acento.

O arquivo entregue é o `HERMIONE-DEMO`: **29 codepoints, só A-Z maiúsculo**, sem
minúsculas, dígitos ou acentos. Por isso a Hermione **não** é aplicada
automaticamente. Antes, cada palavra sem acento virava serif e cada palavra
acentuada virava sans, o que fazia o título alternar duas fontes sem lógica
visível para quem lê. Hoje a regra é:

- O título inteiro é Articulat.
- `DisplayAccent` marca **um** trecho escolhido a dedo para receber Hermione, e
  só aplica se o texto couber em A-Z; fora disso continua em Articulat. Nunca há
  troca de fonte no meio da palavra.
- Preços, números e texto corrido usam somente Articulat, com `.tabular` onde o
  valor muda (preço, quantidade, telefone).

Escala: use os tamanhos fluidos `text-display-xl/lg/md/sm` e `text-lead`, que
interpolam por `clamp()` entre 375px e 1440px em vez de saltar por breakpoint.

Entrelinha: títulos em caixa alta em português precisam de mais respiro que o
usual, porque Ê, Ã e Ç sobem acima da altura de caixa. Os tokens já trazem
line-height entre 1.12 e 1.22; não aperte abaixo disso ou os acentos são
cortados — especialmente dentro de máscaras de animação. Corpo 1.8. Síntese
artificial de pesos fica desativada.

## 4. Logos oficiais

- Versão principal escura: `public/brand/emide-logo-dark.png`.
- Versão clara: `public/brand/emide-logo-light.png`.
- Símbolo fornecido: `public/brand/emide-symbol.png`.
- Não redesenhar, recolorir, distorcer ou remontar o lettering.
- **Pendência:** a versão clara tem fundo verde chapado, não transparente, e por
  isso vira uma placa verde sobre qualquer superfície escura. Hoje o site usa só
  a versão escura. Para aplicar o logo sobre fundo escuro, falta o lockup claro
  em PNG/SVG com fundo transparente.
- Sempre preservar proporção, área de respiro e legibilidade.

## 5. Fotografia

- Priorizar ambientes quentes, madeira, luz suave e o produto integrado ao
  espaço. A imagem deve comunicar aplicação, não apenas inventário.
- Na home, usar uma seleção curta: uma cena ambiental no hero, uma imagem por
  solução e uma composição na seção sobre.
- Não usar artes com preço ou texto promocional embutido em seções permanentes.
- Imagens abaixo da dobra usam `next/image`, proporção reservada e carregamento
  tardio.
- **Vídeo do hero:** exportar sem áudio, com `-movflags +faststart`, em MP4
  (H.264) e WebM (VP9), mais um pôster JPG do primeiro segundo. Manter cada
  arquivo abaixo de ~2 MB.
- **Pendência:** o vídeo atual tem a marca d'água do gerador (estrela de quatro
  pontas) no canto inferior direito, por volta de x 1105 / y 690 em 1280×720.
  O enquadramento a esconde em 1440px e no mobile, mas ela aparece em telas
  intermediárias (1024×768, por exemplo). Precisa de uma exportação limpa ou de
  autorização para reenquadrar.

## 6. Regras aplicadas

- **Sem emoji.** Ícones vêm de `@phosphor-icons/react`, weight `light`, e são
  `aria-hidden` quando acompanham texto.
- **Hero full-bleed escuro, texto à esquerda.** O fundo é um vídeo em loop
  (`public/video/hero.mp4` e `.webm`), mudo, sem controles e decorativo, sob
  duas camadas de escurecimento: uma uniforme e um degradê que abre contraste do
  lado do texto. A cena é clara, então o degradê precisa segurar mais que sobre
  uma foto escura. Não centralize o conteúdo nem use arte promocional com preço
  como hero.
- **O vídeo nunca toca sozinho com movimento reduzido.** Não há atributo
  `autoplay`: o `play()` só é chamado depois de checar
  `prefers-reduced-motion`, e o pôster cobre o caso em que o navegador recusa.
- **O hero é a única exceção de caixa.** O título dele é caixa baixa
  (`normal-case`), conforme a referência aprovada; as demais seções seguem em
  caixa alta. Uma palavra recebe o dourado `gold` como ênfase.
- **O hero começa abaixo do header**, com margem superior equivalente à altura
  dele. A foto não passa por trás da navegação, e o header segue com o logo
  escuro sobre fundo claro em todas as páginas.
- **Sem fileira de três cards iguais.** Listas com `divide-y`, grades
  assimétricas ou numeração editorial.
- **Cards só quando elevam hierarquia.** Produto usa sombra neutra em carvão,
  não glow. Categorias e etapas usam grade de 1px, sem caixa.
- **Grade de 1px**: borda esquerda e superior no container, borda inferior e
  direita em cada item. Não use `gap-px` com fundo colorido: a célula vazia da
  última linha vira um bloco cinza visível.
- **Raio de borda**: `rounded-sm` em controles (botão, campo, pill). Imagens e
  blocos de conteúdo são retos.
- **Ritmo vertical**: use `.section-tight`, `.section` e `.section-wide` de
  `globals.css`. Seções consecutivas não devem repetir o mesmo degrau.
- **Foco visível**: `:focus-visible` global desenha um anel com
  `var(--focus-ring)`. Seções escuras recebem a classe `.on-dark`, que troca o
  anel para `gold-light`. Nunca use `outline-none` sem substituir o indicador.
- **Movimento**: GSAP com ScrollTrigger é a única biblioteca de animação. Só
  `transform` e `opacity`, isolado em client leaves (`Reveal`, `Hero`,
  `ScrollProgress`, `ProductCard`, `CartDrawer`). O hero usa paralaxe suave e
  revelação do título linha a linha com `SplitText`; seções entram de forma
  direcional; a barra superior indica progresso de leitura.
  - Toda animação passa pelo hook `useGsap`, que roda dentro de
    `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`. Com movimento
    reduzido o callback não roda: nada é animado e o DOM nem é tocado.
  - O conteúdo nunca depende da animação para existir. O HTML do servidor sai
    visível e a regra `[data-reveal]` do CSS garante isso mesmo sem JavaScript.
  - Abrir/fechar simples (FAQ, estados de hover) fica em CSS, não em JS.
  - Microinterações entre 150–300ms, transições complexas até 480ms, saída mais
    curta que a entrada. Sem animação infinita.
- **Estados**: onde há dados, existem vazio, carregando e erro. Campos têm
  rótulo visível acima, não só placeholder. Botão desativado explica o motivo.
- **Mobile**: `min-h-[100dvh]`, nunca `h-screen`. Grades caem para uma coluna
  abaixo de `sm`. Container de 1280px centralizado.
- **Dados**: nada de preço redondo falso, "John Doe" ou "Acme". Preços e nomes
  vêm do catálogo real.

## 7. Copy

Frase curta, específica, verificável. Descreva o que o produto é e o que ele
faz. Evite construção vaga ("transforme sua experiência", "eleve seu negócio"),
tricolon decorativo ("vidro, essência e tempo") e antítese com travessão
("não se impõe, permanece"). Travessão com moderação: um por parágrafo, no
máximo. Não invente número, cliente, resultado ou depoimento.

## 8. Pré-entrega

- [ ] Seções full-height com `min-h-[100dvh]`.
- [ ] Nenhum emoji; ícones Phosphor weight light e `aria-hidden` quando decorativos.
- [ ] Dourado sobre branco não é texto pequeno; ações claras usam `forest`.
- [ ] Foco visível em todo controle; seções escuras com `.on-dark`.
- [ ] Animação respeita `prefers-reduced-motion`.
- [ ] Vazio, carregando e erro presentes onde há dados.
- [ ] Uma coluna em mobile, sem scroll horizontal.
- [ ] Targets interativos com no mínimo 44×44px.
- [ ] Logo oficial usado sem alteração de proporção ou cor.
- [x] Hermione e Articulat CF Light carregadas a partir de arquivos licenciados.
- [ ] Loja continua desativada enquanto `NEXT_PUBLIC_STORE_ENABLED=false`.
- [ ] `npm run lint`, `npx tsc --noEmit` e `npm run build` passam.
