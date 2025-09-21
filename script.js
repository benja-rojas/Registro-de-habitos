const fecha = new Date();
const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

let fechaActual = document.getElementById("fechaActual");
let mesActual = document.getElementById("mesActual");
let diasMes = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0).getDate();

let contenedorHabitos = document.querySelector(".contenedor-habitos")

let agregarHabito = document.getElementById("agregarHabito");

fechaActual.innerHTML = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();
mesActual.innerHTML = meses[fecha.getMonth()];  

agregarHabito.addEventListener("click", function() {
    let nombreHabito = prompt("Ingrese el nombre del hábito que desea agregar");
    let divHabito = document.createElement("div")
    divHabito.classList.add("habito")

    let divNombreHabito = document.createElement("div")
    divNombreHabito.classList.add("nombre-habito")
    divNombreHabito.innerHTML = nombreHabito

    let divDias = document.createElement("div")
    divDias.classList.add("dias")

    contenedorHabitos.appendChild(divHabito)
    divHabito.appendChild(divNombreHabito)
    divHabito.appendChild(divDias)

    //Crea un array vacio para cada hábito agregado
    let racha = [];

    crearDias(nombreHabito, racha, divDias)
})

// Crea los botones según los días que tiene el mes
function crearDias(nombreHabito, racha, divDias) {
	for (let dia = 1; dia <= diasMes; dia++) {
		let button = document.createElement("button");
		button.type = "button";
		//button.id = nombreHabito + "-dia-" + dia;
		button.innerHTML = dia;

        //Habilita los botones hasta el dia actual
		if (dia <= fecha.getDate()) {
			button.addEventListener("click", function () {
				button.classList.toggle("racha");
				//Agrega el día marcado a la lista racha
				if (button.classList.contains("racha") && !racha.includes(dia)) {
					racha.push(dia);
					console.log(nombreHabito, racha);
				}
				//"Elimina" el día que fue desmarcado de la lista racha
				else if (!button.classList.contains("racha") && racha.includes(dia)) {
					racha = racha.filter((d) => d !== dia);
					console.log(nombreHabito, racha);
				}
			});
		} 
        //Desactiva los botones de los días que son mayores al día actual
        else {
			button.disabled = true;
		}

		divDias.appendChild(button);
	}
}