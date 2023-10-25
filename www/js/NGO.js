document.getElementById("ngoname").innerHTML = sessionStorage.getItem("username") + " ONG";
let contador = 0;
let prato = 0;

firebase.database().ref("Restaurant").once("value", function (snapshots) {
    snapshots.forEach(function (chilsSnapshot) {
        firebase.database().ref("Restaurant/" + chilsSnapshot.key + "/Donation").once('value', function (snap) {
            contador = snap.numChildren();
            var conteudo = '';
            var nivelDeHigieneEdit = "";
            var statusNGO = "";
            let numDoacoesAceitas = 0;
            let numDoacoesFalhadas = 0;

            snap.forEach(function (childCheck) {
                var val = childCheck.val();
                if (childCheck.val().NGOStatus == "Accept") {
                    numDoacoesAceitas++;
                    prato += parseInt(childCheck.val().Quantity);
                    $({ Counter: 0 }).animate({
                        Counter: prato
                    }, {
                        duration: 4000,
                        easing: 'swing',
                        step: function () {
                            $('#NoOfFeed').text(Math.ceil(this.Counter));
                            $('#NoOfFeed').css('color', 'blue');
                        }
                    });
                    $({ Counter: 0 }).animate({
                        Counter: numDoacoesAceitas
                    }, {
                        duration: 4000,
                        easing: 'swing',
                        step: function () {
                            $('#numOfDdone').text(Math.ceil(this.Counter));
                            $('#numOfDdone').css('color', 'green');
                        }
                    });
                } else if (childCheck.val().NGOStatus == "Failed") {
                    numDoacoesFalhadas++;
                    $({ Counter: 0 }).animate({
                        Counter: numDoacoesFalhadas
                    }, {
                        duration: 4000,
                        easing: 'swing',
                        step: function () {
                            $('#numOfFailed').text(Math.ceil(this.Counter));
                            if (Math.ceil(this.Counter) < 10) {
                                $('#numOfFailed').css('color', 'green');
                            } else if (Math.ceil(this.Counter) > 10) {
                                $('#numOfFailed').css('color', 'red');
                                $('#numOfFailed').css('text-decoration', 'line-through');
                            }
                        }
                    });
                }

                /* Listagem de informações das doações */
                if (val.hygieneLevel == 1) {
                    nivelDeHigieneEdit = '⭐';
                } else if (val.hygieneLevel == 2) {
                    nivelDeHigieneEdit = '⭐⭐';
                } else if (val.hygieneLevel == 3) {
                    nivelDeHigieneEdit = '⭐⭐⭐';
                } else if (val.hygieneLevel == 4) {
                    nivelDeHigieneEdit = '⭐⭐⭐⭐';
                } else {
                    nivelDeHigieneEdit = '⭐⭐⭐⭐⭐';
                }

                if (val.NGOStatus == "Accept") {
                    statusNGO = '<td class="btn btn-success fw-bold">Aceito &#10003;</td>';
                } else if (val.NGOStatus == "Pending") {
                    statusNGO = '<td class="btn btn-warning fw-bold">Pendente <b>!</b></td>';
                } else {
                    statusNGO = '<td class="btn btn-danger fw-bold">Falhou <b>X</b></td>';
                }

                conteudo += '<h4>' + chilsSnapshot.val().username + '</h4><div class="row" >';
                conteudo += '<div class="itm col-lg-2"><img src="https://picsum.photos/200" class="img-fluid"></div>';
                conteudo += '<div class="itm col-lg-2 d-flex flex-column justify-content-around">';
                conteudo += '<div>';
                conteudo += '<table>';
                conteudo += '<tr>';
                conteudo += '<td class="fw-bold">Quantidade</td> </tr> <tr> <td>' + val.Quantity + ' Pratos</td> </tr>';
                conteudo += '</table>';
                conteudo += '</div>';
                conteudo += '<div>';
                conteudo += '<table> <tr> <td class="fw-bold">Tipo de Comida</td> </tr> <tr> <td>' + val.tyfood + '</td> </tr> </table>';
                conteudo += '</div> </div>';
                conteudo += '<div class="itm col-lg-2 d-flex flex-column justify-content-around">';
                conteudo += '<div>';
                conteudo += '<table>';
                conteudo += '<tr> <td class="fw-bold">Nível de Higiene</td> </tr>';
                conteudo += '<tr> <td>' + nivelDeHigieneEdit + '</td> </tr>';
                conteudo += '</table>';
                conteudo += '</div>';
                conteudo += '<div>';
                conteudo += '<table>';
                conteudo += '<tr> <td class="fw-bold">Tempo de Validade</td> </tr> <tr> <td>' + val.expiryTime + ' horas</td> </tr>';
                conteudo += '</table>';
                conteudo += '</div>';
                conteudo += '</div>';
                conteudo += '<div class="itm col-lg-2 d-flex flex-column justify-content-around"> <div> <table> <tr> <td class="fw-bold">Hora de Cozimento</td> </tr> <tr> <td>' + val.cookTime + ' pm</td> </tr> </table> </div> </div> <div class="itm col-lg-2 d-flex flex-column justify-content-around"> <div> <table> <tr> <td class="fw-bold">Observações </td> </tr><tr> <td>' + val.mark + ', </td> </tr> </table> </div> <div> <table><tr> <td class="fw-bold">Número do Restaurante</td> </tr> <tr> <td class="fw-bold">+91 ' + chilsSnapshot.val().mobilenumber + '</td> </tr> </table> </div> </div> <div class="itm col-lg-2 d-flex flex-column justify-content-around status-itm"> <div> <table class="w-100"> <tr> <td class="fw-bold">Status</td> </tr> <tr> ' + statusNGO + ' </tr> </table> </div> </div>';
                conteudo += '<hr class="mt-4">';
                conteudo += '</div>';
            });

            $('#ex-table').append(conteudo);
        });
    });
});
