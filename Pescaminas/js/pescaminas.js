function iniciarPartida() {
    let fil = prompt("Ingrese la fila de la tabla");
    let col = prompt("Ingrese la tabla de la tabla");
    crearTaulell(fil, col);
    setMines(fil, col);
}

function crearTaulell(fil, col) {
    let tabla = "";
    let numCasilla;

    if (fil < 10) {
        fil = 10;
    }
    if (fil > 30) {
        fil = 30;
    }
    if (col < 10) {
        col = 10;
    }
    if (col > 30) {
        col = 30;
    }

    tabla += '<table id="tabla">';
    for (let i=0 ; i < fil; i++) {
        tabla += '<tr id="filas">';
        
        for (let j=0; j < col; j++) {
            // numCasilla= i +j -1;
            tabla += `<td id="${i}-${j}" data-mina="false" data-num-minas=0 onclick="obreCasella(${i},${j})"><img src="img/fons20px.jpg" id="imagen"/></td>`;
        }
        tabla += '</tr>';
    }
    tabla += '</table>';
    document.getElementById("taulell").innerHTML = tabla;
    return tabla;
}
function obreCasella(i,j) {
    let numCasilla= document.getElementById(`${i}-${j}`).innerHTML="";
    console.log(`${i}-${j}`);
    alert('se a abierto la casilla con el conetenido: ' + `${i}-${j}`);
    
}
function setMines(fil, col){
    let minas= Math.floor((fil*col)*0.17);
    for(let a= 0; a< minas; a++){
        let row = Math.floor(Math.random() * fil);
        let colum = Math.floor(Math.random() * col);
        let numCasilla= document.getElementById(`${row}-${colum}`);
        numCasilla.dataset.mina="true";
    }
    console.log(minas);

}
