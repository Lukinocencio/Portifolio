"use client";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Projects() {
  const { t } = useLanguage();
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/users/Lukinocencio/repos?type=public&sort=updated&per_page=6")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Triplicamos o array para que o efeito do carrossel não tenha corte
          setRepos([...data, ...data, ...data]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar projetos do github", err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="projects" className="projects">
      <div className="projects__content max-width">
        <h2 className="secondary-title">{t.projects_title}</h2>
        <p>{t.projects_desc}</p>
      </div>
      <div className="projects-marquee-container">
        <ul className="projects-marquee-content">
          {loading ? (
            <p style={{ textAlign: "center", width: "100%", fontSize: "1.6rem" }}>Carregando projetos...</p>
          ) : (
            repos.map((repo, index) => (
              <li key={`${repo.id}-${index}`}>
                <div className="image">
                  <img src="/img/ecommerce.png" alt="Repositório" />
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
                  <a href={repo.html_url} target="_blank" rel="noreferrer">
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
