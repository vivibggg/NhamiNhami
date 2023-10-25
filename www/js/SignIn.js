if (!sessionStorage.getItem("username")) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // Capturando o evento de clique no botão de login com id "signin"
    signin.onclick = function () {
        var email = document.getElementById("email").value;
        var pwd = document.getElementById("pwd").value;
        var role = document.getElementById("role").value;

        // Verificando se tanto o papel quanto o email foram selecionados
        if (role == "" || email == "") {
            alert("Por favor, selecione quem você é e insira o email.");
        } else {
            // Verificando se o email está no formato correto
            if (!email.match(mailformat)) {
                alert("Por favor, insira um endereço de email válido!");
            } else if (pwd == "") {
                alert("Por favor, insira a senha!");
            } else {
                // Consultando o banco de dados Firebase
                firebase.database().ref(role).orderByChild("email").equalTo(email).once("value", snapshot => {
                    if (snapshot.exists()) {
                        // Se o email existe, verificando a senha
                        firebase.database().ref(role).orderByChild("password").equalTo(pwd).once("value", snap => {
                            if (snap.exists()) {
                                // Se a senha corresponder, login bem-sucedido
                                snapshot.forEach(function (data) {
                                    alert("Parabéns! " + data.val().username + " logado com sucesso!");
                                    sessionStorage.setItem("username", data.val().username);
                                    sessionStorage.setItem("mnumber", data.val().mobilenumber);
                                    sessionStorage.setItem("role", role);
                                    window.location.href = "index.html";
                                });
                            } else {
                                alert("Senha incorreta!");
                            }
                        });
                    } else {
                        alert("Email não encontrado!");
                    }
                });
            }
        }
    }
}
// else {
//     // Usuário já logado, redirecionar para a página inicial
// }
