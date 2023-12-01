let fil;
let col;
let minas;

function iniciarPartida() {
    fil = prompt("Ingrese la fila de la tabla");
    col = prompt("Ingrese la tabla de la tabla");
    if (fil < 10) {
        fil = 10;
    }
    if (col < 10) {
        col = 10;
    }
    if (fil > 30) {
        fil = 30;
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
    tabla += '<table id="tabla">';
    for (let i=0 ; i < fil; i++) {
        tabla += '<tr id="filas">';
        
        for (let j=0; j < col; j++) {
            tabla += `<td id="${i}-${j}" data-mina="false" data-abierta="false" data-num-minas='0' onclick="obreCasella(${i},${j})"><img src="img/fons20px.jpg" id="${i},${j}"/></td>`;
        }
        tabla += '</tr>';
    }
    tabla += '</table>';
    document.getElementById("taulell").innerHTML = tabla;
    return tabla;
}

function obreCasella(i, j) {
    let numCasilla = document.getElementById(`${i}-${j}`);

    if (numCasilla.dataset.mina == "true") {
        numCasilla.innerHTML = `<img src="img/mina20px.jpg" id="${i},${j}"/>`;
        setTimeout(function () {
            alert("¡BOM! Estás muerto");
        }, 500);
        muestraMinas();
    } else {
        if (numCasilla.dataset.numMinas =='0') {
            reveal(i, j);
        } else {
            numCasilla.dataset.abierta = "true";
            numCasilla.innerHTML = numCasilla.dataset.numMinas;
            
        }
    }
        
    if(verificarGanador()){
        alert("¡Has ganado!");
        return
    }
}


function reveal(i, j) {
    let casella = document.getElementById(`${i}-${j}`);
    if(casella.dataset.abierta=="true"){
        return;
    }
    casella.dataset.abierta="true"
    if(casella.dataset.numMinas=='0'){
        casella.innerHTML=`<img src="img/empty.png" id="${i},${j}"/>`;
        for (let k = i - 1; k <= i + 1; k++) {
            for (let l = j - 1; l <= j + 1; l++) {
                reveal(k, l);
            }
        }
    }else{
        casella.innerHTML=casella.dataset.numMinas;
    }  
}

function esMina(i, j) {
    let casilla = document.getElementById(`${i}-${j}`);
    return casilla.dataset.mina == "true";
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

function setMines() {
    minas = Math.floor((fil * col) * 0.17);
    console.log(minas);
    for (let a = 0; a < minas; a++) {
        let row = Math.floor(Math.random() * fil);
        let colum = Math.floor(Math.random() * col);
        while (document.getElementById(`${row}-${colum}`).dataset.mina== "true") {
            row = Math.floor(Math.random() * fil);
            colum = Math.floor(Math.random() * col);
        }
        let numCasilla = document.getElementById(`${row}-${colum}`);
        numCasilla.dataset.mina = "true";
    }
}


function calcularAdyacentes(fil, col) {
    for (let i = 0; i < fil; i++) {
        for (let j = 0; j < col; j++) {
            let minasAdyacentes=0;
            if (!esMina(i, j)) {
                for (let k = i - 1; k <= i + 1; k++) {
                    for (let l = j - 1; l <= j + 1; l++) {
                        if (k >= 0 && k < fil && l >= 0 && l < col) {
                            if (esMina(k, l)) {
                                minasAdyacentes++;
                            }
                        }
                    }
                }
            }
            setMinesAdjacents(i, j, minasAdyacentes)
        }
    }
}

function setMinesAdjacents(i, j, minasAdyacentes) {
    let casilla = document.getElementById(`${i}-${j}`);
    casilla.dataset.numMinas = minasAdyacentes;
    setNumColor(casilla);
}

function setNumColor(casilla) {
    let numMinas = parseInt(casilla.dataset.numMinas);
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
        default:
            casilla.style.color = 'black';
            break;
    }
}
function verificarGanador() {
    let ganar= true;
    for (let i = 0; i < fil; i++) {
        for (let j = 0; j < col; j++) {
            let numCasilla = document.getElementById(`${i}-${j}`);

            if (esMina(i,j))continue;
            if(numCasilla.dataset.abierta == "false") {
                ganar=false;
            }
        }
    }
    return ganar
}
 