import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { ProductCard } from "@/components/ProductCard";
import { FAQ } from "@/components/FAQ";
import { B2BQuoteButton, ContactButton } from "@/components/WhatsAppActions";
import { fetchProducts, CATEGORIES } from "@/lib/products";
import { STORE_ENABLED } from "@/lib/site";

const INSTITUTIONAL_SERVICES = [
  {
    title: "Perfumaria para ambientes",
    description:
      "Difusores, sprays e linha lavabo pensados para integrar o aroma ao cuidado com o espaço.",
    image: "/images/institucional/perfumaria-ambientes.jpg",
    alt: "Difusor de aromas e sabonete líquido EMIDÊ sobre uma bandeja de madeira",
  },
  {
    title: "Aromatização profissional",
    description:
      "Sistemas de nebulização a frio dimensionados para ambientes comerciais e corporativos.",
    image: "/images/institucional/aromatizacao-profissional.jpg",
    alt: "Aromatizador profissional EMIDÊ instalado em um painel de madeira",
  },
  {
    title: "Assinatura olfativa",
    description:
      "Seleção ou desenvolvimento de uma composição coerente com a identidade e a experiência da marca.",
    image: "/images/institucional/assinatura-olfativa.jpg",
    alt: "Difusor de vidro EMIDÊ com fragrância âmbar e varetas pretas",
  },
];

const PRACTICES = [
  {
    title: "Composições próprias",
    description:
      "As fórmulas são desenvolvidas pela marca e maturadas antes do envase, o que prolonga a fixação.",
  },
  {
    title: "Frascos e acessórios",
    description:
      "Vidro, metal e madeira selecionados. O frasco fica à vista no ambiente, então entra no projeto.",
  },
  {
    title: "Acompanhamento nos projetos",
    description:
      "Em contratos profissionais, seguimos do conceito à manutenção periódica do sistema.",
  },
];

const B2B_STAGES = [
  {
    title: "Diagnóstico",
    description: "Visita ou briefing do espaço: metragem, circulação e ventilação.",
  },
  {
    title: "Assinatura olfativa",
    description: "Seleção ou desenvolvimento da composição para a marca.",
  },
  {
    title: "Instalação",
    description: "Sistema de nebulização a frio dimensionado para o ambiente.",
  },
  {
    title: "Manutenção",
    description: "Reposição de essência e revisão periódica dos equipamentos.",
  },
];

const FEATURED_LIMIT = 6;

