function init() {
	//variables
	var str, res, cont;
	var resultado = document.getElementById("resultado");
	var p = document.getElementById("p");
	var q = document.getElementById("q");
	var r = document.getElementById("r");
	var neg = document.getElementById("neg");
	var y = document.getElementById("y");
	var o = document.getElementById("o");
	var sisolosi = document.getElementById("sisolosi");
	var entonces = document.getElementById("entonces");
	var parentesisi = document.getElementById("parentesisi");
	var parentesisd = document.getElementById("parentesisd");
	var limpiar = document.getElementById("limpiar");
	var igual = document.getElementById("igual");
	//eventos

	p.onclick = function (e) {
		resultado.textContent = resultado.textContent + "P";
		habilitar();
	}
	q.onclick = function (e) {
		resultado.textContent = resultado.textContent + "Q";
		habilitar();
	}
	r.onclick = function (e) {
		resultado.textContent = resultado.textContent + "R";
		habilitar();
	}
	neg.onclick = function (e) {
		resultado.textContent = resultado.textContent + "¬";
	}
	y.onclick = function (e) {
		resultado.textContent = resultado.textContent + "∧";
		deshabilitar();
	}
	o.onclick = function (e) {
		resultado.textContent = resultado.textContent + "∨";
		deshabilitar();
	}
	sisolosi.onclick = function (e) {
		resultado.textContent = resultado.textContent + "↔";
		deshabilitar();
	}
	entonces.onclick = function (e) {
		resultado.textContent = resultado.textContent + "→";
		deshabilitar();
	}

	parentesisi.onclick = function (e) {
		resultado.textContent = resultado.textContent + "(";
	}

	parentesisd.onclick = function (e) {
		resultado.textContent = resultado.textContent + ")";
	}
	limpiar.onclick = function (e) {
		resultado.textContent = ""
		deshabilitar();
	}
	igual.onclick = function (e) {
		str = resultado.textContent;
		res = str.split('');
		cont = contarProposiciones(res);
		operar(res, cont)
	}
}


function habilitar() {
	document.getElementById("y").disabled = false;
	document.getElementById("o").disabled = false;
	document.getElementById("sisolosi").disabled = false;
	document.getElementById("entonces").disabled = false;
	document.getElementById("p").disabled = true;
	document.getElementById("q").disabled = true;
	document.getElementById("r").disabled = true;
	document.getElementById("neg").disabled = true;

}
function deshabilitar() {
	document.getElementById("y").disabled = true;
	document.getElementById("o").disabled = true;
	document.getElementById("sisolosi").disabled = true;
	document.getElementById("entonces").disabled = true;
	document.getElementById("p").disabled = false;
	document.getElementById("q").disabled = false;
	document.getElementById("r").disabled = false;
	document.getElementById("neg").disabled = false;

}
function contarProposiciones(arr) {
	var contador = 0
	validarP = arr.includes("P");
	validarQ = arr.includes("Q");
	validarR = arr.includes("R");
	if (validarP == true) {
		contador = contador + 1;
		if (validarQ == true) {
			contador = contador + 1;
			if (validarR == true) {
				contador = contador + 1;
			}
		}
	}
	return contador
}

