let marks = "";
firebase.database().ref("ONG").orderByChild("mobilenumber").equalTo(sessionStorage.getItem("mnumber")).once('value', function(snapshot){
    snapshot.forEach(function(childSnapshot){
        document.getElementById("name").value = childSnapshot.val().nome;
        document.getElementById("regiao").value = childSnapshot.val().regiao;
        document.getElementById("numero").value = childSnapshot.val().numeroDeTelefone;
        document.getElementById("email").value = childSnapshot.val().email;
        document.getElementById("endereco").value = childSnapshot.val().endereco;
        document.getElementById("cidade").value = childSnapshot.val().cidade;
        document.getElementById("estado").value = childSnapshot.val().estado;
        document.getElementById("codigoPostal").value = childSnapshot.val().codigoPostal;
        if(childSnapshot.val().marcar == "predefinido"){
            marks = "Não fornecido!";
        } else {
            marks = childSnapshot.val().marcar;
        }
        document.getElementById("marca").value = marks;
        document.getElementById("senha").value = childSnapshot.val().senha;
    });
});

saveBtn.onclick = function(){
    let markss = "";
    if(document.getElementById("marca").value == "Não fornecido!"){
        markss = "predefinido";
    } else {
        markss = document.getElementById("marca").value;
    }
    firebase.database().ref("ONG").orderByChild("mobilenumber").equalTo(sessionStorage.getItem("mnumber")).once('value', function(snapShot){
        snapShot.forEach(function(childSnapshot){
            firebase.database().ref("ONG/"+childSnapshot.key).update({
                nome: document.getElementById("name").value,
                regiao: document.getElementById("regiao").value,
                numeroDeTelefone: document.getElementById("numero").value,
                email: document.getElementById("email").value,
                endereco: document.getElementById("endereco").value,
                cidade: document.getElementById("cidade").value,
                estado: document.getElementById("estado").value,
                codigoPostal: document.getElementById("codigoPostal").value,
                marcar: markss,
                senha: document.getElementById("senha").value
            }).then(()=>{
                alert(document.getElementById("name").value + " Atualizou com sucesso o seu perfil!");
                sessionStorage.setItem("nome", document.getElementById("name").value);
                sessionStorage.setItem("numeroDeTelefone", document.getElementById("numero").value);
                window.location.href = "ONG.html";
            });
        });
    });
}
