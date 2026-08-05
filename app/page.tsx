import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { ProductCard } from "@/components/ProductCard";
import { FAQ } from "@/components/FAQ";
import { B2BQuoteButton, ContactButton } from "@/components/WhatsAppActions";
import { BrandText } from "@/components/BrandText";
import {
  CASES,
  CREATIVE_PROCESS,
  FRAGRANCE_PILLARS,
  IMPACT_AREAS,
  PERSONALIZED_PRODUCTS,
  PRODUCT_SHOWCASE,
  SEGMENTS,
  SOLUTIONS,
  TECHNOLOGY_FEATURES,
} from "@/lib/institutional-content";
import { fetchProducts } from "@/lib/products";
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONES,
  STORE_ENABLED,
} from "@/lib/site";

const FEATURED_LIMIT = 3;

export default async function Home() {
  const products = STORE_ENABLED ? await fetchProducts() : [];
  const featured = products
    .filter((product) => product.mode === "buy")
    .slice(0, FEATURED_LIMIT);

  return (
    <>
      <Hero />

      <section id="sobre" className="section-wide bg-mist">
        <div className="wrap grid grid-cols-1 items-center gap-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-24">
          <Reveal direction="left">
            <div className="relative aspect-[4/5] overflow-hidden bg-paper shadow-[0_24px_70px_-48px_rgba(29,29,27,0.5)]">
              <div className="absolute inset-x-0 top-0 z-10 h-2 bg-gradient-to-r from-gold-dark via-gold to-gold-light" />
              <Image
                src="/images/institucional/sobre-emide.jpg"
                alt="Difusor e sabonete líquido EMIDÊ em uma composição de madeira clara"
                fill
                sizes="(max-width: 1023px) 92vw, 40vw"
                className="object-cover"
              />
              <div
                className="absolute bottom-0 right-0 h-28 w-2 bg-forest"
                aria-hidden="true"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} direction="right">
            <span className="eyebrow">O que fazemos</span>
            <h2 className="my-6 text-3xl font-normal sm:text-4xl md:text-5xl">
              <BrandText>Transformamos a essência da sua marca em uma experiência memorável</BrandText>
            </h2>
            <div className="max-w-[650px] space-y-5 text-base text-ink">
              <p>
                Criamos identidades olfativas que traduzem a personalidade e os
                valores de cada marca, fortalecendo a experiência do cliente e
                construindo conexões emocionais que permanecem na memória.
              </p>
              <p>
                Mais do que aromatizar ambientes, desenvolvemos estratégias
                sensoriais capazes de comunicar posicionamento, qualidade e
                exclusividade.
              </p>
            </div>
            <div className="mt-10 border-l-2 border-gold-dark pl-6">
              <p className="max-w-[520px] text-xl leading-relaxed text-charcoal">
                Um cliente encantado compra valor, não apenas preço.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="solucoes" className="section-wide">
        <div className="wrap">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-24">
            <Reveal direction="left">
              <span className="eyebrow">Como fazemos</span>
              <h2 className="my-6 text-3xl font-normal sm:text-4xl md:text-5xl">
                <BrandText>Tecnologia, estratégia e personalização</BrandText>
              </h2>
              <div className="max-w-[650px] space-y-5 text-base text-ink">
                <p>
                  A aromatização profissional é realizada por equipamentos que
                  dispersam as fragrâncias de maneira uniforme e constante pelo
                  ambiente.
                </p>
                <p>
                  Conectados por Wi-Fi e controlados por aplicativo, eles permitem
                  ajustes precisos de intensidade, horários de funcionamento e
                  potência conforme o fluxo de pessoas.
                </p>
              </div>
              <ul className="mt-10 grid grid-cols-1 border-l border-t border-line sm:grid-cols-2">
                {TECHNOLOGY_FEATURES.map((feature) => (
                  <li
                    key={feature}
                    className="flex min-h-16 items-center gap-3 border-b border-r border-line px-5 py-4 text-sm text-charcoal"
                  >
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-dark"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1} direction="right">
              <div className="relative aspect-[4/5] overflow-hidden bg-charcoal">
                <Image
                  src="/images/institucional/aromatizacao-profissional.jpg"
                  alt="Aromatizador profissional EMIDÊ integrado a um painel de madeira"
                  fill
                  sizes="(max-width: 1023px) 92vw, 40vw"
                  className="object-cover"
                />
                <div
                  className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/70 to-transparent px-7 pb-7 pt-24 text-paper"
                  aria-hidden="true"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-gold-light">
                    Controle preciso para cada ambiente
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="mt-28 border-t border-line pt-20 md:mt-36 md:pt-24">
            <Reveal className="mb-14 max-w-[720px]">
              <span className="eyebrow">Soluções da EMIDÊ</span>
              <h2 className="my-5 text-3xl font-normal sm:text-4xl md:text-5xl">
                <BrandText>Estratégias olfativas para empresas, marcas e residências</BrandText>
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 border-l border-t border-line lg:grid-cols-2">
              {SOLUTIONS.map((solution, index) => (
                <Reveal key={solution.eyebrow} delay={index * 0.08}>
                  <article className="motion-card flex h-full flex-col border-b border-r border-line bg-paper">
                    <div className="relative aspect-[16/10] overflow-hidden bg-mist">
                      <Image
                        src={solution.image}
                        alt={solution.alt}
                        fill
                        sizes="(max-width: 1023px) 92vw, 46vw"
                        className="object-cover transition-transform duration-300 ease-smooth hover:scale-[1.015]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-8 sm:p-10">
                      <span className="eyebrow">{solution.eyebrow}</span>
                      <h3 className="mb-4 mt-5 text-2xl md:text-3xl">
                        <BrandText>{solution.title}</BrandText>
                      </h3>
                      <p className="mb-4 text-base text-ink">
                        {solution.description}
                      </p>
                      <p className="mb-8 text-sm text-ink">{solution.detail}</p>
                      <div className="mt-auto">
                        {index === 0 ? (
                          <B2BQuoteButton label="Quero aromatizar minha empresa" />
                        ) : (
                          <Link
                            href={STORE_ENABLED ? "/loja" : "/#produtos"}
                            className="btn btn-outline"
                          >
                            Conhecer a Linha Home
                          </Link>
                        )}
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="on-dark section-wide bg-charcoal text-paper">
        <div className="wrap">
          <Reveal className="mb-16 max-w-[760px]">
            <span className="eyebrow">O impacto do marketing olfativo</span>
            <h2 className="my-6 text-3xl font-normal text-paper sm:text-4xl md:text-5xl">
              <BrandText>Uma experiência que influencia percepção, comportamento e decisão</BrandText>
            </h2>
            <p className="max-w-[680px] text-base text-paper/75">
              O marketing olfativo não é apenas um detalhe decorativo. É uma
              ferramenta estratégica capaz de orientar a leitura emocional de um
              espaço e a maneira como o público percebe uma marca.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 border-l border-t border-paper/15 lg:grid-cols-3">
            {IMPACT_AREAS.map((impact, index) => (
              <Reveal key={impact.title} delay={index * 0.08}>
                <article className="motion-card h-full border-b border-r border-paper/15 p-8 sm:p-10">
                  <span className="text-xs tracking-[0.18em] text-gold-light">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mb-5 mt-5 text-2xl text-paper">
                    <BrandText>{impact.title}</BrandText>
                  </h3>
                  <p className="text-sm text-paper/70">{impact.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="fragrancias" className="section-wide bg-mist">
        <div className="wrap">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
            <Reveal direction="left">
              <div className="relative aspect-[4/5] overflow-hidden bg-paper">
                <Image
                  src="/images/institucional/assinatura-olfativa.jpg"
                  alt="Difusor de vidro EMIDÊ com fragrância âmbar e varetas pretas"
                  fill
                  sizes="(max-width: 1023px) 92vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 h-2 w-2/3 bg-gradient-to-r from-gold-dark to-gold-light" />
              </div>
            </Reveal>

            <Reveal delay={0.1} direction="right">
              <span className="eyebrow">Fragrâncias autorais</span>
              <h2 className="my-6 text-3xl font-normal sm:text-4xl md:text-5xl">
                <BrandText>A assinatura da sua marca</BrandText>
              </h2>
              <div className="max-w-[660px] space-y-5 text-base text-ink">
                <p>Não trabalhamos apenas com cheiros prontos.</p>
                <p>
                  Criamos uma pirâmide olfativa exclusiva que traduz a identidade,
                  a personalidade e os objetivos da sua marca ou do seu projeto
                  arquitetônico.
                </p>
                <p>
                  Cada fragrância é desenvolvida para provocar sensações
                  específicas, fortalecer o posicionamento e criar uma conexão
                  emocional verdadeira com o público.
                </p>
              </div>
              <ul className="my-10 flex flex-wrap gap-3">
                {FRAGRANCE_PILLARS.map((pillar) => (
                  <li
                    key={pillar}
                    className="border border-forest px-5 py-3 text-xs uppercase tracking-[0.16em] text-forest"
                  >
                    {pillar}
                  </li>
                ))}
              </ul>
              <B2BQuoteButton label="Criar uma fragrância exclusiva" />
            </Reveal>
          </div>

          <div className="mt-28 border-t border-line pt-20 md:mt-36 md:pt-24">
            <Reveal className="mb-14 max-w-[720px]">
              <span className="eyebrow">Processo criativo</span>
              <h2 className="my-5 text-3xl font-normal sm:text-4xl md:text-5xl">
                <BrandText>Como criamos uma fragrância exclusiva</BrandText>
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 border-l border-t border-line lg:grid-cols-3">
              {CREATIVE_PROCESS.map((stage, index) => (
                <Reveal key={stage.title} delay={index * 0.08}>
                  <article className="motion-card h-full border-b border-r border-line bg-paper p-8 sm:p-10">
                    <span className="text-xs tracking-[0.18em] text-forest">
                      Etapa {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mb-5 mt-5 text-xl md:text-2xl">
                      <BrandText>{stage.title}</BrandText>
                    </h3>
                    <p className="mb-7 text-sm text-ink">{stage.description}</p>
                    <ul className="space-y-3 border-t border-line pt-6 text-sm text-ink">
                      {stage.items.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="text-gold-dark" aria-hidden="true">
                            —
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="produtos" className="section-wide">
        <div className="wrap">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-20">
            <Reveal>
              <span className="eyebrow">Produtos personalizados</span>
              <h2 className="my-6 text-3xl font-normal sm:text-4xl md:text-5xl">
                <BrandText>Sua marca presente em cada detalhe</BrandText>
              </h2>
              <p className="mb-5 max-w-[600px] text-base text-ink">
                Desenvolvemos produtos personalizados com a identidade visual e a
                fragrância exclusiva da sua empresa.
              </p>
              <p className="mb-9 max-w-[600px] text-base text-ink">
                Eles podem integrar o ambiente, ser vendidos aos clientes ou
                oferecidos como presentes institucionais.
              </p>
              <B2BQuoteButton label="Conhecer os produtos personalizados" />
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="grid grid-cols-1 border-l border-t border-line sm:grid-cols-2">
                {PERSONALIZED_PRODUCTS.map((product) => (
                  <li
                    key={product}
                    className="flex min-h-14 items-center border-b border-r border-line px-5 py-4 text-sm text-charcoal"
                  >
                    {product}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {PRODUCT_SHOWCASE.map((image, index) => (
              <Reveal
                key={image.src}
                delay={index * 0.06}
                direction={index === 0 ? "left" : index === 2 ? "right" : "up"}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-mist">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 639px) 92vw, 31vw"
                    className="object-cover transition-transform duration-300 ease-smooth hover:scale-[1.015]"
                  />
                </div>
              </Reveal>
            ))}
          </div>

          {STORE_ENABLED && (
            <div className="mt-24 border-t border-line pt-20">
              <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-8">
                <div className="max-w-[620px]">
                  <span className="eyebrow">Loja EMIDÊ</span>
                  <h2 className="mt-5 text-3xl font-normal md:text-5xl">
                    <BrandText>Produtos para levar a experiência com você</BrandText>
                  </h2>
                </div>
                <Link href="/loja" className="btn btn-outline">
                  Ver toda a coleção
                </Link>
              </Reveal>
              <div className="grid grid-cols-1 border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
                {featured.map((product, index) => (
                  <ProductCard key={product.slug} product={product} index={index} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="section bg-mist">
        <div className="wrap grid grid-cols-1 gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
          <Reveal>
            <span className="eyebrow">Segmentos atendidos</span>
            <h2 className="my-5 text-3xl font-normal md:text-5xl">
              <BrandText>Inteligência olfativa para diferentes experiências</BrandText>
            </h2>
            <p className="max-w-[520px] text-base text-ink">
              Cada projeto considera o comportamento do público, as dimensões do
              ambiente e a experiência que a marca deseja construir.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="grid grid-cols-2 border-l border-t border-line sm:grid-cols-3">
              {SEGMENTS.map((segment) => (
                <li
                  key={segment}
                  className="flex min-h-16 items-center border-b border-r border-line bg-paper px-4 py-3 text-sm text-charcoal sm:px-5"
                >
                  {segment}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section id="cases" className="section-wide">
        <div className="wrap">
          <Reveal className="mb-16 max-w-[720px]">
            <span className="eyebrow">Cases de sucesso</span>
            <h2 className="my-5 text-3xl font-normal sm:text-4xl md:text-5xl">
              <BrandText>Estratégia aplicada a desafios reais</BrandText>
            </h2>
            <p className="text-base text-ink">
              Projetos para diferentes segmentos mostram como identidade,
              tecnologia e implantação técnica trabalham juntas.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 border-l border-t border-line lg:grid-cols-3">
            {CASES.map((caseItem, index) => (
              <Reveal key={caseItem.client} delay={index * 0.08}>
                <article className="motion-card flex h-full flex-col border-b border-r border-line bg-paper p-8 sm:p-10">
                  <span className="text-xs tracking-[0.18em] text-forest">
                    Case {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mb-8 mt-5 text-2xl">
                    <BrandText>{caseItem.client}</BrandText>
                  </h3>
                  <div className="mb-7">
                    <h4 className="mb-3 text-xs text-forest">
                      <BrandText>O desafio</BrandText>
                    </h4>
                    <p className="text-sm text-ink">{caseItem.challenge}</p>
                  </div>
                  <div className="mt-auto border-t border-line pt-7">
                    <h4 className="mb-3 text-xs text-forest">
                      <BrandText>A solução</BrandText>
                    </h4>
                    <p className="text-sm text-ink">{caseItem.solution}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="on-dark mt-16 bg-forest px-7 py-12 text-paper sm:px-12 md:flex md:items-center md:justify-between md:gap-12">
            <div className="mb-8 max-w-[720px] md:mb-0">
              <span className="eyebrow">Marcas que confiam na EMIDÊ</span>
              <h2 className="mb-5 mt-4 text-2xl text-paper md:text-3xl">
                <BrandText>Experiências memoráveis começam com uma estratégia coerente</BrandText>
              </h2>
              <p className="text-sm text-paper/75">
                Empresas de diferentes segmentos utilizam a inteligência olfativa
                para qualificar seus ambientes e fortalecer sua presença.
              </p>
            </div>
            <div className="shrink-0">
              <B2BQuoteButton label="Quero fazer parte dessas marcas" />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="faq" className="section bg-mist">
        <div className="wrap">
          <Reveal className="mb-14 max-w-[640px]">
            <span className="eyebrow">Perguntas frequentes</span>
            <h2 className="mt-5 text-3xl font-normal md:text-5xl">
              <BrandText>Informação para decidir com segurança</BrandText>
            </h2>
          </Reveal>
          <FAQ />
        </div>
      </section>

      <section id="contato" className="on-dark section-wide bg-forest text-paper">
        <div className="wrap grid grid-cols-1 gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-24">
          <Reveal>
            <span className="eyebrow">Vamos conversar</span>
            <h2 className="my-6 text-4xl font-normal text-paper md:text-6xl">
              <BrandText>Vamos desenhar a estratégia olfativa do seu próximo projeto?</BrandText>
            </h2>
            <p className="mb-5 max-w-[680px] text-base text-paper/75">
              Grandes negócios começam com um bom café e terminam com um aroma
              inesquecível.
            </p>
            <p className="mb-10 max-w-[680px] text-base text-paper/75">
              Transforme seu ambiente em uma experiência capaz de comunicar valor,
              gerar conexão e permanecer na memória dos seus clientes.
            </p>
            <div className="flex flex-wrap gap-3">
              <ContactButton label="Falar com um especialista" />
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Solicitação de apresentação EMIDÊ`}
                className="btn btn-outline"
              >
                Solicitar uma apresentação
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <address className="border-l border-paper/20 pl-7 not-italic sm:pl-10">
              <p className="mb-5 text-xs uppercase tracking-[0.18em] text-gold-light">
                Contato
              </p>
              <ul className="mb-8 space-y-3">
                {CONTACT_PHONES.map((phone) => (
                  <li key={phone.international}>
                    <a
                      href={`https://wa.me/${phone.international}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center text-xl text-paper transition-colors hover:text-gold-light"
                    >
                      {phone.display}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="max-w-[360px] text-sm leading-relaxed text-paper/75">
                {CONTACT_ADDRESS.street}
                <br />
                {CONTACT_ADDRESS.district} — {CONTACT_ADDRESS.city}/
                {CONTACT_ADDRESS.state}
              </p>
            </address>
          </Reveal>
        </div>
      </section>
    </>
  );
}
