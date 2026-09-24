"use client";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const [year, setYear] = useState(new Date().getFullYear());
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", tel: "", subject: "", message: "" });
  const [isSending, setIsSending] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("lucasifranca@outlook.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setSubmitStatus("");

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus(t.modal_success);
        setFormData({ name: "", email: "", tel: "", subject: "", message: "" });
      } else {
        const errorData = await response.json();
        setSubmitStatus(`Erro: ${errorData.error || "Falha no envio"}`);
      }
    } catch (error) {
      setSubmitStatus(`Erro de conexão: ${error.message}`);
    }

    setIsSending(false);
    setTimeout(() => setSubmitStatus(""), 5000);
  };

  return (
    <footer id="footer">
      <div className="footer__content max-width mb-0">
        <h2 className="tertiary-title mb-s">{t.footer_title}</h2>
        <p className="mb-m">{t.footer_desc}</p>
        <div className="footer__contact mb-m">
          <span className="email" onClick={copyEmail} title={t.footer_copy_msg}>
            lucasifranca@outlook.com
          </span>
          {copied && <span style={{color: 'var(--tertiary-color)', marginLeft: '10px'}}>{t.footer_copied_msg}</span>}
        </div>
        <div className="contact-form-container">
          <h3 style={{color: 'var(--white)', marginBottom: '15px'}}>{t.footer_btn_contact}</h3>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder={t.modal_name} required value={formData.name} onChange={handleInputChange} />
            <input type="email" name="email" placeholder={t.modal_email} required value={formData.email} onChange={handleInputChange} />
            <input type="tel" name="tel" placeholder={t.modal_tel} required value={formData.tel} onChange={handleInputChange} />
            <input type="text" name="subject" placeholder={t.modal_subject} required value={formData.subject} onChange={handleInputChange} />
            <textarea name="message" placeholder={t.modal_message} required rows="4" value={formData.message} onChange={handleInputChange}></textarea>
            <button type="submit" disabled={isSending} style={{cursor: isSending ? 'not-allowed' : 'pointer'}}>
              {isSending ? t.modal_sending : t.modal_btn_send}
            </button>
            {submitStatus && <p style={{color: submitStatus.includes("Erro") ? "#ff6b6b" : "#4caf50", marginTop: "10px"}}>{submitStatus}</p>}
          </form>
        </div>
        <ul className="mb-l">
          <li>
            <a href="https://github.com/Lukinocencio" target="_blank" rel="noreferrer">
              <img src="/img/github.svg" alt="GitHub" className="svg-icons" />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/lucas-inocencio-franca" target="_blank" rel="noreferrer">
              <img src="/img/linkedin.svg" alt="LinkedIn" className="svg-icons" />
            </a>
          </li>
        </ul>
        <p className="footer__copyright">
          © {year} Lucas Inocêncio de França. {t.footer_rights}
        </p>
      </div>
    </footer>
  );
}
