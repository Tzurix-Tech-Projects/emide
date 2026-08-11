import type { Metadata } from "next";
import "./globals.css";
import { hermione, articulat } from "./fonts";
import { Providers } from "./providers";
import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/Header";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONES,
  INSTAGRAM_URL,
  SITE_NAME,
  SITE_URL,
  STORE_ENABLED,
  siteDescription,
} from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Emidê Inteligência Olfativa | Marketing Olfativo e Fragrâncias Exclusivas",
    template: `%s — ${SITE_NAME}`,
  },
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: SITE_NAME,
    title: "Emidê Inteligência Olfativa | Marketing Olfativo e Fragrâncias Exclusivas",
    description: siteDescription,
    images: [
      {
        url: "/brand/emide-open-graph.png",
        width: 1200,
        height: 630,
        alt: "EMIDÊ — Inteligência Olfativa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emidê Inteligência Olfativa | Marketing Olfativo e Fragrâncias Exclusivas",
    description: siteDescription,
    images: ["/brand/emide-open-graph.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  description: siteDescription,
  email: CONTACT_EMAIL,
  telephone: CONTACT_PHONES.map((phone) => `+${phone.international}`),
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTACT_ADDRESS.street,
    addressLocality: CONTACT_ADDRESS.city,
    addressRegion: CONTACT_ADDRESS.state,
    addressCountry: CONTACT_ADDRESS.postalCountry,
  },
  contactPoint: CONTACT_PHONES.map((phone) => ({
    "@type": "ContactPoint",
    telephone: `+${phone.international}`,
    contactType: "customer service",
    areaServed: "BR",
    availableLanguage: "Portuguese",
  })),
  areaServed: "BR",
  sameAs: [INSTAGRAM_URL],
};

/** O carrinho só existe com a loja ligada; o institucional não carrega o Context. */
function StoreShell({ children }: { children: React.ReactNode }) {
  if (!STORE_ENABLED) return <>{children}</>;
  return <CartProvider>{children}</CartProvider>;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${hermione.variable} ${articulat.variable}`}>
      <body>
        <ScrollProgress />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <Providers>
          <StoreShell>
            <a href="#conteudo" className="skip-link">
              Ir para o conteúdo
            </a>
            <Header />
            <main id="conteudo">{children}</main>
            <Footer />
            {STORE_ENABLED && <CartDrawer />}
          </StoreShell>
        </Providers>
      </body>
    </html>
  );
}
