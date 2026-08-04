"use client";

import { useState } from "react";
import Image from "next/image";

/** Foto principal do produto. Sem arquivo válido, mantém o fundo neutro. */
export function ProductPhoto({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="photo-fallback relative aspect-square overflow-hidden">
      {!failed && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width:768px) 100vw, 50vw"
          priority
          onError={() => setFailed(true)}
          className="object-cover"
        />
      )}
    </div>
  );
}
