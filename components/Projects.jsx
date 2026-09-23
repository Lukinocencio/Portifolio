export default function Projects() {
  return (
    <section id="projects" className="projects max-width">
      <div className="projects__content">
        <h2 className="secondary-title">Projetos Pessoais</h2>
        <p>
          Desde ideias abstratas a linhas de códigos, a cursos com projetos práticos e desafios criativos!
        </p>
      </div>
      <ul>
        <li>
          <div className="image">
            <img src="/img/mernstack.jpg" alt="Plataforma MERN" />
          </div>
          <div className="projects__info">
            <h3 className="tertiary-title">Plataforma para conectar desenvolvedores</h3>
            <p>
              Uma plataforma para conectar e conhecer desenvolvedores utilizando as tecnologias MERN Stack!
            </p>
            <a href="#">Leia mais &rarr;</a>
          </div>
        </li>
        <li className="projects__reversed-list">
          <div className="image">
            <img src="/img/ecommerce.png" alt="ecommerce" />
          </div>
          <div className="projects__info">
            <h3 className="tertiary-title">E-commerce</h3>
            <p>
              Uma loja online feita para praticar os princípios do CRUD, também utilizando banco de dados e API de consulta de CEP.
            </p>
            <a href="#">Leia mais &rarr;</a>
          </div>
        </li>
        <li>
          <div className="image">
            <img src="/img/encryption.png" alt="criptografia" />
          </div>
          <div className="projects__info">
            <h3 className="tertiary-title">Sistema de criptografia</h3>
            <p>
              Um programa feito em Python para criptografar, recebendo uma frase e uma chave, e capaz de descriptografar utilizando a chave.
            </p>
            <a href="#">Leia mais &rarr;</a>
          </div>
        </li>
      </ul>
    </section>
  );
}
