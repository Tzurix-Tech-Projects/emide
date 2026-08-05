"use client";

import { useState } from "react";
import Image from "next/image";

/** Galeria enxuta do produto. Sem arquivo válido, mantém o fundo neutro. */
export function ProductPhoto({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState<Record<number, boolean>>({});
  const src = images[active];

  return (
    <div>
      <div className="photo-fallback relative aspect-square overflow-hidden">
        {!failed[active] && (
          <Image
            src={src}
            alt={active === 0 ? alt : `${alt}, detalhe ${active + 1}`}
            fill
            sizes="(max-width:768px) 100vw, 50vw"
            priority={active === 0}
            onError={() => setFailed((items) => ({ ...items, [active]: true }))}
            className="object-cover"
          />
        )}
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3" aria-label="Galeria do produto">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Ver imagem ${index + 1} de ${images.length}`}
              aria-pressed={active === index}
              className={`photo-fallback relative aspect-square overflow-hidden border transition-colors ${
                active === index ? "border-forest" : "border-line hover:border-gold-dark"
              }`}
            >
              <Image src={image} alt="" fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
