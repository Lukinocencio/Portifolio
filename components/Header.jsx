export default function Header() {
  return (
    <header id="header" className="max-width">
      <div className="header__left">
        <h1>Meu nome é Lucas França, e sou um desenvolvedor Full-Stack!</h1>
        <p>Venha conhecer mais sobre mim!</p>
        <a href="#about" className="btn btn-primary">Saiba Mais!</a>
      </div>
      <div className="header__right">
        <div className="header__image">
          <img src="/img/lucas-franca.png" height="470" alt="Lucas Inocêncio de França" className="lucas" />
          <img src="/img/abstract.svg" alt="background" className="background" />
        </div>
      </div>
    </header>
  );
}
