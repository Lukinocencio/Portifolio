"use client";
import { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

// Função utilitária para extrair e garantir 3 tags para os cards
function getRepoTags(repo) {
  const tags = [];
  
  if (repo.language) tags.push(repo.language);
  
  if (repo.topics && repo.topics.length > 0) {
    tags.push(...repo.topics);
  }
  
  // Remove duplicatas
  let uniqueTags = [...new Set(tags)];
  
  // Preenche caso faltem tags
  if (uniqueTags.length === 0) {
    uniqueTags = ["Software", "Project", "Code"];
  } else if (uniqueTags.length === 1) {
    uniqueTags.push(repo.name.length > 5 ? "Development" : "Web");
    uniqueTags.push("Code");
  } else if (uniqueTags.length === 2) {
    uniqueTags.push("Code");
  }
  
  // Retorna no máximo 3 tags
  return uniqueTags.slice(0, 3);
}

export default function Projects() {
  const { t } = useLanguage();
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const isHovered = useRef(false);
  const startX = useRef(0);
  const scrollDirection = useRef(1); // 1 = Esquerda, -1 = Direita

  useEffect(() => {
    fetch("https://api.github.com/users/Lukinocencio/repos?type=public&sort=updated&per_page=6")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // 3 blocos
          setRepos([...data, ...data, ...data]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar projetos", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!loading && scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth / 3;
    }
  }, [loading, repos]);

  useEffect(() => {
    if (loading || !scrollRef.current) return;

    let animationId;
    const loop = () => {
      const el = scrollRef.current;
      if (!el) return;

      if (!isDragging.current && !isHovered.current) {
        let newScrollLeft = el.scrollLeft + (1 * scrollDirection.current);
        const singleBlockWidth = el.scrollWidth / 3;

        // Limites da animação
        if (newScrollLeft >= singleBlockWidth * 2) {
          newScrollLeft -= singleBlockWidth;
        } else if (newScrollLeft <= 0) {
          newScrollLeft += singleBlockWidth;
        }
        
        el.scrollLeft = newScrollLeft;
      }

      animationId = requestAnimationFrame(loop);
    };
    
    animationId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationId);
  }, [loading]);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX;
    if (scrollRef.current) scrollRef.current.style.cursor = 'grabbing';
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    isHovered.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    
    const x = e.pageX;
    const delta = startX.current - x; 
    
    if (delta !== 0) {
      let newScrollLeft = scrollRef.current.scrollLeft + delta;
      const singleBlockWidth = scrollRef.current.scrollWidth / 3;

      // Realiza o loop ANTES de definir no DOM para evitar que o navegador trave em 0 ou max
      if (newScrollLeft >= singleBlockWidth * 2) {
        newScrollLeft -= singleBlockWidth;
      } else if (newScrollLeft <= 0) {
        newScrollLeft += singleBlockWidth;
      }
      
      scrollRef.current.scrollLeft = newScrollLeft;
      scrollDirection.current = delta > 0 ? 1 : -1;
      startX.current = x; 
    }
  };

  const handleMouseEnter = () => {
    isHovered.current = true;
  };

  const preventImageDrag = (e) => e.preventDefault();

  return (
    <section id="projects" className="projects">
      <div className="projects__content max-width">
        <h2 className="secondary-title">{t.projects_title}</h2>
        <p>{t.projects_desc}</p>
      </div>
      
      <div 
        className="projects-marquee-container"
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
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
                  <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '15px'}}>
                    {getRepoTags(repo).map((tag, i) => (
                      <span key={i} style={{fontSize: '1.2rem', backgroundColor: 'var(--tertiary-color)', color: '#ffffff', padding: '6px 14px', borderRadius: '14px'}}>
                        {tag}
                      </span>
                    ))}
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
