import "./globals.css";

export const metadata = {
  title: "Portifólio de Lucas Inocêncio de França",
  description: "Desenvolvedor Back-end e Full-Stack",
  icons: {
    icon: '/img/lfrancalogo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="stylesheet" href="/css/extends.css" />
        <link href="https://fonts.cdnfonts.com/css/jetbrains-mono" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
