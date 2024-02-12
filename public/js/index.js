// Configuração da Navbar
const navbar = document.querySelector('.navbar');
const mobileVavbar = document.querySelector('.navbar__mobile');
const button = document.querySelector('.burger');
button.addEventListener('click', function() {
    mobileVavbar.classList.toggle('active');
});

// Ativa e desativa o Shadow na rolagem da página
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

    document.getElementById('modal').style.display = 'none';
});

// Máscara para o campo telefone do modal
const handlePhone = (event) => {
    let input = event.target
    input.value = mascaraTelefone(input.value)
  }

  const mascaraTelefone = (value) => {
    if (!value) return ""
    value = value.replace(/\D/g,'')
    value = value.replace(/(\d{2})(\d)/,"($1) $2")
    value = value.replace(/(\d)(\d{4})$/,"$1-$2")
    return value
  }

// function enviaEmail() {
//     Email.send({
//         Host : "smtp.elasticemail.com",
//         Username : "luki.inocencio@outlook.com",
//         Password : "932485E3848B3EE2AFCE1DF3431F66387E28",
//         To : 'luki.inocencio@outlook.com',
//         From : document.getElementById("email").value,
//         Subject : document.getElementById("subject").value,
//         Body : "Mensagem de: " + document.getElementById("name").value 
//             + "<br> Telefone para contato: " + document.getElementById("tel").value 
//             + "<br> Mensagem: "  + document.getElementById("message").value
//     }).then(
//     message => alert(message)
//     );
// }