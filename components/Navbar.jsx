"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? "active" : ""}`}>
      <div className="navbar__content max-width mb-0">
        <a href="/">
          <img src="/img/lfrancalogo.png" width="70" height="70" alt="Lucas França" />
        </a>
        <ul className="navbar__links">
          <li><a href="#header">Início</a></li>
          <li><a href="#about">Sobre</a></li>
          <li><a href="#skills">Habilidades</a></li>
          <li><a href="#projects">Projetos</a></li>
          <li><a href="#footer">Contato</a></li>
        </ul>
        <div className={`navbar__mobile ${isMobileOpen ? "active" : ""}`}>
          <img 
            src="/img/menu.svg" 
            alt="Menu" 
            className="burger" 
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          />
          <ul className="mobile__links">
            <li><a href="#header" onClick={() => setIsMobileOpen(false)}>Início</a></li>
            <li><a href="#about" onClick={() => setIsMobileOpen(false)}>Sobre</a></li>
            <li><a href="#skills" onClick={() => setIsMobileOpen(false)}>Habilidades</a></li>
            <li><a href="#projects" onClick={() => setIsMobileOpen(false)}>Projetos</a></li>
            <li><a href="#footer" onClick={() => setIsMobileOpen(false)}>Contato</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
