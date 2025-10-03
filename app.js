const fecha = new Date();
const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

let fechaActual = document.getElementById("fechaActual");

let filtrarMes = document.getElementById("filtrarMes");

const habitosPorDefecto = {
	2025: {
		Abril: [
			{
				nombre: "Tomar agua",
				racha: [1, 2, 4, 5, 8, 10, 11, 12, 14, 20, 21, 22, 23, 25, 26, 27, 28, 29, 30],
			},
			{
				nombre: "Dormir 8 horas",
				racha: [1, 2, 4, 5, 8, 10, 12, 14, 20, 21, 23, 26, 27, 29, 30],
			},
		],
		Septiembre: [
			{
				nombre: "Tomar agua",
				racha: [1, 2, 4, 5, 8, 10, 11, 12, 14, 20, 21, 22, 23, 25, 26, 27],
			},
		],
	},
};

let habitos = JSON.parse(localStorage.getItem("habitos"));

if (habitos != null) {
	localStorage.setItem("habitos", JSON.stringify(habitos));
} else {
	localStorage.setItem("habitos", JSON.stringify(habitosPorDefecto));
}

let contenedorMensaje = document.querySelector(".contenedor-mensaje");
let contenedorHabitos = document.querySelector(".contenedor-habitos");

let agregarHabito = document.getElementById("agregarHabito");

fechaActual.innerHTML = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();

for (const mes of meses) {
	let mesOpcion = document.createElement("option");
	mesOpcion.classList.add("mesOpcion");
	mesOpcion.value = mes;
	mesOpcion.innerHTML = mes;

	filtrarMes.appendChild(mesOpcion);
}

//Muestra los hábitos según el mes
let mesActual = meses[fecha.getMonth()];
filtrarMes.value = mesActual;

contenedorHabitos.innerHTML = "";

listarPorMes(mesActual);

function listarPorMes(listarMes) {
	for (let anioHabito in habitos) {
		console.log(anioHabito);
		for (let mesHabito in habitos[anioHabito]) {
			if (mesHabito === listarMes) {
				habitos[anioHabito][mesHabito].forEach((habito) => {
					let nombreHabito = habito.nombre;
					let rachaHabito = habito.racha;

					console.log(anioHabito, mesHabito);

					crearHabitoDom(habito, nombreHabito, rachaHabito, anioHabito, mesHabito);
				});
			}
		}
	}
}

filtrarMes.addEventListener("change", function () {
	let mesSeleccionado = filtrarMes.value;

	contenedorHabitos.innerHTML = "";
	contenedorMensaje.innerHTML = "";

	listarPorMes(mesSeleccionado);

	if (mesActual != mesSeleccionado) {
		let mensaje = document.createElement("p");
		mensaje.classList.add("mensaje");
		mensaje.innerText = "No puedes crear ni modificar hábitos en un mes que no sea el actual";

		agregarHabito.style.visibility = "hidden";

		contenedorMensaje.appendChild(mensaje);
	} else {
		agregarHabito.style.visibility = "visible";
	}

	console.log(mesSeleccionado);
});

agregarHabito.addEventListener("click", function () {
	let nombreHabito = prompt("Ingrese el nombre del hábito que desea agregar");
	let rachaHabito = [];
	if (nombreHabito != "" && nombreHabito != null) {
		let anioActual = fecha.getFullYear();
		let mesActual = meses[fecha.getMonth()];

		//Crea un nuevo objeto hábito, para luego agregarlo al array de meses
		let nuevoHabito = {
			nombre: nombreHabito,
			racha: rachaHabito,
		};

		//Crea el objeto año si es que no existe para guardar los meses
		if (!habitos[anioActual]) {
			habitos[anioActual] = {};
		}

		//Crea el array mes si es que no existe para guardar los hábitos
		if (!habitos[anioActual][mesActual]) {
			habitos[anioActual][mesActual] = [];
		}

		//Agrega el nuevo hábito al array del mes correspondiente
		habitos[anioActual][mesActual].push(nuevoHabito);

		localStorage.setItem("habitos", JSON.stringify(habitos));

		crearHabitoDom(nombreHabito, rachaHabito);
		location.reload();

	} else if (nombreHabito === "") {
		alert("El nombre del hábito no puede estar vacío");
	}
});

function crearHabitoDom(habito, nombreHabito, rachaHabito, anioHabito, mesHabito) {
	let divHabito = document.createElement("div");
	divHabito.classList.add("habito");

	let divNombreHabito = document.createElement("div");
	divNombreHabito.classList.add("habito-nombre");
	let textoNombreHabito = document.createElement("p");
	textoNombreHabito.classList.add("habito-nombre-texto")
	textoNombreHabito.innerText = nombreHabito

	let divDias = document.createElement("div");
	divDias.classList.add("dias");

	let opcion = document.createElement("div");
	opcion.classList.add("opciones");

	let botonEliminar = document.createElement("button");
	botonEliminar.type = "button";
	botonEliminar.classList = "boton-Eliminar";

	let iconEliminar = document.createElement("img");
	iconEliminar.src = "icons/trash.svg";

	let botonEditar = document.createElement("button");
	botonEditar.type = "button";
	botonEditar.classList = "boton-editar";

	let iconEditar = document.createElement("img");
	iconEditar.src = "icons/pencil-line.svg";

	crearBotonDia(nombreHabito, rachaHabito, divDias, anioHabito, mesHabito);
	borrarHabito(botonEliminar, divHabito, nombreHabito, rachaHabito, anioHabito, mesHabito);
	editarNombreHabito(botonEditar, habito, divNombreHabito, textoNombreHabito, nombreHabito, anioHabito, mesHabito)

	//Agrega los elementos creados al DOM
	contenedorHabitos.appendChild(divHabito);
	divHabito.appendChild(divNombreHabito);
	divNombreHabito.appendChild(textoNombreHabito)
	divHabito.appendChild(divDias);
	divHabito.appendChild(opcion);
	if(mesHabito === mesActual){
		opcion.appendChild(botonEliminar);
		botonEliminar.appendChild(iconEliminar);
		opcion.appendChild(botonEditar);
		botonEditar.appendChild(iconEditar);
	}
}

