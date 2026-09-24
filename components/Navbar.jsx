"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  const { t, language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? "active" : ""}`}>
      <div className="navbar__content max-width mb-0" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* LOGO */}
        <div style={{ flex: '0 0 auto' }}>
          <a href="/">
            <img src="/img/lfrancalogo.png" width="70" height="70" alt="Lucas França" />
          </a>
        </div>

        {/* LINKS (CENTERED) */}
        <ul className="navbar__links" style={{ flex: '1', display: 'flex', justifyContent: 'center', gap: '3rem', margin: 0, padding: 0 }}>
          <li><a onClick={() => scrollTo("header")}>{t.nav_home}</a></li>
          <li><a onClick={() => scrollTo("about")}>{t.nav_about}</a></li>
          <li><a onClick={() => scrollTo("skills")}>{t.nav_skills}</a></li>
          <li><a onClick={() => scrollTo("projects")}>{t.nav_projects}</a></li>
          <li><a onClick={() => scrollTo("footer")}>{t.nav_contact}</a></li>
        </ul>

        {/* ACTIONS (RIGHT) - COM MESMO ESPAÇAMENTO */}
        <div className="navbar__actions" style={{ gap: '3rem', alignItems: 'center', flex: '0 0 auto' }}>
          <button onPointerDown={(e) => e.preventDefault()} onClick={toggleTheme} style={{background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '2rem', color: 'var(--text-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0'}}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          <button onPointerDown={(e) => e.preventDefault()} onClick={() => toggleLanguage(language === "pt" ? "en" : "pt")} style={{background: 'transparent', border: '2px solid var(--text-color)', color: 'var(--text-color)', borderRadius: '6px', padding: '4px 12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.4rem', minWidth: '45px', textAlign: 'center'}}>
            {language === "pt" ? "EN" : "PT"}
          </button>
        </div>

        {/* MOBILE OVERLAY */}
        <div className={`navbar__mobile ${isMobileOpen ? "active" : ""}`}>
            <button onPointerDown={(e) => e.preventDefault()} onClick={toggleTheme} style={{background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '2rem', color: 'var(--text-color)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              {theme === "light" ? "🌙" : "☀️"}
            </button>
            <button onPointerDown={(e) => e.preventDefault()} onClick={() => toggleLanguage(language === "pt" ? "en" : "pt")} style={{background: 'transparent', border: '2px solid var(--text-color)', color: 'var(--text-color)', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.2rem', minWidth: '40px'}}>
              {language === "pt" ? "EN" : "PT"}
            </button>
          <img 
            src="/img/menu.svg" 
            alt="Menu" 
            className="burger" 
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            style={{marginLeft: '10px'}}
          />
          <ul className="mobile__links">
            <li><a onClick={() => scrollTo("header")}>{t.nav_home}</a></li>
            <li><a onClick={() => scrollTo("about")}>{t.nav_about}</a></li>
            <li><a onClick={() => scrollTo("skills")}>{t.nav_skills}</a></li>
            <li><a onClick={() => scrollTo("projects")}>{t.nav_projects}</a></li>
            <li><a onClick={() => scrollTo("footer")}>{t.nav_contact}</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
