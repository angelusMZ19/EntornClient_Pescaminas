function iniciarPartida() {
    let dimension = prompt("Ingrese la dimensión de la tabla");
    creaTabla(dimension);
}

function creaTabla(dimension) {
    let tabla = "";

    if (dimension < 10) {
        dimension = 10;
    }
    if (dimension > 30) {
        dimension = 30;
    }

    tabla += '<table id="tabla">';
    for (let i = 1; i <= dimension; i++) {
        tabla += '<tr id="filas">';
        for (let j = 1; j <= dimension; j++) {
            tabla += '<td id="celdas" data-mina="false" ><img src="img/fons20px.jpg" id="imagen"/></td>';
        }
        tabla += '</tr>';
    }
    tabla += '</table>';
    document.getElementById("taulell").innerHTML = tabla;
    return tabla;
}