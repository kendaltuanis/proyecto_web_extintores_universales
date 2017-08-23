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
    var titulo = $(element).closest(".body").find("h3").text();
    var precio = $(element).closest(".body").find("label").text().split(" ")[1];
    var tamano = $(element).closest(".body").find("h3").text().split(" ")[2];

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
            '</tr>');
    });
    $('#tabla_art > tbody:last-child').append(
        '<tr>' +
        '<td></td>' +
        '<td></td>' +
        '<td class="text-center" style="font-size:20px;">Total</td>' +
        '<td>' + precioTotal + '</td>' +
        '</tr>');

}

function FinalizarCompra() {
    var online = (localStorage.getItem(persona_online_item) == null || localStorage.getItem(persona_online_item) == "0") ? sessionStorage.getItem(persona_online_item) : localStorage.getItem(persona_online_item);

    if (online == 0 || online == null) {
        alert(error_compra);
        window.location.href = "http://localhost/proyecto/Views/Products/Checkout.html";
        return;
    }
    window.location.href = "http://localhost/proyecto/Views/Products/Checkout_Payment.html";
}