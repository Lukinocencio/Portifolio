import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, tel, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Campos obrigatórios faltando." }, { status: 400 });
    }

    const emailFrom = email;
    const output = `
      <p>Você tem um novo pedido de contato</p>
      <h3>Detalhes do Contato</h3>
      <ul>
          <li>Nome: ${name}</li>
          <li>E-mail: ${email}</li>
          <li>Telefone: ${tel}</li>
          <li>Assunto: ${subject}</li>
      </ul>
      <h3>Mensagem</h3>
      <p>${message}</p>
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
        replyTo: email,               // Se você clicar em "Responder", vai pro e-mail do cliente
        subject: `Portifólio - Contato de ${name}`,
        html: output
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "E-mail enviado com sucesso!" }, { status: 200 });

  } catch (error) {
    console.error("Erro ao enviar o e-mail: ", error);
    return NextResponse.json({ error: "Erro interno ao enviar e-mail." }, { status: 500 });
  }
}
