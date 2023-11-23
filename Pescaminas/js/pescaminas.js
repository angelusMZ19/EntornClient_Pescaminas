function iniciarPartida() {
    let dimension = prompt("Ingrese la dimensión de la tabla");
    crearTaulell(dimension);
}

function crearTaulell(dimension) {
    let tabla = "";
    let numCasilla;

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
            numCasilla= i +j -1;
            tabla += '<td id="celdas" data-mina="false" onclick="obreCasella(\''+ numCasilla + '\')"><img src="img/fons20px.jpg" id="imagen"/></td>';
        }
        tabla += '</tr>';
    }
    tabla += '</table>';
    document.getElementById("taulell").innerHTML = tabla;
    return tabla;
}
function obreCasella(numCasilla) {
    alert('se a abierto la casilla con el conetenido: ' + numCasilla);
}
function setMines(){

}
