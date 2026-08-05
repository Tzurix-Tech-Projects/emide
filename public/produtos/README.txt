Curadoria local da Fase 1.

Cada pasta usa o slug do produto e contém:

  cover.webp / cover.avif
  gallery-1.webp / gallery-1.avif

O site usa WebP e preserva AVIF como versão final alternativa. O mapa central
fica em lib/product-images.ts e impede que os caminhos JPG legados do Supabase
gerem requisições 4xx. A origem e as pendências de aprovação de cada imagem
estão documentadas em docs/CATALOGO-FASE-1.md.

As versões finais são quadradas, até 1200×1200, sem metadados e com fundo
neutro. Novas galerias devem manter o mesmo padrão e nunca misturar variantes.
