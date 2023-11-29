function iniciarPartida() {
    let fil = prompt("Ingrese la fila de la tabla");
    let col = prompt("Ingrese la tabla de la tabla");
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
    crearTaulell(fil, col);
    setMines(fil, col);
    calcularAdyacentes(fil, col);
}

function crearTaulell(fil, col) {
    let tabla = "";
    //let numCasilla;
//hacer el tratamiento de las fil y col arriba en inicar partida
    

    tabla += '<table id="tabla">';
    for (let i=0 ; i < fil; i++) {
        tabla += '<tr id="filas">';
        
        for (let j=0; j < col; j++) {
            // numCasilla= i +j -1;
            tabla += `<td id="${i}-${j}" data-mina="false" data-num-minas=0 onclick="obreCasella(${i},${j})"><img src="img/fons20px.jpg" id="${i},${j}"/></td>`;
        }
        tabla += '</tr>';
    }
    tabla += '</table>';
    document.getElementById("taulell").innerHTML = tabla;
    return tabla;
}
function obreCasella(i, j) {
    let numCasilla = document.getElementById(`${i}-${j}`);
    if (numCasilla.dataset.abierta === "true") {
        return; // Evita abrir una casilla ya abierta
    }

    numCasilla.dataset.abierta = "true";

    if (numCasilla.dataset.mina === "true") {
        numCasilla.innerHTML = `<img src="img/mina20px.jpg" id="${i},${j}"/>`;
        setTimeout(function() {
            alert("¡Has perdido! Se encontró una mina.")}, 500);
       muestraMinas();
    } else {
        numCasilla.innerHTML = `<img src="img/empty.png" id="${i},${j}"/>`;
        reveal(i, j);
    }
}

function esMina(i, j) {
    let casilla = document.getElementById(`${i}-${j}`);
    return casilla.dataset.mina === "true";
}

function muestraMinas() {
    let filas = document.getElementById("tabla").rows;
    for (let i = 0; i < filas.length; i++) {
        let celdas = filas[i].cells;
        for (let j = 0; j < celdas.length; j++) {
            if (esMina(i, j)) {
                celdas[j].innerHTML = `<img src="img/mina20px.jpg" id="${i},${j}"/>`;
            }
        }
    }
}


//recien agregado
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
//recien agregado
function calcularAdyacentes(fil, col) {
    for (let i = 0; i < fil; i++) {
        for (let j = 0; j < col; j++) {
            if (!esMina(i, j)) {
                let numMinasAdyacentes = contarMinasAdyacentes(i, j);
                setMinesAdjacents(i, j, numMinasAdyacentes);
            }
        }
    }
}

function contarMinasAdyacentes(fil, col) {
    let minasAdyacentes = 0;

    for (let k = fil - 1; k <= fil + 1; k++) {
        if (k >= 0 && k < fil) {
            for (let l = col - 1; l <= col + 1; l++) {
                if (l >= 0 && l < col && !(k === fil && l === col)) {
                    if (esMina(k, l)) {
                        minasAdyacentes++;
                    }
                }
            }
        }
    }
    return minasAdyacentes;
}

function setMinesAdjacents(i, j, nMinesAdyacentes) {
    let casilla = document.getElementById(`${i}-${j}`);
    casilla.dataset.numMinas = nMinesAdyacentes;
    setNumColor(casilla);
}

function setNumColor(casilla) {
    let numMinas = parseInt(casilla.dataset.numMinas, 10);

    switch (numMinas) {
        case 1:
            casilla.style.color = 'blue';
            break;
        case 2:
            casilla.style.color = 'green';
            break;
        case 3:
            casilla.style.color = 'red';
            break;
        // Puedes agregar más casos según sea necesario
        default:
            casilla.style.color = 'black';
            break;
    }
}