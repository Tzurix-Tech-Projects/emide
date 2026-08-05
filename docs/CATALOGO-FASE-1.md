# EMIDÊ — Revisão do catálogo da Fase 1

Revisão feita em 04/08/2026 a partir dos oito produtos ativos do Supabase e das
fotografias entregues. Nenhum preço, volume ou benefício foi inferido apenas
pela aparência do produto.

## Curadoria e validação

| SKU | Estado no Supabase | Curadoria local | O que está confirmado | Aprovação ainda necessária |
|---|---|---|---|---|
| `difusor-cube-200` | Ativo · R$ 150 · 200ml | `public/produtos/difusor-cube-200/` | Frasco cúbico, tampa de madeira e varetas claras | Volume, preço e descrição comercial |
| `difusor-oval-300` | Ativo · R$ 210 · 300ml | `public/produtos/difusor-oval-300/` | Rótulo da foto indica 300ml; frasco oval e tampa facetada | Preço e descrição “mais editorial” |
| `difusor-signature-300` | Ativo · R$ 180 · 300ml | `public/produtos/difusor-signature-300/` | Frasco redondo, varetas pretas e tampa metálica | Volume, preço e duração “até quatro meses” |
| `sabonete-perolado-250` | Ativo · R$ 65 · 250ml | `public/produtos/sabonete-perolado-250/` | Sabonete perolado com pump metálico; foto em composição com difusor | Volume, preço e uso da composição como capa |
| `maquina-aroma-pro` | Ativo · sob consulta | `public/produtos/maquina-aroma-pro/` | Máquina com display e timer; arte fornecida identifica modelo MD-100 e cobertura de 100m² | Nome final, reservatório, cobertura, preço versus “sob consulta” e condições de garantia |
| `maquina-aroma-wall` | Ativo · sob consulta | `public/produtos/maquina-aroma-wall/` | Máquina de parede; arte fornecida identifica modelo MD-80 e cobertura de 80m² | O catálogo diz aproximadamente 150m²: conflito P0 que deve ser corrigido antes de ativar a loja |
| `agua-de-lencois-500` | Ativo · R$ 95 · 500ml/1L | `public/produtos/agua-de-lencois-500/` | Fotos identificam as apresentações 500ml e 1.000ml | Preço e descrição comercial |
| `home-spray-signature` | Ativo · R$ 70 · 120ml | `public/produtos/home-spray-signature/` | Frasco spray com válvula dourada | Volume, preço e nomenclatura “Signature” |

## Origem das imagens

| SKU | Capa recebida | Galeria recebida |
|---|---|---|
| `difusor-cube-200` | `codex-clipboard-5d968335-07d7-48c0-9b38-bb1bc883b419.jpg` | `codex-clipboard-81cfda0b-38b5-4bff-afce-aecdb5631aa7.jpg` |
| `difusor-oval-300` | `codex-clipboard-1a1c308c-0b82-4c3e-929f-c69ae3731024.jpg` | `codex-clipboard-f1692eed-51cc-4bed-a23c-e8e45a10fd61.jpg` |
| `difusor-signature-300` | `codex-clipboard-a47fb650-063e-41f8-8b60-f84d8554dd9e.jpg` | `codex-clipboard-a09777f4-82ae-42ba-8f03-323b902fc79d.jpg` |
| `sabonete-perolado-250` | `codex-clipboard-1adb5d14-32d1-4d72-8277-1ced796f30c4.jpg` | `codex-clipboard-3de1713f-b312-43a5-a5df-8c0ed107b157.jpg` |
| `maquina-aroma-pro` | `codex-clipboard-c466cb69-f980-4eca-83de-e4cbf51f69b2.jpg` | `codex-clipboard-59aedaf8-d7ab-462c-9cf5-1ce5ba258302.jpg` |
| `maquina-aroma-wall` | `codex-clipboard-a7a184a1-6bcc-4fbd-a64a-99e362192862.png` | `codex-clipboard-d63b8570-83f2-4a30-baf3-9aa350c0818f.jpg` |
| `agua-de-lencois-500` | `codex-clipboard-85cf9158-d020-4795-be5a-08d1c90728ae.jpg` | `codex-clipboard-5ff12bc6-ad26-4611-8293-de1f7a494222.jpg` |
| `home-spray-signature` | `codex-clipboard-87987bda-3d5e-4f42-a108-9e181cd67d78.jpg` | `codex-clipboard-b5ffb652-4048-4107-af29-be76a361e15a.jpg` |

## Pendências para aprovação

1. Confirmar os campos comerciais sinalizados na tabela, principalmente a
   divergência MD-80: 80m² nas artes recebidas versus aproximadamente 150m² no
   Supabase.
2. Confirmar se “ativo” significa disponível para venda. O schema atual não
   possui estoque ou disponibilidade independente.
3. Aprovar cada dupla capa/galeria em desktop e mobile.
4. Com uma sessão administrativa, enviar os arquivos ao bucket `produtos` e
   substituir os oito `image_url` legados. A aplicação já não requisita esses
   JPGs, mas os registros ainda devem ser normalizados.
