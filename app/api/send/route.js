import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

// Anti-Spam: Cache de IPs em memória (por instância lambda)
const ipRateLimit = new Map();

// Função auxiliar para sanitizar (escapar HTML) de forma básica
const escapeHTML = (str) => {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag])
  );
};

export async function POST(req) {
  try {
    // Obter IP para Rate Limiting
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();
    
    // Regra Anti-Spam: Bloqueia IPs que tentarem enviar mais de 1 email em menos de 1 minuto
    if (ipRateLimit.has(ip)) {
      const lastRequestTime = ipRateLimit.get(ip);
      if (now - lastRequestTime < 60000) { // 60 segundos
        return NextResponse.json({ error: "Limite de tentativas excedido. Tente novamente em 1 minuto." }, { status: 429 });
      }
    }
    ipRateLimit.set(ip, now);

    const body = await req.json();
    const { name, email, tel, subject, message, _honeypot } = body;

    // Anti-Spam: Verifica Campo Armadilha (Honeypot)
    if (_honeypot) {
      return NextResponse.json({ message: "E-mail enviado com sucesso!" }, { status: 200 }); // Retorna sucesso falso pro bot
    }

    // Validação de Segurança Básica (Backend)
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Campos obrigatórios faltando." }, { status: 400 });
    }

    if (name.length > 100 || email.length > 100 || (subject && subject.length > 150) || message.length > 3000) {
      return NextResponse.json({ error: "Os dados excedem o limite de caracteres permitido." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "O endereço de e-mail fornecido é inválido." }, { status: 400 });
    }

    // Sanitização de entradas (XSS e Injeções HTML no cliente de e-mail)
    const safeName = escapeHTML(name);
    const safeEmail = escapeHTML(email);
    const safeTel = escapeHTML(tel);
    const safeSubject = escapeHTML(subject);
    const safeMessage = escapeHTML(message).replace(/\n/g, '<br>');

    const output = `
      <p>Você tem um novo pedido de contato</p>
      <h3>Detalhes do Contato</h3>
      <ul>
          <li>Nome: ${safeName}</li>
          <li>E-mail: ${safeEmail}</li>
          <li>Telefone: ${safeTel}</li>
          <li>Assunto: ${safeSubject}</li>
      </ul>
      <h3>Mensagem</h3>
      <p>${safeMessage}</p>
    `;
    
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Number(process.env.SMTP_PORT) === 465, // true para 465, false para outras portas
        auth: {
            user: process.env.EMAIL_USUARIO,
            pass: process.env.SENHA_EMAIL
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: process.env.EMAIL_FROM, // Seu no-reply@harmonysoftware.com.br
        to: process.env.EMAIL_TO,     // Destinos separados por vírgula
        replyTo: email,               // Original email (não escapado para que o 'Responder' funcione corretamente)
        subject: `Portfolio - Contato de ${safeName}`,
        html: output
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "E-mail enviado com sucesso!" }, { status: 200 });

  } catch (error) {
    console.error("Erro ao enviar o e-mail: ", error);
    return NextResponse.json({ error: `Erro SMTP: ${error.message}` }, { status: 500 });
  }
}
