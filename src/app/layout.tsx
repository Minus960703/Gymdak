import type { Metadata                  } from "next";
import { Inter                          } from "next/font/google";
import { Footer, Header                 } from '@/components';
import { ThemeStateProvider             } from '@/context/ThemeStateContext';
import { LanguageStateProvider          } from '@/context/LanguageStateContext';
import { LoginStateProvider             } from '@/context/LoginStateContext';
import "@/styles/global.scss";
import "@/styles/PhotoPage.scss";
import "@/styles/AdminPage.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gymdak Photo",
  description: "Gymdak Photo Site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeStateProvider>
          <LanguageStateProvider>
            <LoginStateProvider>
              <Header />
              {children}
              <Footer />
            </LoginStateProvider>
          </LanguageStateProvider>
        </ThemeStateProvider>
      </body>
    </html>
  );
}
