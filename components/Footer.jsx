"use client";
import { useState, useEffect } from "react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copyMsg, setCopyMsg] = useState("Clique para copiar o e-mail");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tel: "",
    subject: "",
    message: ""
  });

  const [formStatus, setFormStatus] = useState("");

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const copiarEmail = () => {
    const emailText = "lucasifranca@outlook.com";
    navigator.clipboard.writeText(emailText)
      .then(() => setCopyMsg("E-mail copiado com sucesso!"))
      .catch(err => console.error("Erro ao copiar o e-mail: ", err));
    
    setTimeout(() => setCopyMsg("Clique para copiar o e-mail"), 3000);
  };

  const mascaraTelefone = (value) => {
    if (!value) return "";
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    return value;
  };

  const handlePhone = (e) => {
    setFormData({ ...formData, tel: mascaraTelefone(e.target.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("Enviando...");
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setFormStatus("Enviado com sucesso!");
        setTimeout(() => {
          setIsModalOpen(false);
          setFormStatus("");
          setFormData({ name: "", email: "", tel: "", subject: "", message: "" });
        }, 2000);
      } else {
        const errorText = await res.text();
        setFormStatus(`Erro: ${errorText}`);
      }
    } catch (err) {
      setFormStatus("Erro ao enviar e-mail!");
    }
  };

  return (
    <footer id="footer">
      <div className="footer__content max-width mb-0">
        <h2 className="tertiary-title mb-s">Vamos Conversar?</h2>
        <p className="mb-m">Ficarei feliz em conhecer quem está pelo outro lado!</p>
        <div className="footer__contact mb-m">
          <div className="tooltip">
            <span id="copiado-mensagem" className="tooltiptext">{copyMsg}</span>
            <span id="footer-email" className="mb-m" onClick={copiarEmail} style={{ cursor: 'pointer' }}>
              lucasifranca@outlook.com
            </span>
          </div>
          <br />
          <button id="openModalBtn" className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            Formulário de contato
          </button>

          {isModalOpen && (
            <div id="modal" className="modal" style={{ display: 'block' }}>
              <div className="modal__content">
                <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
                <h2 className="secondary-title">Entre em contato!</h2>
                <form id="emailForm" className="contact-form" onSubmit={handleSubmit}>
                  <input type="text" name="name" className="input__group" placeholder=" Digite seu Nome" maxLength="65" required 
                    value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} /><br />

                  <input type="email" name="email" className="input__group" placeholder=" Digite seu E-mail" maxLength="255" required 
                    value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} /><br />

                  <input type="tel" name="tel" className="input__group" placeholder=" Digite seu Telefone" maxLength="15" required 
                    value={formData.tel} onChange={handlePhone} /><br />

                  <input type="text" name="subject" className="input__group" placeholder=" Digite o Assunto" maxLength="65" required 
                    value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} /><br />

                  <textarea name="message" className="input__group" spellCheck="true" placeholder=" Digite sua Mensagem" required 
                    value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} /><br />

                  <button type="submit" className="btn btn-primary" disabled={formStatus === "Enviando..."}>
                    {formStatus === "Enviando..." ? "Enviando..." : "Enviar"}
                  </button>
                  {formStatus && <p style={{ marginTop: '10px', fontSize: '14px', color: '#35CD95' }}>{formStatus}</p>}
                </form>
              </div>
            </div>
          )}
        </div>

        <ul className="mb-s">
          <p className="mb-s">Confira minhas redes abaixo:</p>
          <li><a href="https://github.com/Lukinocencio" target="_blank" rel="noreferrer"><img src="/img/github.svg" alt="GitHub" className="svg-icons" /></a></li>
          <li><a href="https://www.linkedin.com/in/lucas-inocencio-franca" target="_blank" rel="noreferrer"><img src="/img/linkedin.svg" alt="LinkedIn" className="svg-icons" /></a></li>
        </ul>
        <p className="footer__copyright">
          &copy; {currentYear} Lucas França. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
