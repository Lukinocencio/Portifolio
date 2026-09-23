"use client";
import { useEffect, useState } from "react";

export default function About() {
  const [age, setAge] = useState(22); // Default to current age initially to avoid hydration mismatch, or just calculate immediately if not relying on SSR matches

  useEffect(() => {
    const calculateAge = () => {
      const birthDate = new Date(2003, 8, 13); // Month is 0-indexed (8 = September)
      const today = new Date();
      let currentAge = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        currentAge--;
      }
      return currentAge;
    };
    setAge(calculateAge());
  }, []);

  return (
    <section id="about" className="about max-width">
      <div className="about__left">
        <h2 className="secondary-title">Além do código: Quem sou eu?</h2>
        <p>
          Tenho {age} anos e tenho grande interesse na área de cibersegurança, porém, ainda estou trilhando meu caminho, e espero que você possa participar dele!
          Focado em pensar nas melhores soluções de problemas reais para os usuários.
          Instigado pela inovação e criação de soluções impactantes, sempre fui fascinado pela maneira de como a tecnologia transforma o mundo ao nosso redor.
        </p>
        <ul>
          <li>
            <a href="https://github.com/Lukinocencio" target="_blank" rel="noreferrer">
              <img src="/img/github.svg" alt="GitHub de Lucas Inocêncio" className="svg-icons" />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/lucas-inocencio-franca" target="_blank" rel="noreferrer">
              <img src="/img/linkedin.svg" alt="LinkedIn de Lucas Inocêncio" className="svg-icons" />
            </a>
          </li>
        </ul>
      </div>
      <div className="about__right">
        <h3 className="tertiary-title mb-m">
          Desenvolvedor Back-end buscando por tecnologia e soluções!
        </h3>
        <p>
          Estou sempre em busca de aprender e me aprimorar, mantendo-me atualizado com as tendências e avanços tecnológicos no campo do desenvolvimento back-end. Estou ansioso para enfrentar novos desafios e contribuir para projetos empolgantes que impulsionem a inovação e o progresso tecnológico.
        </p>
        <p>
          Acredito firmemente que a curiosidade é o combustível que impulsiona a inovação e o progresso, por isso, estou ansioso para continuar essa jornada e colaborar com mentes criativas.
        </p>
      </div>
    </section>
  );
}
