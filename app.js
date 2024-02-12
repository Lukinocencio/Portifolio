const express    = require('express');
const bodyParser = require('body-parser');
const exphbs     = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

// Inicializa o express
const app = express();

// Configura o mecanismo de visualização hbs
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Define a pasta public como estática para procurar os arquivos
app.use('/public', express.static(path.join(__dirname, 'public')));

// Middleware para analisar o corpo das requisições em formato JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// Rota para exibir o arquivo index.html
app.get('/', (req, res) => {
    // Use o método sendFile() para enviar o arquivo index.html
    res.render(path.join(__dirname, 'public', 'index.html'));
});

// Inicia o servidor na porta 5000
app.listen(5000, () => console.log('Servidor Iniciado'));