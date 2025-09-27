const fecha = new Date();
const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

let fechaActual = document.getElementById("fechaActual");
let mesActual = document.getElementById("mesActual");
let diasMes = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0).getDate();

let habitos = {
	2025: {
		Septiembre: [
			{
				nombre: "Tomar agua",
				racha: [1, 2, 4, 5, 8, 10, 11, 12, 14, 20, 21, 22, 23, 25, 26, 27]
			},
			{
				nombre: "Hacer ejercicio",
				racha: [4, 5, 7, 8, 9, 15, 16, 18, 20, 24, 25, 26]
			},
		],
	},
};

console.log(habitos)

let contenedorHabitos = document.querySelector(".contenedor-habitos")

let agregarHabito = document.getElementById("agregarHabito");

fechaActual.innerHTML = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();
mesActual.innerHTML = meses[fecha.getMonth()];  

//Lista los hábitos por defecto
for (anio in habitos) {
	console.log(anio);
	for (mes in habitos[anio]) {
		console.log(mes);
		habitos[anio][mes].forEach((h) => {
			let nombreHabito = h.nombre;
			let rachaHabito = h.racha;

			crearHabitoDom(nombreHabito, rachaHabito)
		});
	}
}

agregarHabito.addEventListener("click", function () {
	let nombreHabito = prompt("Ingrese el nombre del hábito que desea agregar");
	let rachaHabito = [];
	if (nombreHabito != "" && nombreHabito != null) {
		let anioHabito = fecha.getFullYear();
		let mesHabito = meses[fecha.getMonth()];

		//Crea un nuevo objeto hábito, para luego agregarlo al array de meses
		let nuevoHabito = {
			nombre: nombreHabito,
			racha: rachaHabito,
		};

		//Crea el objeto año si es que no existe para guardar los meses
		if (!habitos[anioHabito]) {
			habitos[anioHabito] = {};
		}

		//Crea el array mes si es que no existe para guardar los hábitos
		if (!habitos[anioHabito][mesHabito]) {
			habitos[anioHabito][mesHabito] = [];
		}

		//Agrega el nuevo hábito al array del mes correspondiente
		habitos[anioHabito][mesHabito].push(nuevoHabito);
		console.log(habitos);

		crearHabitoDom(nombreHabito, rachaHabito);
	} else if (nombreHabito === "") {
		alert("El nombre del hábito no puede estar vacío");
	}
});


function crearHabitoDom(nombreHabito, rachaHabito) {
	let divHabito = document.createElement("div");
	divHabito.classList.add("habito");

	let divNombreHabito = document.createElement("div");
	divNombreHabito.classList.add("nombre-habito");
	divNombreHabito.innerHTML = nombreHabito;

	let divDias = document.createElement("div");
	divDias.classList.add("dias");

	let opcion = document.createElement("div");
	opcion.classList.add("opcion");

	let eliminarHabito = document.createElement("button");
	eliminarHabito.type = "button";
	eliminarHabito.id = "eliminarHabito";

	let iconEliminar = document.createElement("img");
	iconEliminar.src = "icons/trash.svg";

	crearBotonDia(nombreHabito, rachaHabito, divDias);
	borrarHabito(eliminarHabito, divHabito);

	//Agrega los elementos creados al DOM
	contenedorHabitos.appendChild(divHabito);
	divHabito.appendChild(divNombreHabito);
	divHabito.appendChild(divDias);
	divHabito.appendChild(opcion);
	opcion.appendChild(eliminarHabito);
	eliminarHabito.appendChild(iconEliminar);
}

function crearBotonDia(nombreHabito, rachaHabito, divDias) {
	for (let dia = 1; dia <= diasMes; dia++) {
		let button = document.createElement("button");
		button.type = "button";
		button.innerHTML = dia;

		if (rachaHabito.includes(dia)) {
			button.classList.toggle("racha");
		}

		//Habilita los botones hasta el dia actual
		if (dia <= fecha.getDate()) {
			button.addEventListener("click", function () {
				button.classList.toggle("racha");
				//Agrega el día marcado a la lista racha
				if (button.classList.contains("racha") && !rachaHabito.includes(dia)) {
					rachaHabito.push(dia);
					console.log(nombreHabito, rachaHabito);
				}
				//"Elimina" el día que fue desmarcado de la lista racha
				else if (!button.classList.contains("racha") && rachaHabito.includes(dia)) {
					rachaHabito = rachaHabito.filter((d) => d !== dia);
					console.log(nombreHabito, rachaHabito);
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

function borrarHabito(eliminarHabito, divHabito) {
	eliminarHabito.addEventListener("click", function() {
		divHabito.remove()
	})
}