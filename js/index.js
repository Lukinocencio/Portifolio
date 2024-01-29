// Configuração da Navbar
const navbar = document.querySelector('.navbar');
const mobileVavbar = document.querySelector('.navbar__mobile');
const button = document.querySelector('.burger');
button.addEventListener('click', function() {
    mobileVavbar.classList.toggle('active');
});

// ativa e desativa o Shadow na rolagem da página
window.addEventListener('scroll', function() {
    if(this.window.scrollY > 0) return navbar.classList.add('active');
    return navbar.classList.remove('active');
});


// Configuração de copiar email
function copiarEmail() {
    var emailSpan = document.getElementById("footer-email");
    var emailText = emailSpan.textContent || emailSpan.innerText;
    var mensagemSpan = document.getElementById("copiado-mensagem");

    navigator.clipboard.writeText(emailText)
    .then(() => {
        console.log("E-mail copiado: " + emailText);
        mensagemSpan.textContent = "E-mail copiado com sucesso!";
    })
    .catch(err => {
        console.error("Erro ao copiar o e-mail: ", err);
    });
}


// Configuração do Modal

document.getElementById('openModalBtn').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'block';
});

document.getElementsByClassName('close')[0].addEventListener('click', function() {
    document.getElementById('modal').style.display = 'none';
});

document.getElementById('emailForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Aqui você pode adicionar o código para enviar o e-mail
    // Neste exemplo, você pode apenas exibir os dados do formulário
    let formData = new FormData(event.target);
    formData.forEach((value, key) => {
        console.log(key, ':', value);
    });

    // Fechar o modal após enviar
    document.getElementById('modal').style.display = 'none';
});
