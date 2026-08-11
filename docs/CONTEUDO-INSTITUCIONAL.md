# EMIDÊ — Conteúdo institucional

Registro da adaptação editorial realizada em 04/08/2026 a partir do conteúdo
fornecido pela marca. O objetivo é manter claro o que já está publicado, o que
foi adaptado para a web e o que ainda depende de comprovação ou aprovação.

## Conteúdo publicado

- Menu por âncoras: Início, Sobre, Soluções, Fragrâncias, Cases, Produtos, FAQ
  e Contato.
- Hero com proposta de valor, vídeo de ambiente sem áudio (com pôster para
  quem prefere movimento reduzido) e duas ações principais.
- Apresentação da EMIDÊ e explicação da aromatização profissional.
- Tecnologia, benefícios qualitativos, Linha Business e Linha Home.
- Fragrâncias exclusivas e processo criativo em três etapas.
- Produtos personalizados, segmentos atendidos e galeria de produtos.
- Cases fornecidos para Doin Motors, Clinvet Hospital Veterinário e Michael
  Kors.
- FAQ, CTA final, dois números de WhatsApp e endereço em Santos/SP.
- Título, descrição, Open Graph e dados estruturados de organização.

## Adaptações realizadas

- Os 15 blocos do texto original foram agrupados em uma jornada contínua para
  evitar repetição e excesso de rolagem sem perder os temas essenciais.
- Benefícios comerciais foram escritos de forma qualitativa, sem prometer
  resultados mensuráveis não comprovados.
- CTAs foram distribuídos por intenção: projeto B2B, Linha Home, produtos,
  apresentação e contato com especialista.
- Revisão de 11/08/2026: títulos e chamadas genéricos foram trocados por texto
  específico, sem acrescentar fato novo. O convite final passou a pedir o que a
  mensagem de WhatsApp já pergunta — tipo de ambiente, metragem e cidade. A
  faixa "Marcas que confiam na EMIDÊ" saiu por afirmar prova social que não
  existe no material aprovado.
- A identidade aprovada foi preservada: Articulat CF Light em títulos e corpo,
  Hermione reservada a acentos pontuais, verde `#0D3120`, preto `#1D1D1B` e
  dourados da marca.

## Pendências antes da aprovação definitiva

Revisão de 11/08/2026: cada pendência recebeu uma decisão de publicação para o
lançamento e um marcador `TODO(editorial)` no ponto exato do código. A decisão
diz o que vai ao ar agora; a pendência continua aberta até a marca responder.

- [ ] **FAQ — validação técnica.** Publicado com atribuição: "a especificação
      informada pela EMIDÊ é hipoalergênica" e "segundo a especificação dos
      equipamentos". O site relata a especificação, não afirma o fato. Só passe
      à afirmação direta com laudo ou ficha técnica. → `components/FAQ.tsx`
- [ ] **Cases — autorização de uso das marcas.** Decisão da marca: publicar
      Doin Motors, Clinvet e Michael Kors pelo nome. Enquanto a autorização não
      estiver documentada, o limite é o texto de desafio e solução — sem
      logotipo, foto de loja ou depoimento. Michael Kors é o nome mais exposto.
      Para anonimizar, basta trocar `client` pelo segmento.
      → `lib/institutional-content.ts`
- [x] **Grade de prova social.** Encerrada por remoção: a faixa que dizia
      "Marcas que confiam na EMIDÊ" saiu e deu lugar a um convite de contato.
      Não há grade de logos no código, então não há autorização a obter.
- [ ] **E-mail, Instagram, razão social e CNPJ.** E-mail e Instagram no ar, sem
      confirmação de quem responde por eles — e o e-mail usa `.com.br` enquanto
      `SITE_URL` usa `.com`; conferir qual é o domínio correto. Razão social e
      CNPJ não foram informados e por isso não aparecem: o rodapé segue só com
      o `©`. → `lib/site.ts`, `components/Footer.tsx`
- [x] **Endereço com número de sala.** Decisão da marca: publicar completo, com
      a sala, no rodapé, na seção de contato e no `PostalAddress` do
      schema.org. → `lib/site.ts`

## Conteúdo não publicado por falta de fonte

O material sugere os percentuais de 40%, 84% e 30% para comportamento de compra
e percepção de valor, mas também registra que as métricas precisam de fontes e
podem estar associadas a afirmações diferentes. Esses números não foram
publicados. Para usá-los, é necessário entregar a fonte original de cada dado,
confirmar a correspondência entre métrica e alegação e aprovar a redação final.

## Critério editorial

Não adicionar métricas, depoimentos, clientes, resultados, selos ou logos sem
material verificável e autorização. Quando uma informação for fornecida pela
marca, mas ainda não validada, ela deve permanecer registrada como dependência
de aprovação, nunca como comprovação independente.
