import { Fragment } from "react";

/**
 * A Hermione fornecida contém apenas A-Z. Para evitar a troca de fonte no
 * meio de uma palavra, qualquer token com acento usa Articulat por inteiro.
 */
export function BrandText({ children }: { children: string }) {
  const tokens =
    children.match(/[\p{L}\p{N}]+|[^\p{L}\p{N}\s]+|\s+/gu) ?? [];

  return (
    <>
      {tokens.map((token, index) => {
        if (/^\s+$/.test(token)) {
          return <Fragment key={`space-${index}`}>{token}</Fragment>;
        }

        if (!/[\p{L}\p{N}]/u.test(token)) {
          return (
            <span key={`${token}-${index}`} className="brand-punctuation">
              {token}
            </span>
          );
        }

        const hasAccent = /[^\u0000-\u007f]/.test(token);

        return (
          <span
            key={`${token}-${index}`}
            className={hasAccent ? "brand-word-accented" : "brand-word-hermione"}
          >
            {token}
          </span>
        );
      })}
    </>
  );
}
