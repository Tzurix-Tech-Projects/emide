/**
 * Aplica a Hermione a um trecho escolhido do título.
 *
 * O arquivo licenciado é o HERMIONE-DEMO e cobre apenas A-Z maiúsculo: 29
 * codepoints, sem minúsculas, dígitos ou acentos. Por isso o uso é opt-in e
 * verificado — texto fora dessa cobertura cairia em outra fonte no meio da
 * palavra, que é exatamente o que se quer evitar. Sem cobertura, o trecho
 * segue na Articulat e o título continua com uma voz tipográfica só.
 */
const HERMIONE_COVERAGE = /^[A-Za-z ]+$/;

export function DisplayAccent({ children }: { children: string }) {
  if (!HERMIONE_COVERAGE.test(children)) return <>{children}</>;

  return <span className="display-accent">{children}</span>;
}
