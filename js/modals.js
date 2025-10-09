import { mostrarModal, opcionesModal, mensajeModal, agregarNuevoHabito, borrarHabito } from "./app.js";

let removerBoton;

export function modalAgregarHabito() {
	let contenidoModal = document.querySelector(".contenido-modal");

	mostrarModal.style.visibility = "visible";
	mensajeModal.innerText = "Ingrese el nombre del hábito que desea agregar";

	let inputModal = document.createElement("input");
	inputModal.type = "text";
	inputModal.id = "inputModal";
	inputModal.value = "";

	let botonAgregar = document.createElement("button");
	botonAgregar.type = "button";
	botonAgregar.id = "agregarHabito";
	botonAgregar.innerText = "Agregar";

	contenidoModal.appendChild(inputModal);
	inputModal.focus();
	opcionesModal.appendChild(botonAgregar);

	botonAgregar.addEventListener("click", agregarNuevoHabito);
	inputModal.addEventListener("keydown", function (e) {
		if (e.key === "Enter") {
			e.preventDefault();
			agregarNuevoHabito();
		}
	});

	removerBoton = botonAgregar;
}

export function modalConfirmarBorrarHabito(divHabito, nombreHabito, rachaHabito, anioHabito, mesHabito) {
	mostrarModal.style.visibility = "visible";
	mensajeModal.innerText = `¿Estás seguro de borrar el hábito "${nombreHabito}"?`;

	let botonEliminar = document.createElement("button");
	botonEliminar.type = "button";
	botonEliminar.id = "botonEliminar";
	botonEliminar.innerText = "Borrar";

	opcionesModal.appendChild(botonEliminar);

	botonEliminar.addEventListener("click", function() {
		borrarHabito(divHabito, nombreHabito, rachaHabito, anioHabito, mesHabito)
	})

	removerBoton = botonEliminar;
}

export function cerrarModal() {
	let contenidoModal = document.querySelector(".contenido-modal");
	contenidoModal.innerHTML = "";
	mostrarModal.style.visibility = "hidden";

	if (removerBoton) {
		removerBoton.remove();
	}
}
