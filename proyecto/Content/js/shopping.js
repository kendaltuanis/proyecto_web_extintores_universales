function AgregarArticulo(element, cantidad = 1, precio = 0) {

    if (precio == 0) {
        var precio = $(element).closest(".body").find("label").text().split(" ")[1];
    }
    var titulo = $(element).closest(".body").find("h3").text();

    var articulo = [{
        titulo: titulo,
        precio: precio,
        cantidad: cantidad
    }];

    var guardado = JSON.parse(localStorage.getItem(articulos_item));
    var isEntro = 0;

    if (guardado == null) {
        localStorage.setItem(articulos_item, JSON.stringify(articulo));
    } else {

        $.each(guardado, function (key, value) {
            if (titulo == value.titulo) {
                value.cantidad = (value.cantidad) + cantidad;
                localStorage.setItem(articulos_item, JSON.stringify(guardado));
                isEntro = 1;
                return;
            }
        });
        if (isEntro == 0) {
            localStorage.setItem(articulos_item, JSON.stringify(guardado.concat(articulo)));
        }
    }

}

function DetalleArticulo(element) {

    var cantidad = 1;
    var titulo = $(element).closest(".body").find("h4").text();
    var precio = $(element).closest(".body").find("label").text().split(" ")[1];
    var tamano = $(element).closest(".body").find("h4").text().split(" ")[2];

    window.location.href = "http://localhost/proyecto/Views/Products/Shop-Product.html?titulo=" + titulo + "&precio=" + precio + "&tamano=" + tamano;

}

function CargarArticulos() {

    var guardado = JSON.parse(localStorage.getItem(articulos_item));
    var precioTotal = 0;

    $.each(guardado, function (key, value) {
        var precio = parseInt(value.precio.substring(1).split(",")[0].replace('.', '')) * value.cantidad;
        precioTotal += precio;
        $('#tabla_art > tbody:last-child').append(
            '<tr>' +
            '<td>' + value.titulo + '</td>' +
            '<td>' + value.precio + '</td>' +
            '<td><input type="text" class="form-control" value="' + value.cantidad + '" disabled></td>' +
            '<td>' + precio + '</td>' +
            '<td> <a onclick="EliminarArticulo(this);" class="btn btn-group btn-default center-block"><i class="icon-left-open-big"></i>Borrar</a> </td>' +
            '</tr>');
        });

    if (precioTotal != 0) {
        $('#tabla_art > tbody:last-child').append(
            '<tr>' +
            '<td></td>' +
            '<td></td>' +
            '<td class="text-center" style="font-size:20px;">Total</td>' +
            '<td>' + precioTotal + '</td>' +
            '</tr>');

    }
}

function EliminarArticulo(element) {

    var filas = jQuery(element).closest('tr');
    var titulo = filas.find('td')[0];

    var guardado = JSON.parse(localStorage.getItem(articulos_item));
    guardado.splice(guardado.indexOf(titulo), 1);

    localStorage.setItem(articulos_item, JSON.stringify(guardado));
    location.reload(true);

}

function IrMetodoPago() {

    var online = (localStorage.getItem(persona_online_item) == null || localStorage.getItem(persona_online_item) == "0") ? sessionStorage.getItem(persona_online_item) : localStorage.getItem(persona_online_item);

    if (online == 0 || online == null) {
        alert(error_compra);
        window.location.href = "http://localhost/proyecto/Views/Products/Checkout.html";
        return;
    }

    GuardarDireccion();

    var url = "http://localhost/proyecto/Views/Products/Checkout_Payment.html";
    if (url != window.location.href) {
        window.location.href = "http://localhost/proyecto/Views/Products/Checkout_Payment.html";
    }
}

function FinalizarCompra() {


    var guardado = JSON.parse(localStorage.getItem(articulos_item));
    var correo = (localStorage.getItem(persona_online_item) == null || localStorage.getItem(persona_online_item) == "0") ? sessionStorage.getItem(persona_online_item) : localStorage.getItem(persona_online_item);
    var compra=null;

    $.each(guardado, function (key, value) {
     
        var tempArt = [{
            usuario: correo,
            titulo: value.titulo,
            cantidad: value.cantidad,
            precio: value.precio,
            fecha:  $.datepicker.formatDate('dd/mm/yy', new Date())
        }];

        if(compra==null){
            compra=tempArt;
        }else{
            concat(tempArt);
        }

    });
    localStorage.setItem(compra_item, JSON.stringify(compra));
    alert("Compra realizar con éxito");
    window.location.href = "http://localhost/proyecto/Views/Products/List-Products.html";


}

function CargarDireccionCheckout() {

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
}