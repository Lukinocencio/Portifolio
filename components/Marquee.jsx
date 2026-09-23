export default function Marquee() {
  const techs = [
    "React", "Next.js", "Node.js", "PHP", "MySQL", "MongoDB", 
    "JavaScript", "TailwindCSS", "Git", "Express.js", "Vercel", "Cybersecurity"
  ];
  
  // Triplicamos o array para garantir que a rolagem seja infinita e sem cortes na tela
  const duplicatedTechs = [...techs, ...techs, ...techs];

  return (
    <div className="marquee-container">
      <div className="marquee-content">
        {duplicatedTechs.map((tech, index) => (
          <span key={index} className="marquee-item">
            {tech} <span style={{color: 'var(--tertiary-color)', margin: '0 10px'}}>•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
