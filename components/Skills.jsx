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
            <div className="tech-tags">
              <span>React</span>
              <span>Next.js</span>
              <span>TailwindCSS</span>
              <span>Handlebars</span>
              <span>EJS</span>
              <span>jQuery</span>
            </div>
          </li>
          <li className="skills__item">
            <div className="image-container">
              <img src="/img/mernstack.jpg" alt="Back-end" />
            </div>
            <h3>{t.skills_backend}</h3>
            <p>{t.skills_backend_desc}</p>
            <div className="tech-tags">
              <span>JavaScript</span>
              <span>PHP</span>
              <span>Java</span>
              <span>C</span>
              <span>Express.js</span>
            </div>
          </li>
          <li className="skills__item">
            <div className="image-container">
              <img src="/img/encryption.png" alt="Database" />
            </div>
            <h3>{t.skills_database}</h3>
            <p>{t.skills_database_desc}</p>
            <div className="tech-tags">
              <span>MySQL</span>
              <span>MongoDB</span>
              <span>Mongoose</span>
              <span>Sequelize</span>
              <span>Postman</span>
            </div>
          </li>
          <li className="skills__item">
            <div className="image-container">
              <img src="/img/wampserver.png" alt="DevOps & Tools" />
            </div>
            <h3>{t.skills_devops}</h3>
            <p>{t.skills_devops_desc}</p>
            <div className="tech-tags">
              <span>Git</span>
              <span>GitHub</span>
              <span>Linux</span>
              <span>Vercel</span>
              <span>Insomnia</span>
              <span>XAMPP/WampServer</span>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
