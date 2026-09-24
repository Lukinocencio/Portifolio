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
          <li><a href="#header">{t.nav_home}</a></li>
          <li><a href="#about">{t.nav_about}</a></li>
          <li><a href="#skills">{t.nav_skills}</a></li>
          <li><a href="#projects">{t.nav_projects}</a></li>
          <li><a href="#footer">{t.nav_contact}</a></li>
        </ul>

        {/* ACTIONS (RIGHT) - COM MESMO ESPAÇAMENTO */}
        <div className="navbar__actions" style={{ display: 'flex', gap: '3rem', alignItems: 'center', flex: '0 0 auto' }}>
          <button onClick={toggleTheme} style={{background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '2rem', color: 'var(--text-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0'}}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          <button onClick={() => toggleLanguage(language === "pt" ? "en" : "pt")} style={{background: 'transparent', border: '2px solid var(--text-color)', color: 'var(--text-color)', borderRadius: '6px', padding: '4px 12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.4rem', minWidth: '45px', textAlign: 'center'}}>
            {language === "pt" ? "EN" : "PT-BR"}
          </button>
        </div>

        {/* MOBILE OVERLAY */}
        <div className={`navbar__mobile ${isMobileOpen ? "active" : ""}`}>
          <div style={{display: 'flex', gap: '2rem', alignItems: 'center', position: 'absolute', right: '60px', top: '25px'}}>
            <button onClick={toggleTheme} style={{background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '2rem', color: 'var(--text-color)'}}>
              {theme === "light" ? "🌙" : "☀️"}
            </button>
            <button onClick={() => toggleLanguage(language === "pt" ? "en" : "pt")} style={{background: 'transparent', border: '2px solid var(--text-color)', color: 'var(--text-color)', borderRadius: '6px', padding: '4px 12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.4rem'}}>
              {language === "pt" ? "EN" : "PT-BR"}
            </button>
          </div>
          <img 
            src="/img/menu.svg" 
            alt="Menu" 
            className="burger" 
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          />
          <ul className="mobile__links">
            <li><a href="#header" onClick={() => setIsMobileOpen(false)}>{t.nav_home}</a></li>
            <li><a href="#about" onClick={() => setIsMobileOpen(false)}>{t.nav_about}</a></li>
            <li><a href="#skills" onClick={() => setIsMobileOpen(false)}>{t.nav_skills}</a></li>
            <li><a href="#projects" onClick={() => setIsMobileOpen(false)}>{t.nav_projects}</a></li>
            <li><a href="#footer" onClick={() => setIsMobileOpen(false)}>{t.nav_contact}</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
