import type { Metadata } from "next";
import "./globals.css";
import { hermione, articulat } from "./fonts";
import { Providers } from "./providers";
import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/Header";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import {
  CONTACT_EMAIL,
  INSTAGRAM_URL,
  SITE_NAME,
  SITE_URL,
  STORE_ENABLED,
  siteDescription,
} from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Inteligência Olfativa`,
    template: `%s — ${SITE_NAME}`,
  },
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Inteligência Olfativa`,
    description: siteDescription,
    images: [
      {
        url: "/brand/emide-logo-dark.png",
        width: 1578,
        height: 473,
        alt: "EMIDÊ — Inteligência Olfativa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Inteligência Olfativa`,
    description: siteDescription,
    images: ["/brand/emide-logo-dark.png"],
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
  areaServed: "BR",
  sameAs: [INSTAGRAM_URL],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${hermione.variable} ${articulat.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <Providers>
          {STORE_ENABLED ? (
            <CartProvider>
              <a href="#conteudo" className="skip-link">
                Ir para o conteúdo
              </a>
              <Header />
              <main id="conteudo">{children}</main>
              <Footer />
              <CartDrawer />
            </CartProvider>
          ) : (
            <>
              <a href="#conteudo" className="skip-link">
                Ir para o conteúdo
              </a>
              <Header />
              <main id="conteudo">{children}</main>
              <Footer />
            </>
          )}
        </Providers>
      </body>
    </html>
  );
}
