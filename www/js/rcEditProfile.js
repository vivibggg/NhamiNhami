let marks = "";


firebase.database().ref("Restaurante").orderByChild("mobilenumber").equalTo(sessionStorage.getItem("mnumber")).once('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
        document.getElementById("name").value = childSnapshot.val().nome;
        document.getElementById("região").value = childSnapshot.val().região;
        document.getElementById("número").value = childSnapshot.val().númerodetelemóvel;
        document.getElementById("email").value = childSnapshot.val().email;
        document.getElementById("endereço").value = childSnapshot.val().endereço;
        document.getElementById("cidade").value = childSnapshot.val().cidade;
        document.getElementById("estado").value = childSnapshot.val().estado;
        document.getElementById("código postal").value = childSnapshot.val().codigoPostal; // 
        if (childSnapshot.val().marcar == "predefinido") {
            marks = "Não fornecido!";
        } else {
            marks = childSnapshot.val().marcar;
        }
        document.getElementById("marca").value = marks;
        document.getElementById("senha").value = childSnapshot.val().senha;
    });
});

saveBtn.onclick = function () {
    let marca = ""; 
    if (document.getElementById("marca").value == "Não fornecido!") {
        marca = "predefinido";
    } else {
        marca = document.getElementById("marca").value;
    }
    firebase.database().ref("Restaurante").orderByChild("mobilenumber").equalTo(sessionStorage.getItem("mnumber")).once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            firebase.database().ref("Restaurante/" + childSnapshot.key).update({
                nome: document.getElementById("name").value,
                região: document.getElementById("região").value,
                númerodetelemóvel: document.getElementById("número").value,
                email: document.getElementById("email").value,
                endereço: document.getElementById("endereço").value,
                cidade: document.getElementById("cidade").value,
                estado: document.getElementById("estado").value,
                codigoPostal: document.getElementById("código postal").value, 
                marcar: marca, // 
                senha: document.getElementById("senha").value
            }).then(() => {
                alert(document.getElementById("name").value + " Atualizou com sucesso o seu perfil!");
                sessionStorage.setItem("username", document.getElementById("name").value);
                sessionStorage.setItem("número de telemóvel", document.getElementById("número").value);
                window.location.href = "RestaurantCaterer.html";
            });
        });
    });
}
