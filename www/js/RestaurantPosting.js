
if (sessionStorage.getItem("role") !== "Restaurant") {
    alert("Você não é um restaurante, portanto, não pode fazer uma postagem.");
    window.location.href = "index.html";
} else {
   var zipcodeFormate = /^\d{5}-\d{3}$/;
    var saveData = document.getElementById("saveData");

    if (saveData) {
        saveData.addEventListener("click", function () {
            var output = "";
            
            const quantidade = document.getElementById("quantity").value;
            const tipoDeComida = document.getElementById("type").value;
            const horaDeCozimento = document.getElementById("cooked_time").value;
            const horaDeExpiracao = document.getElementById("expiry_time").value;
            const higiene = document.getElementById("hygiene").value;

    
            var endereco = document.getElementById("address").value;
            var cidade = document.getElementById("city").value;
            var estado = document.getElementById("State").value;
            var codigoPostal = document.getElementById("zipcode").value;
            var marcar = document.getElementById("mark").value;

        
            if (
                quantidade === "" ||
                tipoDeComida === "" ||
                horaDeCozimento === "" ||
                horaDeExpiracao === "" ||
                higiene === "" ||
                endereco === "" ||
                cidade === "" ||
                estado === "" ||
                codigoPostal === ""
            ) {
                alert("Por favor, preencha o formulário!");
            } else {
                if (!zipcodeFormate.test(codigoPostal)) {
                    alert("Por favor, insira um CEP válido!");
                } else {
                    if (marcar === "") {
                        output = "padrao";
                    } else {
                        output = marcar;
                    }
                    firebase
                        .database()
                        .ref("Restaurant")
                        .orderByChild("mobilenumber")
                        .equalTo(sessionStorage.getItem("mnumber"))
                        .once("value")
                        .then(function (snap) {
                            snap.forEach(function (childSnapshot) {
                                firebase
                                    .database()
                                    .ref("Restaurant/" + childSnapshot.key + "/Donation")
                                    .push({
                                        StatusONG: "Pendente",
                                        Quantidade: quantidade,
                                        TipoDeComida: tipoDeComida,
                                        HoraDeCozimento: horaDeCozimento,
                                        HoraDeExpiracao: horaDeExpiracao,
                                        NivelDeHigiene: higiene,
                                        Endereco: endereco,
                                        Cidade: cidade,
                                        Estado: estado,
                                        CodigoPostal: codigoPostal,
                                        Marcar: output,
                                        NomeDoRestaurante: sessionStorage.getItem("username"),
                                    })
                                    .then(function () {
                                        alert("Parabéns! Sua doação de comida foi realizada com sucesso!");
                                        window.location.href = "index.html";
                                    });
                            });
                        });
                }
            }
        });
    }
}
