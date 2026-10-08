import type { Metadata, Viewport } from 'next';
import { Montserrat } from 'next/font/google';
import 'lenis/dist/lenis.css';
import './globals.css';
import './styles/fx.css';
import './styles/pages.css';
import './styles/blog.css';
import './styles/consent.css';
import './styles/mobile.css';
import ConsentScripts from '@/components/consent/ConsentScripts';
import CookieConsent from '@/components/consent/CookieConsent';
import Cursor from '@/components/fx/Cursor';
import GlobalEffects from '@/components/fx/GlobalEffects';
import Preloader from '@/components/fx/Preloader';
import Providers from '@/components/fx/Providers';
import ScrollProgress from '@/components/fx/ScrollProgress';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Topbar from '@/components/layout/Topbar';
import WhatsAppFloat from '@/components/layout/WhatsAppFloat';
import { INTRO_KEY } from '@/lib/intro';
import { site } from '@/lib/site';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  authors: [{ name: site.name }],
  other: {
    'geo.region': 'IT-RM',
    'geo.placename': 'Roma',
    'geo.position': '41.8818;12.5191',
    ICBM: '41.8818, 12.5191',
  },
};

export const viewport: Viewport = {
  themeColor: '#1A1A1A',
};

// Se l'intro è già stata vista in questa sessione la si salta prima del primo paint
const introScript = `try{if(sessionStorage.getItem('${INTRO_KEY}'))document.documentElement.setAttribute('data-intro','seen')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={montserrat.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>
        <Providers>
          <Preloader />
          <ScrollProgress />
          <Topbar />
          <Header />
          {children}
          <Footer />
          <WhatsAppFloat />
          <Cursor />
          <GlobalEffects />
          <CookieConsent />
          <ConsentScripts />
        </Providers>
      </body>
    </html>
  );
}