export default async function Home() {
  const products = STORE_ENABLED ? await fetchProducts() : [];
  const featured = products
    .filter((product) => product.mode === "buy")
    .slice(0, FEATURED_LIMIT);

  return (
    <>
      <Hero />

      <section id={STORE_ENABLED ? "colecao" : "solucoes"} className="section-tight">
        <div className="wrap">
          <Reveal className="mb-16 max-w-[640px]">
            <span className="eyebrow">
              {STORE_ENABLED ? "A coleção" : "O que fazemos"}
            </span>
            <h2 className="my-5 text-3xl font-light md:text-5xl">
              {STORE_ENABLED
                ? "Quatro maneiras de perfumar."
                : "O aroma como parte do projeto."}
            </h2>
            <p className="text-lg text-ink">
              {STORE_ENABLED
                ? "As quatro linhas partem das mesmas composições, em formatos para a casa e para espaços comerciais."
                : "Da perfumaria para ambientes à aromatização profissional, a EMIDÊ conecta composição, espaço e identidade."}
            </p>
          </Reveal>
          <div
            className={`grid grid-cols-1 border-l border-t border-line sm:grid-cols-2 ${
              STORE_ENABLED ? "lg:grid-cols-4" : "lg:grid-cols-[1.15fr_1fr_0.85fr]"
            }`}
          >
            {STORE_ENABLED
              ? CATEGORIES.map((category, index) => (
                  <Link
                    key={category.id}
                    href={
                      category.id === "profissional"
                        ? "/#profissional"
                        : `/loja?categoria=${category.id}`
                    }
                    className="group flex min-h-[280px] flex-col justify-between border-b border-r border-line bg-paper p-9 transition-colors duration-300 hover:bg-mist"
                  >
                    <div>
                      <span className="text-xs tracking-[0.2em] text-forest">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mb-2.5 mt-3.5 text-2xl">{category.label}</h3>
                      <p className="text-sm text-ink">{category.blurb}</p>
                    </div>
                    <span
                      aria-hidden="true"
                      className="text-xl text-forest transition-transform duration-300 group-hover:translate-x-2"
                    >
                      →
                    </span>
                  </Link>
                ))
              : INSTITUTIONAL_SERVICES.map((service, index) => (
                  <article
                    key={service.title}
                    className={`flex min-h-[440px] flex-col border-b border-r border-line bg-paper ${
                      index === INSTITUTIONAL_SERVICES.length - 1
                        ? "sm:col-span-2 lg:col-span-1"
                        : ""
                    }`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-mist sm:aspect-[4/5]">
                      <Image
                        src={service.image}
                        alt={service.alt}
                        fill
                        sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 34vw"
                        className="object-cover transition-transform duration-300 ease-smooth hover:scale-[1.015]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-7 sm:p-8">
                      <span className="text-xs tracking-[0.2em] text-forest">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mb-3 mt-4 text-2xl">{service.title}</h3>
                      <p className="text-base text-ink">{service.description}</p>
                      <span
                        className="mt-auto h-px w-12 bg-gold-dark"
                        aria-hidden="true"
                      />
                    </div>
                  </article>
                ))}
          </div>
        </div>
      </section>

      {STORE_ENABLED && (
        <section id="destaques" className="section">
          <div className="wrap">
            <Reveal className="mb-16 max-w-[640px]">
              <span className="eyebrow">Em destaque</span>
              <h2 className="my-5 text-3xl font-light md:text-5xl">
                Peças assinadas EMIDÊ.
              </h2>
              <p className="text-lg text-ink">
                Uma seleção da coleção atual, em frascos de vidro e composições
                maturadas.
              </p>
            </Reveal>
            {featured.length === 0 ? (
              <p className="border-t border-line py-16 text-ink">
                A coleção está em atualização. Fale com a gente pelo WhatsApp para
                saber o que temos disponível.
              </p>
            ) : (
              <div className="grid grid-cols-1 border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
                {featured.map((product, index) => (
                  <ProductCard
                    key={product.slug}
                    product={product}
                    index={index}
                  />
                ))}
              </div>
            )}
            <Reveal className="mt-12" delay={0.1}>
              <Link href="/loja" className="btn btn-outline">
                Ver toda a coleção
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      <section id="sobre" className="section-wide bg-mist">
        <div className="wrap grid grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-20">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden bg-paper shadow-[0_24px_70px_-48px_rgba(29,29,27,0.5)]">
              <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-gold-dark via-gold to-gold-light" />
              <Image
                src="/images/institucional/sobre-emide.jpg"
                alt="Difusor de aromas e sabonete líquido EMIDÊ em uma composição de madeira clara"
                fill
                sizes="(max-width: 768px) 90vw, 42vw"
                className="object-cover"
              />
              <div className="absolute bottom-0 right-0 h-24 w-2 bg-forest" aria-hidden="true" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="eyebrow">Sobre a EMIDÊ</span>
            <h2 className="my-6 text-3xl font-light md:text-5xl">
              Perfumar é uma forma de cuidar.
            </h2>
            <p className="mb-5 text-base text-ink">
              A EMIDÊ trata o aroma como parte do projeto do espaço, não como
              acessório. É a primeira coisa percebida por quem entra, antes da
              decoração e da iluminação.
            </p>
            <p className="mb-8 text-base text-ink">
              As composições são desenvolvidas com matérias-primas selecionadas e
              maturadas antes do envase. O objetivo é fixação longa sem saturar o
              ambiente.
            </p>
            <Link
              href={STORE_ENABLED ? "/loja" : "/#profissional"}
              className="btn btn-ghost"
            >
              {STORE_ENABLED ? "Conheça a coleção" : "Conheça nosso trabalho"}
            </Link>
          </Reveal>
        </div>
      </section>

      <section
        id="profissional"
        className="on-dark section-wide bg-charcoal text-paper"
      >
        <div className="wrap grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-20">
          <Reveal>
            <span className="eyebrow">Aromatização profissional</span>
            <h2 className="my-6 text-3xl font-light text-paper md:text-5xl">
              A sua marca também tem um cheiro.
            </h2>
            <p className="mb-8 max-w-[520px] text-base text-paper/75">
              Para hotéis, clínicas, escritórios e projetos de arquitetura,
              desenvolvemos assinaturas olfativas exclusivas e instalamos sistemas
              de nebulização a frio, com consultoria dedicada.
            </p>
            <B2BQuoteButton />
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="mb-2 text-xs uppercase tracking-[0.2em] text-paper/60">
              Como funciona o projeto
            </h3>
            <ol className="divide-y divide-paper/10 border-t border-paper/10">
              {B2B_STAGES.map((stage, index) => (
                <li
                  key={stage.title}
                  className="grid grid-cols-[40px_1fr] gap-4 py-5"
                >
                  <span className="font-display text-base text-gold-light">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h4 className="text-lg text-paper">{stage.title}</h4>
                    <p className="text-sm text-paper/70">{stage.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section id="pratica" className="section">
        <div className="wrap">
          <Reveal className="mb-16 max-w-[540px]">
            <span className="eyebrow">Como trabalhamos</span>
            <h2 className="mt-5 text-3xl font-light md:text-5xl">
              O cuidado está nos detalhes.
            </h2>
          </Reveal>
          <div className="divide-y divide-line border-t border-line">
            {PRACTICES.map((practice, index) => (
              <Reveal key={practice.title} delay={index * 0.08}>
                <div className="grid grid-cols-1 gap-4 py-10 md:grid-cols-[80px_1fr_2fr] md:items-baseline">
                  <span className="font-display text-lg text-forest">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl">{practice.title}</h3>
                  <p className="max-w-[52ch] text-base text-ink">
                    {practice.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="section bg-mist">
        <div className="wrap">
          <Reveal className="mb-14 max-w-[640px]">
            <span className="eyebrow">Dúvidas</span>
            <h2 className="mt-5 text-3xl font-light md:text-5xl">
              Perguntas frequentes
            </h2>
          </Reveal>
          <FAQ />
        </div>
      </section>

      <section id="contato" className="on-dark section-wide bg-forest text-paper">
        <div className="wrap max-w-[860px]">
          <Reveal>
            <span className="eyebrow">Vamos conversar</span>
            <h2 className="my-6 text-4xl font-light text-paper md:text-6xl">
              O primeiro contato com a sua marca pode ser um aroma.
            </h2>
            <p className="mb-10 max-w-[520px] text-paper/75">
              Conte o tipo de ambiente e a metragem aproximada. Respondemos pelo
              WhatsApp com uma recomendação.
            </p>
            <ContactButton />
          </Reveal>
        </div>
      </section>
    </>
  );
}
