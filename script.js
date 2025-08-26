const fecha = new Date();
const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

let fechaActual = document.getElementById("fechaActual");
let mesActual = document.getElementById("mesActual");
let diasMes = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0).getDate();

let agregarHabito = document.getElementById("agregarHabito");

fechaActual.innerHTML = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();
mesActual.innerHTML = meses[fecha.getMonth()];  

// Crea los botones según los días que tiene el mes
for(let dia = 1; dia <= diasMes; dia++) {
    let button = document.createElement("button");
    button.type = "button";
    button.id = "dia-" + dia;
    button.innerHTML = dia;
    document.querySelector(".dias").appendChild(button);
}