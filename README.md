# Portfólio - Lucas Inocêncio de França

Bem-vindo ao repositório oficial do Portfólio de Lucas Inocêncio de França. Este projeto é uma aplicação moderna construída com Next.js, projetada para ser performática, bilíngue, adaptável (Dark Mode) e com ótima experiência de usuário.

## 📌 Requisitos do Projeto

O projeto foi construído para atender aos seguintes requisitos de negócio e técnicos:

- **Internacionalização (i18n):** O site deve suportar os idiomas Português (PT) e Inglês (EN). Toda string exposta ao usuário deve vir dos dicionários em `locales/`.
- **Tematização (Dark/Light Mode):** Todo o design deve reagir perfeitamente a mudança de tema, utilizando variáveis CSS nativas que respondem à classe `.dark-theme` injetada na tag `<body>`. O contraste deve ser acessível e adaptável em ambos os cenários (ex: ícones invertidos em modo escuro).
- **Integração Externa:** A sessão "Projetos Pessoais e Repositórios" deve buscar e consumir, de forma dinâmica e automatizada, os repositórios públicos recentes via API do GitHub (`api.github.com`).
- **Desempenho e Interatividade:** Interfaces contínuas como o carrossel de repositórios devem ter movimentação fluida (JavaScript a 60FPS com `requestAnimationFrame`) e ser interativas (arrastar e soltar sem bugs) tanto em desktops quanto em dispositivos móveis.
- **Responsividade:** Todas as sessões (`Navbar`, `Header`, `About`, `Skills`, `Projects` e `Footer`) devem ser totalmente adaptadas para resoluções de telas menores.
- **Domínio Próprio e Email Routing:** A versão final fica hospedada em `harmonysoftware.com.br`, recebendo contatos em `contato@harmonysoftware.com.br`.
- **Clean Architecture & Separação de Conceitos:** Componentização estrita no frontend usando a Context API para estados globais (Tema, Idioma).

## 🏗️ Arquitetura e Padrões de Desenvolvimento

### 1. Stack Tecnológica
- **Framework:** Next.js (App Router)
- **Engine:** React 18
- **Estilização:** CSS Puro (Vanilla) focado na utilização extensiva de Flexbox/Grid e variáveis CSS dinâmicas.

### 2. Estrutura de Diretórios
- `/app`: Configurações de rotas globais do Next.js (App Router), `layout.js` e a página raiz `page.js`.
- `/components`: Componentes isolados de visualização (ex: `Header.jsx`, `Projects.jsx`). Componentes de interface complexa (arrastar, cliques) devem carregar a diretiva `"use client"`.
- `/context`: Gerenciadores de estado global da aplicação. (ex: `ThemeContext.jsx` e `LanguageContext.jsx`).
- `/locales`: Dicionários de strings literais para a internacionalização (`pt.js` e `en.js`).
- `/public`: Assets estáticos.
  - `/css`: Toda a estilização separada por componente. Importações são unificadas via `extends.css`.
  - `/img`: Logotipos, fotos e vetores.
  - `/cv`: Hospedagem do currículo em formato PDF.

### 3. Padrões de CSS
- **Variáveis de Cor:** Todas as cores da aplicação devem consumir `:root` dentro de `variables.css`. Para o modo escuro, reatribua as variáveis dentro do bloco `body.dark-theme`. NENHUMA cor "hard-coded" deve ser escrita nos estilos individuais.
- **Isolamento:** Arquivos CSS dentro de `public/css/components/` refletem diretamente o escopo visual de seu arquivo React correspondente em `components/`.
- **Comportamentos Nativos:** Jamais sobrescreva propriedades de scroll de forma destrutiva (como `scroll-behavior: smooth`) caso conflitem com `requestAnimationFrame`. Aplique exclusões precisas onde a interatividade JS exigir renderização quadro a quadro.

### 4. Padrões de JavaScript e React
- **Client Components:** Funcionalidades que exigem Hooks do React (`useState`, `useEffect`, `useRef`) e APIs exclusivas do navegador devem iniciar obrigatoriamente com `"use client"`.
- **Evitar Re-renderizações Múltiplas:** Loops constantes (ex: lógicas de arraste e carrosseis) devem utilizar referências diretas do DOM (`useRef`) em vez de gerenciar coordenadas por `useState`, garantindo a performance ideal e impedindo lag de interface.
- **API Fetching:** Chamadas a APIs externas devem possuir Fallbacks visuais (Textos de carregamento) e tratamento de erros (try/catch ou `.catch`) robustos para não travar a aplicação quando a API externa não responder ou expirar limites.

## 🚀 Padrão de Deploy (CI/CD)

1. Commits no repositório privado (`portfolio-next`) no branch `main` ativam automaticamente os webhooks da **Vercel**, que recompila o site Next.js e injeta variáveis de ambiente, disponibilizando o build em produção.
2. A sincronização de código com o repositório público (github.com/Lukinocencio/Portfolio) exclui estritamente diretórios do motor (node_modules, .next) e credenciais privadas (.env). O código aberto serve para fins de portfólio.
3. Mensagens de commit **sempre** devem ser escritas em português claro e objetivo, utilizando os prefixos convencionais de commit (ex: `fix:`, `feat:`, `refactor:`).

---

*Repositório mantido e desenvolvido sob as especificações e diretrizes de design de Lucas França.*
