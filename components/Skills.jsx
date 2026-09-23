export default function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="skills__content max-width">
        <h2 className="tertiary-title">Minha caixa de ferramentas!</h2>
        <p className="description">
          Veja abaixo minhas ferramentas e stacks nas quais eu tenho experiência!
        </p>
        <ul>
          {/* Front-end & Frameworks */}
          <li className="skills__item">
            <div className="image-container">
              <img src="/img/mern-stack.png" alt="Desenvolvimento WEB" className="svg-icons" />
            </div>
            <h3>Front-end & Web</h3>
            <p>
              Criação de interfaces web modernas e reativas. <br />
              <strong>Stack:</strong> React, Tailwind CSS, Bootstrap, MERN Stack.
            </p>
          </li>
          {/* Back-end e Linguagens */}
          <li className="skills__item">
            <div className="image-container">
              <img src="/img/wampserver.png" alt="Back-end" className="svg-icons" />
            </div>
            <h3>Back-end & Linguagens</h3>
            <p>
              Desenvolvimento de servidores robustos e APIs. <br />
              <strong>Linguagens:</strong> Node.js, Java, Python, TypeScript, JavaScript, PHP.<br />
              <strong>Frameworks:</strong> Express.js, Laravel.
            </p>
          </li>
          {/* Bancos de Dados */}
          <li className="skills__item">
            <div className="image-container">
              <img src="/img/postman.svg" alt="Banco de Dados" className="svg-icons" />
            </div>
            <h3>Bancos de Dados & APIs</h3>
            <p>
              Modelagem, integração e testes de sistemas de dados e rotas. <br />
              <strong>Bancos:</strong> PostgreSQL, MySQL, MongoDB, Redis.<br />
              <strong>Ferramentas:</strong> Postman.
            </p>
          </li>
          {/* DevOps & Ferramentas */}
          <li className="skills__item">
            <div className="image-container">
              <img src="/img/gitlogo.svg" alt="DevOps e Ferramentas" className="svg-icons" />
            </div>
            <h3>DevOps, Cloud & Ferramentas</h3>
            <p>
              Gerenciamento de código, containers e deploy na nuvem. <br />
              <strong>Cloud & Infra:</strong> Docker, Azure, Google Cloud Platform (GCP).<br />
              <strong>Controle:</strong> Git, GitHub, NPM.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}
