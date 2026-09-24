"use client";
import { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Projects() {
  const { t } = useLanguage();
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados para o drag and scroll
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);

  useEffect(() => {
    fetch("https://api.github.com/users/Lukinocencio/repos?type=public&sort=updated&per_page=6")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Duplicamos o array 4 vezes para garantir o scroll infinito seguro
          setRepos([...data, ...data, ...data, ...data]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar projetos do github", err);
        setLoading(false);
      });
  }, []);

  // Lógica do Auto-Scroll Infinito
  useEffect(() => {
    if (loading || !scrollRef.current) return;

    let animationId;
    const scroll = () => {
      if (scrollRef.current && !isDragging && !isHovered) {
        scrollRef.current.scrollLeft += 1; // Velocidade do scroll (1px por frame)
        
        // Se rolamos além da metade (2 dos 4 arrays), voltamos para o início de forma invisível
        if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
          scrollRef.current.scrollLeft = 0;
        }
        // Lógica para quando o usuário arrasta para a esquerda do início
        else if (scrollRef.current.scrollLeft <= 0 && isDragging) {
            scrollRef.current.scrollLeft = scrollRef.current.scrollWidth / 2;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };
    
    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isDragging, isHovered, loading]);

  // Handlers do Mouse
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftPos(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsHovered(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Multiplicador de velocidade do arraste
    
    let newScrollLeft = scrollLeftPos - walk;
    
    // Simula o infinito ao arrastar manualmente
    if (newScrollLeft >= scrollRef.current.scrollWidth / 2) {
        newScrollLeft = 0;
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeftPos(0);
    } else if (newScrollLeft <= 0) {
        newScrollLeft = scrollRef.current.scrollWidth / 2;
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeftPos(scrollRef.current.scrollWidth / 2);
    }
    
    scrollRef.current.scrollLeft = newScrollLeft;
  };

  // Previne que arrastar as imagens bugue o drag nativo do HTML
  const preventImageDrag = (e) => {
    e.preventDefault();
  };

  return (
    <section id="projects" className="projects">
      <div className="projects__content max-width">
        <h2 className="secondary-title">{t.projects_title}</h2>
        <p>{t.projects_desc}</p>
      </div>
      
      <div 
        className={`projects-marquee-container ${isDragging ? 'dragging' : ''}`}
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
      >
        <ul className="projects-marquee-content">
          {loading ? (
            <p style={{ textAlign: "center", width: "100%", fontSize: "1.6rem" }}>Carregando projetos...</p>
          ) : (
            repos.map((repo, index) => (
              <li key={`${repo.id}-${index}`}>
                <div className="image">
                  <img src="/img/ecommerce.png" alt="Repositório" onDragStart={preventImageDrag} />
                </div>
                <div className="projects__info">
                  <h3 className="tertiary-title">{repo.name}</h3>
                  <p>{repo.description || "Sem descrição disponível."}</p>
                  <div style={{display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '15px'}}>
                    {repo.language && (
                      <span style={{fontSize: '1rem', backgroundColor: 'var(--tertiary-color)', color: '#ffffff', padding: '4px 10px', borderRadius: '12px'}}>
                        {repo.language}
                      </span>
                    )}
                  </div>
                  <a href={repo.html_url} target="_blank" rel="noreferrer" draggable="false">
                    {t.projects_read_more}
                  </a>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
}
