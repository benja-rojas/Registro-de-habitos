const fecha = new Date();
const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

let fechaActual = document.getElementById("fechaActual");
let mesActual = document.getElementById("mesActual");
let diasMes = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0).getDate();

let racha = [];

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

//Selecciona los dias y se los asigna a la variable button
for (let dia = 1; dia <= diasMes; dia++) {
	let button = document.getElementById("dia-" + dia);
    //Habilita los botones hsta el dia actual
	if (dia <= fecha.getDate()) {
		button.addEventListener("click", function () {
			button.classList.toggle("racha");
            //Agrega el día marcado a la lista racha
            if (button.classList.contains("racha") && !racha.includes(dia)) {
                racha.push(dia);
                console.log(racha);
            }
            //"Elimina" el día que fue desmarcado de la lista racha
            else if (!button.classList.contains("racha") && racha.includes(dia)) {
                racha = racha.filter(d => d !== dia)
                console.log(racha);
            }
		});
        //Desactiva los botones de los días que son mayores al día actual
	} else {
		button.disabled = true;
	}
}