const express    = require('express');
const bodyParser = require('body-parser');
const exphbs     = require('express-handlebars');
const path       = require('path');
const nodemailer = require('nodemailer');

// Inicializa o express
const app = express();

// Configura o mecanismo de visualização hbs e remove o modelo de layout principal do handlebars
app.engine('handlebars', exphbs.engine({
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: false
}));

app.set('view engine', 'handlebars');

// Define a pasta public como estática para procurar os arquivos
app.use('/public', express.static(path.join(__dirname, 'public')));

// Middleware para analisar o corpo das requisições em formato JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rota para exibir o arquivo index.html
app.get('/', (req, res) => {
    // Use o método render() para renderizar a view index.handlebars
    res.render('index');
});

app.post('/send', (req, res) => {
    let emailFrom = req.body.email;
    const output = `
    <p>Você tem um novo pedido de contato</p>
    <h3>Detalhes do Contato</h3>
    <ul>
        <li>Nome: ${req.body.name}</li>
        <li>E-mail: ${req.body.email}</li>
        <li>Telefone: ${req.body.tel}</li>
        <li>Assunto: ${req.body.subject}</li>
    </ul>
    <h3>Mensagem</h3>
    <p>${req.body.message}</p>
    `;
    
    // Verifica o domínio do e-mail inserido pelo usuário
    const dominio = emailFrom.split('@')[1];

    // Cria transporters para diferentes domínios
    let transporter;
    if (dominio === 'gmail.com') {
        transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'email',
                pass: 'senha'
            }
        });
    } else if (dominio === 'outlook.com' || 'hotmail.com') {
        transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false, 
            auth: {
                user: 'email',
                pass: 'senha'
            },
            tls: {
                rejectUnauthorized: false
            }
        });
    } else {
        // Se não for gmail || outlook/hotmail ele mostra o erro
        return res.status(400).send("Domínio de e-mail não permitido!");
    }

    let mailOptions = {
        from: emailFrom, 
        to: '<email@dominio.com>, <email2@dominio.com>...',
        subject: 'Portifólio',
        html: output
    };

    transporter.sendMail(mailOptions)
    .then(()=> {
        console.log('Email enviado');
        res.status(200).send("E-mail enviado com sucesso!");
    })
    .catch((error) => {
        console.log(`Erro ao enviar o e-mail: ${error}`);
        res.status(500).send("Erro ao enviar e-mail!");
    });
});


// Inicia o servidor na porta 5000
app.listen(5000, () => console.log('Servidor Iniciado'));