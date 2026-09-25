import "./globals.css";

export const metadata = {
  title: "Portfolio de Lucas Inocêncio de França",
  description: "Desenvolvedor Back-end e Full-Stack",
  icons: {
    icon: '/img/lfrancalogo.png',
  },
};

import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { FilterProvider } from "@/context/FilterContext";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="stylesheet" href="/css/extends.css" />
        <link href="https://fonts.cdnfonts.com/css/jetbrains-mono" rel="stylesheet" />
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <FilterProvider>
              {children}
            </FilterProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
