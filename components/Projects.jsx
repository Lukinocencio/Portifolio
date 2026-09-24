"use client";
import { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useFilter } from "@/context/FilterContext";

function getRepoTags(repo) {
  const tags = [];
  if (repo.language) tags.push(repo.language);
  if (repo.topics && repo.topics.length > 0) {
    tags.push(...repo.topics);
  }
  let uniqueTags = [...new Set(tags)];
  if (uniqueTags.length === 0) {
    uniqueTags = ["Software", "Project", "Code"];
  } else if (uniqueTags.length === 1) {
    uniqueTags.push(repo.name.length > 5 ? "Development" : "Web");
    uniqueTags.push("Code");
  } else if (uniqueTags.length === 2) {
    uniqueTags.push("Code");
  }
  return uniqueTags.slice(0, 3);
}

const placeholders = [
  "/img/ecommerce.png",
  "/img/encryption.png",
  "/img/mern-stack.png",
  "/img/mernstack.jpg"
];

function getRepoImage(repo) {
  // Returns a consistent placeholder image based on the repo ID
  const index = (repo.id || 0) % placeholders.length;
  return placeholders[index];
}

export default function Projects() {
  const { t } = useLanguage();
  const { selectedSkill } = useFilter();
  const [allRepos, setAllRepos] = useState([]);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const isHovered = useRef(false);
  const startX = useRef(0);
  const scrollDirection = useRef(1); // 1 = Esquerda, -1 = Direita

  useEffect(() => {
    fetch("https://api.github.com/users/Lukinocencio/repos?type=public&sort=updated&per_page=30")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const filteredRepos = data.filter(repo => repo.name !== "Lukinocencio");
          setAllRepos(filteredRepos);
          const initial = filteredRepos.slice(0, 6);
          setRepos([...initial, ...initial, ...initial]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar projetos", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!allRepos.length) return;
    
    if (selectedSkill) {
      const filtered = allRepos.filter(repo => {
        const tags = getRepoTags(repo);
        return tags.some(tag => tag.toLowerCase() === selectedSkill.toLowerCase());
      });
      // Se houver selectedSkill, nao duplicamos. Mostramos apenas os resultados.
      setRepos(filtered);
      // Reseta o scroll para o comeco
      if (scrollRef.current) scrollRef.current.scrollLeft = 0;
    } else {
      const initial = allRepos.slice(0, 6);
      setRepos([...initial, ...initial, ...initial]);
      // Reposiciona o scroll no meio para o loop funcionar
      if (scrollRef.current) {
        setTimeout(() => {
           if (scrollRef.current) scrollRef.current.scrollLeft = scrollRef.current.scrollWidth / 3;
        }, 100);
      }
    }
  }, [selectedSkill, allRepos]);

  useEffect(() => {
    if (loading || !scrollRef.current) return;

    let animationId;
    const loop = () => {
      const el = scrollRef.current;
      if (!el) return;

      // Gira apenas se NAO tiver skill selecionada, NAO tiver mouse em cima, e NAO estiver arrastando
      if (!selectedSkill && !isDragging.current && !isHovered.current) {
        let newScrollLeft = el.scrollLeft + (1 * scrollDirection.current);
        const singleBlockWidth = el.scrollWidth / 3;

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
  }, [loading, selectedSkill]);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX;
    if (scrollRef.current) scrollRef.current.style.cursor = "grabbing";
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    isHovered.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = "grab";
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = "grab";
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    
    const x = e.pageX;
    const delta = startX.current - x; 
    
    if (delta !== 0) {
      let newScrollLeft = scrollRef.current.scrollLeft + delta;
      
      // Somente faz o loop infinito se nao houver filtro ativo
      if (!selectedSkill) {
        const singleBlockWidth = scrollRef.current.scrollWidth / 3;
        if (newScrollLeft >= singleBlockWidth * 2) {
          newScrollLeft -= singleBlockWidth;
        } else if (newScrollLeft <= 0) {
          newScrollLeft += singleBlockWidth;
        }
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
        <ul className={`projects-marquee-content ${selectedSkill ? "filtered-view" : ""}`}>
          {loading ? (
            <p style={{ textAlign: "center", width: "100%", fontSize: "1.6rem" }}>Carregando projetos...</p>
          ) : selectedSkill && repos.length === 0 ? (
            <div style={{ textAlign: "center", width: "100%", padding: "40px 0" }}>
              <p style={{ fontSize: "1.8rem", color: "var(--primary-color, #ff6b6b)", marginBottom: "10px" }}>Oops!</p>
              <p style={{ fontSize: "1.4rem" }}>Nenhum projeto público ainda disponível com a skill <strong>{selectedSkill}</strong>.</p>
            </div>
          ) : (
            repos.map((repo, index) => (
              <li key={`${repo.id}-${index}`} className={selectedSkill ? "highlighted-project" : ""}>
                <div className="image">
                  <img src={getRepoImage(repo)} alt={repo.name} onDragStart={preventImageDrag} />
                </div>
                <div className="projects__info">
                  <h3 className="tertiary-title">{repo.name}</h3>
                  <p>{repo.description || "Sem descrição disponível."}</p>
                  <div className="projects__tags">
                    {getRepoTags(repo).map((tag, i) => (
                      <span key={i} className="tech-badge" style={{ animationDelay: `${i * 0.15}s` }}>
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
