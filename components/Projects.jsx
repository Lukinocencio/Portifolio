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
          setRepos(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar projetos do github", err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="projects" className="projects max-width">
      <div className="projects__content">
        <h2 className="secondary-title">{t.projects_title}</h2>
        <p>{t.projects_desc}</p>
      </div>
      <ul>
        {loading ? (
          <p style={{ textAlign: "center", width: "100%" }}>Carregando projetos...</p>
        ) : (
          repos.map((repo) => (
            <li key={repo.id}>
              <div className="image">
                {/* Fallback pattern for images based on repo topics or just a generic one */}
                <img src="/img/ecommerce.png" alt="Repositório" />
              </div>
              <div className="projects__info">
                <h3 className="tertiary-title">{repo.name}</h3>
                <p>{repo.description || "Sem descrição disponível."}</p>
                <div style={{display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '15px'}}>
                  {repo.language && <span style={{fontSize: '0.8rem', backgroundColor: 'var(--tertiary-color)', color: 'var(--white)', padding: '2px 8px', borderRadius: '12px'}}>{repo.language}</span>}
                </div>
                <a href={repo.html_url} target="_blank" rel="noreferrer">
                  {t.projects_read_more}
                </a>
              </div>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
