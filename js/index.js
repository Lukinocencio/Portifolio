const navbar = document.querySelector('.navbar');
const mobileVavbar = document.querySelector('.navbar__mobile');
const button = document.querySelector('.burger');

// Altera o status do menu da navbar
button.addEventListener('click', function() {
    mobileVavbar.classList.toggle('active');
});

// Ele adiciona um box-shadow ao rolar a página para baixo e remove ao subir para o topo novamente
window.addEventListener('scroll', function() {
    if(this.window.scrollY > 0) return navbar.classList.add('active');
    return navbar.classList.remove('active');
});

// Função para copiar o e-mail ao clicar nele
function copiarEmail() {
    var emailSpan = document.getElementById("footer-email");
    var emailText = emailSpan.textContent || emailSpan.innerText;

    

    navigator.clipboard.writeText(emailText)
        .then(() => {
            console.log("E-mail copiado: " + emailText);
        })
        .catch(err => {
            console.error('Erro ao copiar o e-mail: ', err);
        });
}