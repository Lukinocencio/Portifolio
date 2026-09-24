"use client";
import { useLanguage } from "@/context/LanguageContext";

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="skills">
      <div className="skills__content max-width">
        <h2 className="tertiary-title">{t.skills_title}</h2>
        <p className="description">{t.skills_desc}</p>
        <ul>
          <li className="skills__item">
            <div className="image-container">
              <img src="/img/ecommerce.png" alt="Front-end" />
            </div>
            <h3>{t.skills_frontend}</h3>
            <p>{t.skills_frontend_desc}</p>
            <div className="tech-tags-container">
              {['React', 'Next.js', 'TailwindCSS', 'Handlebars', 'EJS', 'jQuery'].map((tag, i) => (
                <span key={tag} className="tech-badge" style={{ animationDelay: `${i * 0.15}s` }}>{tag}</span>
              ))}
            </div>
          </li>
          <li className="skills__item">
            <div className="image-container">
              <img src="/img/mernstack.jpg" alt="Back-end" />
            </div>
            <h3>{t.skills_backend}</h3>
            <p>{t.skills_backend_desc}</p>
            <div className="tech-tags-container">
              {['JavaScript', 'PHP', 'Java', 'C', 'Express.js'].map((tag, i) => (
                <span key={tag} className="tech-badge" style={{ animationDelay: `${i * 0.15}s` }}>{tag}</span>
              ))}
            </div>
          </li>
          <li className="skills__item">
            <div className="image-container">
              <img src="/img/encryption.png" alt="Database" />
            </div>
            <h3>{t.skills_database}</h3>
            <p>{t.skills_database_desc}</p>
            <div className="tech-tags-container">
              {['MySQL', 'MongoDB', 'Mongoose', 'Sequelize', 'Postman'].map((tag, i) => (
                <span key={tag} className="tech-badge" style={{ animationDelay: `${i * 0.15}s` }}>{tag}</span>
              ))}
            </div>
          </li>
          <li className="skills__item">
            <div className="image-container">
              <img src="/img/wampserver.png" alt="DevOps & Tools" />
            </div>
            <h3>{t.skills_devops}</h3>
            <p>{t.skills_devops_desc}</p>
            <div className="tech-tags-container">
              {['Git', 'GitHub', 'Linux', 'Vercel', 'Insomnia', 'XAMPP/WampServer'].map((tag, i) => (
                <span key={tag} className="tech-badge" style={{ animationDelay: `${i * 0.15}s` }}>{tag}</span>
              ))}
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
