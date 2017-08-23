const saludo = 'Bienvenido(a) ';
const error_claves = 'Las contraseñas no coinciden';
const sesion_incorrecta = 'Correo o contraseña no son correctos';
const error_longitud_clave = 'La contraseña deberá ser mayor o igual a 6 carácteres';
const error_longitud_campos = 'Alguno(s) de los campos están vacios o son muy cortos';
const error_compra = 'Primero debe de iniciar sesión antes de finalizar la compra';
const nombre_item = 'nombre';
const persona_online_item = 'persona_online';
const articulos_item = 'articulos';

function VerificarEntradas() {

    if ($("#nombre").val().length <= 3 || $("#apellidos").val().length <= 3 || $("#empresa").val().length <= 3 || $("#correo").val().length <= 3) {
        alert(error_longitud_campos);
        return false;
    }

    if ($("#clave").val() != $("#re-clave").val()) {
        alert(error_claves);
        return false;
    }
    if ($("#clave").val().length < 6) {
        alert(error_longitud_clave);
        return false;
    }
    return true;
}

//Registrar persona
function Registrar() {
    if (!VerificarEntradas()) {
        return;
    }
    var persona = [{
        nombre: $("#nombre").val(),
        apellidos: $("#apellidos").val(),
        empresa: $("#empresa").val(),
        correo: $("#correo").val(),
        clave: $("#clave").val(),
    }];

    var guardado = JSON.parse(localStorage.getItem("persona"));

    if (guardado == null) {
        localStorage.setItem("persona", JSON.stringify(persona));
    } else {
        localStorage.setItem("persona", JSON.stringify(guardado.concat(persona)));
    }

    localStorage.setItem("nombre", $("#nombre").val());
    localStorage.setItem("persona_online", $("#correo").val());
    VerificarSesion();
}

function IniciarSesion() {

    var personas = JSON.parse(localStorage.getItem("persona"));

    var correo = $("#up_correo").val();
    var clave = $("#up_clave").val();
    var isEntro = 0;

    $.each(personas, function (key, value) {
        console.log(value.correo + " clave: " + value.clave);
        if (correo == value.correo && clave == value.clave) {

            if ($('#recuerdame').is(":checked")) {
                localStorage.setItem(nombre_item, value.nombre);
                localStorage.setItem(persona_online_item, correo);
            } else {
                sessionStorage.setItem(nombre_item, value.nombre);
                sessionStorage.setItem(persona_online_item, correo);
            }

            VerificarSesion();
            isEntro = 1;
        }
    });
    if (isEntro == 0) {
        alert(sesion_incorrecta);
    }
}

function VerificarSesion() {

    var online = (localStorage.getItem(persona_online_item) == null || localStorage.getItem(persona_online_item) == "0") ? sessionStorage.getItem(persona_online_item) : localStorage.getItem(persona_online_item);

    if (online == 0 || online == null) {
        return;
    }

    var nombre = (localStorage.getItem(nombre_item) == null || localStorage.getItem(nombre_item) == "0") ? sessionStorage.getItem(nombre_item) : localStorage.getItem(nombre_item);

    $('#lado_derecho').html($('#reemplazo').html());
    $('#name').text(saludo + nombre);

}

function CerrarSesion() {

    localStorage.setItem(persona_online_item, "0");
    localStorage.setItem(nombre_item, "0");
    sessionStorage.setItem(persona_online_item, "0");
    sessionStorage.setItem(nombre_item, "0");
    window.location.href = "http://localhost/proyecto/Views/Home/Index.html";
}

function CargarArticuloDescripcion() {
    $("#producto_compra").text(getParameterByName("titulo"));
    $("#precio_compra").text(getParameterByName("precio"));
    $('#peso_extintor').append(new Option(getParameterByName("tamano")));
}

function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}