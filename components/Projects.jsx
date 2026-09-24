"use client";
import { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Projects() {
  const { t } = useLanguage();
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Usamos Refs em vez de State para não causar re-renders pesados ao arrastar (liso)
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const isHovered = useRef(false);
  const startX = useRef(0);
  const scrollDirection = useRef(1); // 1 = Esquerda (padrão), -1 = Direita

  useEffect(() => {
    fetch("https://api.github.com/users/Lukinocencio/repos?type=public&sort=updated&per_page=6")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // 3 blocos exatos: (Anterior Invisível) | (Centro Visível) | (Próximo Invisível)
          setRepos([...data, ...data, ...data]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar projetos do github", err);
        setLoading(false);
      });
  }, []);

  // Centraliza o scroll perfeitamente no bloco do meio quando a página carrega
  useEffect(() => {
    if (!loading && scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth / 3;
    }
  }, [loading, repos]);

  // Loop super leve a 60FPS usando requestAnimationFrame
  useEffect(() => {
    if (loading || !scrollRef.current) return;

    let animationId;
    const loop = () => {
      const el = scrollRef.current;
      if (!el) return;

      // Auto scroll contínuo na direção que o usuário jogou
      if (!isDragging.current && !isHovered.current) {
        el.scrollLeft += (1 * scrollDirection.current);
      }

      // Loop Infinito Sem Fim (Costura perfeita da matemática)
      const singleBlockWidth = el.scrollWidth / 3;
      
      // Se passou muito pra direita, teletransporta pra trás imperceptivelmente
      if (el.scrollLeft >= singleBlockWidth * 2) {
        el.scrollLeft = el.scrollLeft - singleBlockWidth;
      } 
      // Se passou muito pra esquerda, teletransporta pra frente imperceptivelmente
      else if (el.scrollLeft <= 0) {
        el.scrollLeft = el.scrollLeft + singleBlockWidth;
      }

      animationId = requestAnimationFrame(loop);
    };
    
    animationId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationId);
  }, [loading]);

  // Mouse Handlers extremamente limpos para Drag perfeito
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
    if (!isDragging.current) return;
    e.preventDefault();
    
    const x = e.pageX;
    const delta = startX.current - x; // Pega a diferença arrastada
    
    if (delta !== 0) {
      scrollRef.current.scrollLeft += delta; // Move instantaneamente junto com o mouse
      
      // Memoriza a direção para o carrossel continuar rolando pra onde foi jogado!
      scrollDirection.current = delta > 0 ? 1 : -1;
      
      startX.current = x; // Atualiza a âncora frame a frame
    }
  };

  const handleMouseEnter = () => {
    isHovered.current = true;
  };

  // Previne arrastar a imagem nativamente
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
