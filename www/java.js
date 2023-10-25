document.getElementById("verificar-permissao-localizacao").addEventListener("click", function() {
 
    cordova.plugins.settings.open("location", function() {
        console.log("Configurações de permissão de localização abertas com sucesso");
    }, function() {
        console.error("Erro ao abrir as configurações de permissão de localização");
    });
});

document.getElementById("verificar-permissao-notificacoes").addEventListener("click", function() {
    
    cordova.plugins.settings.open("notification_id", function() {
        console.log("Configurações de permissão de notificações abertas com sucesso");
    }, function() {
        console.error("Erro ao abrir as configurações de permissão de notificações");
    });
});