function obtenerDiasMes(anio, mesNombre) {
	let mesIndex = meses.indexOf(mesNombre);
	return new Date(Number(anio), mesIndex + 1, 0).getDate();
}

function crearBotonDia( nombreHabito, rachaHabito, divDias, anioHabito, mesHabito) {
	let diasMes = obtenerDiasMes(anioHabito, mesHabito);
	console.log(anioHabito, mesHabito);

	for (let dia = 1; dia <= diasMes; dia++) {
		let button = document.createElement("button");
		button.type = "button";
		button.innerHTML = dia;

		if (rachaHabito.includes(dia)) {
			button.classList.toggle("racha");
		}

		//Habilita los botones hasta el dia actual
		if (dia <= fecha.getDate() && mesHabito === mesActual) {
			button.addEventListener("click", function () {
				button.classList.toggle("racha");
				//Agrega el día marcado a la lista racha
				if (button.classList.contains("racha") && !rachaHabito.includes(dia)) {
					rachaHabito.push(dia);
					localStorage.setItem("habitos", JSON.stringify(habitos));
					console.log(nombreHabito, rachaHabito);
				} else if (
					!button.classList.contains("racha") &&
					rachaHabito.includes(dia)
				) {
					let buscarHabito = habitos[anioHabito][mesHabito].find(
						(h) => h.nombre === nombreHabito
					);

					//"Elimina" el día que fue desmarcado de la lista racha
					if (buscarHabito) {
						buscarHabito.racha = buscarHabito.racha.filter((d) => d !== dia);
					}

					localStorage.setItem("habitos", JSON.stringify(habitos));
					console.log(rachaHabito);
				}
			});
		}
		//Desactiva los botones de los días que son mayores al día actual y de los meses anteriores al actual
		else {
			button.disabled = true;
		}

		divDias.appendChild(button);
	}
}

function editarNombreHabito(botonEditar, habito, divNombreHabito, textoNombreHabito, nombreHabito, anioHabito, mesHabito) {
	if (mesHabito === mesActual) {
		botonEditar.addEventListener("click", function () {
			textoNombreHabito.remove();

			let cambiarNombreHabito = document.createElement("input");
			cambiarNombreHabito.classList.add("habito-nombre-input");
			cambiarNombreHabito.type = "text";
			cambiarNombreHabito.value = nombreHabito;
			console.log(cambiarNombreHabito.value);

			let botonActualizar = document.createElement("button");
			botonActualizar.type = "button"
			botonActualizar.classList.add("boton-actualizar")

			let iconActualizar = document.createElement("img")
			iconActualizar.src = "icons/save.svg"
			
			botonEditar.replaceWith(botonActualizar)
			botonActualizar.appendChild(iconActualizar)

			function actualizarNombreHabito() {
				if (cambiarNombreHabito.value != "") {
					textoNombreHabito.innerText = cambiarNombreHabito.value;

					habito.nombre = cambiarNombreHabito.value

					nombreHabito = cambiarNombreHabito.value

					localStorage.setItem("habitos", JSON.stringify(habitos));

					console.log(habitos);
				} else {
					textoNombreHabito.innerText = nombreHabito;
				}
				cambiarNombreHabito.replaceWith(textoNombreHabito)
				botonActualizar.replaceWith(botonEditar)

				textoNombreHabito.innerText = cambiarNombreHabito.value
				console.log(cambiarNombreHabito.value);
			}

			botonActualizar.addEventListener("click", actualizarNombreHabito)
			cambiarNombreHabito.addEventListener("keydown", function (e) {
				if (e.key === "Enter") {
					e.preventDefault();
					actualizarNombreHabito();
				}
			});

			divNombreHabito.appendChild(cambiarNombreHabito);
			cambiarNombreHabito.select();
			cambiarNombreHabito.focus();
		});
	}
}

function borrarHabito(botonEliminar, divHabito, nombreHabito, rachaHabito, anioHabito, mesHabito) {
	botonEliminar.addEventListener("click", function () {
		divHabito.remove();

		//"Elimina" el hábito del array que coincida con el mes y año
		if (habitos[anioHabito] && habitos[anioHabito][mesHabito]) {
			habitos[anioHabito][mesHabito] = habitos[anioHabito][mesHabito].filter(
				(h) => h.nombre !== nombreHabito
			);
		}

		localStorage.setItem("habitos", JSON.stringify(habitos));
		console.log(nombreHabito);
	});
}