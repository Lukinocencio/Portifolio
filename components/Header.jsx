"use client";
import { useLanguage } from "@/context/LanguageContext";

export default function Header() {
  const { t } = useLanguage();

  return (
    <header id="header" className="max-width">
      <div className="header__left">
        <h1>{t.header_title}</h1>
        <p>{t.header_subtitle}</p>
        <div style={{display: 'flex', gap: '15px'}}>
          <a href="#about" className="btn btn-primary">{t.header_btn_more}</a>
          <a href="/cv/curriculo.pdf" download className="btn btn-primary" style={{backgroundColor: 'var(--text-color)', color: 'var(--white)'}}>
            {t.header_btn_cv}
          </a>
        </div>
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
