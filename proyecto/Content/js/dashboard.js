function CargarFacturacion() {
    $("#panel_titulo").text("Facturación");
    $("#panel").load("../../Views/Account/Facturacion.html", function () {
        var guardado = JSON.parse(localStorage.getItem(facturacion_item));
        var correo = localStorage.getItem(persona_online_item);

        $.each(guardado, function (key, value) {
            if (correo == value.usuario) {
                $("#factuNombre").val(value.nombre);
                $("#factuDireccion").val(value.direccion);
                $("#factuTelefono").val(value.telefono);
                return;
            }
        });
    });

}

function CargarDireccion() {
    $("#panel_titulo").text("Direccion");
    $("#panel").load("../../Views/Account/Direccion.html", function () {

        var guardado = JSON.parse(localStorage.getItem(direccion_item));
        var correo = localStorage.getItem(persona_online_item);

        $.each(guardado, function (key, value) {
            if (correo == value.usuario) {
                $("#infoNombre").val(value.nombre);
                $("#infoApellidos").val(value.apellidos);
                $("#infoDireccion").val(value.direccion);
                $("#infoTelefono").val(value.telefono);
                $("#infoCiudad").val(value.ciudad);
                $("#infoCasa").val(value.casa);
                return;
            }
        });
    });

}

function CargarCompra() {
    $("#panel_titulo").text("Compras");
    $("#panel").load("../../Views/Account/Compras.html", function () {

        var guardado = JSON.parse(localStorage.getItem(compra_item));
        var correo = localStorage.getItem(persona_online_item);

        $.each(guardado, function (key, value) {
            if (correo == value.usuario) {
                $('#tabla_compras > tbody:last-child').append(
                    '<tr>' +
                    '<td>' + value.titulo + '</td>' +
                    '<td>' + value.precio + '</td>' +
                    '<td><input type="text" class="form-control" value="' + value.cantidad + '" disabled></td>' +
                    '<td>' + value.fecha + '</td>' +
                    '</tr>');
            }

        });
    });

}

function GuardarFacturacion() {
    var correo = localStorage.getItem(persona_online_item);

    if (correo == null || correo == "0") {
        alert("No deberias hacer esto");
        return;
    }

    var info = [{
        usuario: correo,
        nombre: $("#factuNombre").val(),
        direccion: $("#factuDireccion").val(),
        telefono: $("#factuTelefono").val()
    }];

    /*
    var guardado = JSON.parse(localStorage.getItem(facturacion_item));
    
    if (info == guardado) {
        alert("Sin cambios");
        return;
    }
    */

    localStorage.setItem(facturacion_item, JSON.stringify(info));
    alert("Guardado");
}

function GuardarDireccion() {
    var correo = localStorage.getItem(persona_online_item);

    if (correo == null || correo == "0") {
        alert("No deberias hacer esto");
        return;
    }

    var info = [{
        usuario: correo,
        nombre: $("#infoNombre").val(),
        apellidos: $("#infoApellidos").val(),
        direccion: $("#infoDireccion").val(),
        telefono: $("#infoTelefono").val(),
        ciudad: $("#infoCiudad").val(),
        casa: $("#infoCasa").val()
    }];

    localStorage.setItem(direccion_item, JSON.stringify(info));
    alert("Guardado");
}