const nodemailer = require('nodemailer');

// Enviar e-mail para domínio da Google
const envioGmail = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
        user: '@gmail.com',
        pass: 'inserir senha de app do google',
    }
});

envioGmail.sendMail({
    from: '<>',
    to: '',
    subject: 'Enviando email de teste com Nodemailer',
    html: '<h1>Teste do HTML</h1>',
    text: 'Teste caso o HTML NÃO renderize',
})
.then(() => console.log('E-mail enviado!'))
.catch((erro) => console.error("Erro ao enviar e-mail! ",erro))

// Enviar e-mail para domínio da Microsoft
const envioMicrosoft = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false, 
    auth: {
        user: '@outlook.com',
        pass: '',
    }
});

envioMicrosoft.sendMail({
    from: '<>',
    to: '',
    subject: 'Segundo teste',
    html: '<h1>Teste do HTML</h1>',
    text: 'Teste caso o HTML NÃO renderize',
})
.then(() => console.log('E-mail enviado!'))
.catch((erro) => console.error("Erro ao enviar e-mail! ",erro))