function operar(arr, contador) {
	let tablas = new Map()
	let parentesis = new Map()
	let operaciones = []
	//Declarar tablas en función de las variables
	if (contador == 1) {
		proposicion1 = [1, 0]
	} else if (contador == 2) {
		proposicion1 = [1, 1, 0, 0]
		proposicion2 = [1, 0, 1, 0]
	} else {
		proposicion1 = [1, 1, 1, 1, 0, 0, 0, 0]
		proposicion2 = [1, 1, 0, 0, 1, 1, 0, 0]
		proposicion3 = [1, 0, 1, 0, 1, 0, 1, 0]
	}
	//Asignar tablas a las variables
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] == 'P' && !tablas.has('P')) {
			if (tablas.size == 0) {
				tablas.set('P', proposicion1)
			} else if (tablas.size == 1) {
				tablas.set('P', proposicion2)
			} else {
				tablas.set('P', proposicion3)
			}
		} else if (arr[i] == 'Q' && !tablas.has('Q')) {
			if (tablas.size == 0) {
				tablas.set('Q', proposicion1)
			} else if (tablas.size == 1) {
				tablas.set('Q', proposicion2)
			} else {
				tablas.set('Q', proposicion3)
			}
		}
		else if (arr[i] == 'R' && !tablas.has('R')) {
			if (tablas.size == 0) {
				tablas.set('R', proposicion1)
			} else if (tablas.size == 1) {
				tablas.set('R', proposicion2)
			} else {
				tablas.set('R', proposicion3)
			}
		}
	}

	//Encontrar los paréntesis para añadir las operaciones y realizarlas
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] == '(' && !parentesis.has(i)) {
			var cont = 0
			for (var j = i + 1; j < arr.length; j++) {
				if (arr[j] == ')') {
					if (cont == 0) {
						parentesis.set(i, j)
						break
					} else {
						cont -= 1
					}
				} else if (arr[j] == '(') {
					cont += 1
				}
			}
		}
	}


	//agregar cada operación al mapa
	for (let inicio of parentesis.keys()) {
		var str = ""
		var fin = parentesis.get(inicio)
		for (var i = inicio + 1; i < fin; i++) {
			str = str + arr[i]
		}
		operaciones.push(str)
	}


	//Operar la función
	for (var i = (operaciones.length - 1); i >= 0; i--) {
		var suboperacion = operaciones[i].split('')
		let valores = []
		var oper = 0
		for (var j = 0; j < suboperacion.length; j++) {
			if (suboperacion[j] == '¬') {
				j += 1
				if (suboperacion[j] == '(') {
					var aux = ""
					j++
					do {
						aux = aux + suboperacion[j]
						j++
					} while (suboperacion[j] != ')')
					valores.push(invertir(tablas.get(aux)))
				} else {
					valores.push(invertir(tablas.get(suboperacion[j])))
				}
			} else if (suboperacion[j] == '(') {
				var aux = ""
				var count = 0
				var stop = false
				j++
				do {
					if (suboperacion[j] == '(') {
						count++
					} else if (suboperacion[j] == ')') {
						count--
					}
					aux = aux + suboperacion[j]
					j++
					if (suboperacion[j] == ')' && count == 0){
						stop = true
					}
				} while (!stop)
				console.log(aux)
				valores.push(tablas.get(aux))
			} else if (suboperacion[j] != '↔' && suboperacion[j] != '→' && suboperacion[j] != '∧' && suboperacion[j] != '∨' && suboperacion[j] != ')') {
				valores.push(tablas.get(suboperacion[j]))
			} else {
				if (suboperacion[j] == '↔') {
					oper = 1
				} else if (suboperacion[j] == '→') {
					oper = 2
				} else if (suboperacion[j] == '∧') {
					oper = 3
				} else if (suboperacion[j] == '∨') {
					oper = 4
				}
			}
		}

		switch (oper) {
			case 1:
				tablas.set(operaciones[i], operarsisolosi(valores[0], valores[1]))
				break
			case 2:
				tablas.set(operaciones[i], operarentonces(valores[0], valores[1]))
				break
			case 3:
				tablas.set(operaciones[i], operarand(valores[0], valores[1]))
				break
			default:
				tablas.set(operaciones[i], operaror(valores[0], valores[1]))
				break
		}

		var tipoRes = comprobar(tablas.get(operaciones[i]))

		//comprobar e imprimir
		if (i == 0){
			alert('El valor de ' + operaciones[i] +" es: " + tablas.get(operaciones[i])+", es una " + tipoRes)
		}
	}

}

//Operación And
function operarand(valor1, valor2) {
	let res = []
	for (var i = 0; i < valor1.length; i++) {
		if (valor1[i] == 1 && valor2[i] == 1) {
			res.push(1)
		} else {
			res.push(0)
		}
	}
	return res
}

//operación Or
function operaror(valor1, valor2) {
	let res = []
	for (var i = 0; i < valor1.length; i++) {
		if (valor1[i] == 1 || valor2[i] == 1) {
			res.push(1)
		} else {
			res.push(0)
		}
	}
	return res
}


//Operacion Si solo si
function operarsisolosi(valor1, valor2) {
	let res = []
	for (var i = 0; i < valor1.length; i++) {
		if (valor1[i] == valor2[i]) {
			res.push(1)
		} else {
			res.push(0)
		}
	}
	return res
}

//Operacion Entonces
function operarentonces(valor1, valor2) {
	let res = []
	console.log("arreglo 1:", valor1)
	console.log("arreglo 2:", valor2)
	for (var i = 0; i < valor1.length; i++) {
		if (valor1[i] == 1 && valor2[i] == 0) {
			res.push(0)
		} else {
			res.push(1)
		}
	}
	return res
}

//Operacion negacion
function invertir(arr) {
	let res = []
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] == 1) {
			res.push(0)
		} else {
			res.push(1)
		}
	}
	return res
}


//Comprobar tipo de respuesta
function comprobar(arr){
	var tautologia = true
	var falacia = true
	//tautología
	for (var i = 0; i<arr.length; i++) {
		if (arr[i] != 1){
			tautologia = false
			break
		}
	}
	//falacia
	for (var i = 0; i<arr.length; i++) {
		if (arr[i] != 0){
			falacia = false
			break
		}
	}
	if (tautologia){
		return "Tautología"
	}else if (falacia) {
		return "Falacia"
	}else {
		return "Contingencia"
	}
}