Save.onclick = function () {
    const nome = document.getElementById("Dname").value;
    const Dnumero = document.getElementById("Dnumber").value;
    var id = location.search.split('token=')[1];
    var n = location.search.split('n=')[2];
    var formatoNumero = /^(\+55)?\s?(?:\(?[1-9]{2}\)?\s?)?(?:9\d{4}[-\s]?\d{4}|\d{4}[-\s]?\d{4})$/;

    if (nome == "" && Dnumero == "") {
        alert("Por favor, preencha o formulário!");
    } else if (!Dnumero.match(formatoNumero)) {
        alert("Por favor, insira um número de celular válido no formato brasileiro!");
    } else {
        firebase.database().ref("Restaurant/").orderByChild("mobilenumber").equalTo(n).once("value", function (snapshots) {
            snapshots.forEach(function (childSnapshot) {
                firebase.database().ref("Restaurant/" + childSnapshot.key + "/Donation/" + id).update({
                    NGOStatus: "Aceito",
                    DeliveryPname: nome,
                    DeliveryContactN: Dnumero
                }).then(() => {
                    alert("Alimento do doador aceito com sucesso!");
                    window.location.href = "feed.html";
                });
            });
        });
    }
}
