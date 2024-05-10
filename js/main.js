// Header
let header = document.getElementsByTagName('header');
header[0].innerText = 'Calculadora de Materiales v0.59. Última Actualización: 03/05/2024';

// Mensaje de advertencia
let msgDesperdicio = document.getElementById('msg');
msgDesperdicio.innerHTML = '<i class="fa-solid fa-triangle-exclamation fa-lg"></i>Los datos son a modo de referencia y pueden no ser exactos. Los cálculos <strong>tienen incluido un 5% de desperdicio</strong>. <button id="cerrar" class="btn-cerrar">Cerrar</button>';

//Bolsa de 50 kg.
let cemento = 50;

//Coeficiente de desperdicio (5%)
let desperdicio = 1.05;

//Espesor del mortero en mts.
let junta = 0.015;

//Medidas de referencia ladrillo común en mts.
let altoLadrillo = 0.12;
let anchoLadrillo = 0.18;
let largoLadrillo = 0.33;
let nombreLadrillo = 'Ladrillo Hueco 6A 12x18x33';


const productos = [
    {
        id: 1,
        nombre: 'Ladrillo Común 5x13x25',
        precio: 112,
        imagen: './images/1-ladrillo-comun-5x13x25.jpg',
        alto: 0.05,
        ancho: 0.13,
        largo: 0.25
    },
    {
        id: 2,
        nombre: 'Ladrillo Hueco 6A 8x18x33',
        precio: 356,
        imagen: './images/2-ladrillo-hueco-6a-8x18x33.jpg',
        alto: 0.08,
        ancho: 0.18,
        largo: 0.33
    },
    {
        id: 3,
        nombre: 'Ladrillo Hueco 6A 12x18x33',
        precio: 446,
        imagen: './images/3-ladrillo-hueco-6a-12x18x33.jpg',
        alto: 0.12,
        ancho: 0.18,
        largo: 0.33,
        checked: 'checked'
    },
    {
        id: 4,
        nombre: 'Ladrillo Hueco 9A 12x18x33',
        precio: 451,
        imagen: './images/4-ladrillo-hueco-9a-12x18x33.jpg',
        alto: 0.12,
        ancho: 0.18,
        largo: 0.33
    },
    {
        id: 5,
        nombre: 'Ladrillo Hueco 9A 18x18x33',
        precio: 685,
        imagen: './images/5-ladrillo-hueco-9a-18x18x33.jpg',
        alto: 0.18,
        ancho: 0.18,
        largo: 0.33
    },
    {
        id: 6,
        nombre: 'Ladrillo Portante 18x19x33',
        precio: 819,
        imagen: './images/6-ladrillo-portante-18x19x33.jpg',
        alto: 0.18,
        ancho: 0.19,
        largo: 0.33
    },
    {
        id: 7,
        nombre: 'Ladrillo Retak 10x25x50',
        precio: 2882,
        imagen: './images/7-ladrillo-retak-10x25x50.jpg',
        alto: 0.10,
        ancho: 0.25,
        largo: 0.50
    }
]

const marcaCemento = [
    {
        value: 'lomanegra',
        nombre: 'Loma Negra'
    },
    {
        value: 'avellaneda',
        nombre: 'Cementos Avellaneda'
    },
    {
        value: 'holcim',
        nombre: 'Holcim'
    },
    {
        value: 'pcr',
        nombre: 'PCR'
    },
]

const botonCerrar = document.getElementById('cerrar');
const mensaje = document.getElementById('msg');

botonCerrar.addEventListener('click', () => {
    mensaje.className = 'ocultar';
    sessionStorage.setItem('msgAtencion', 'ocultar');
});

document.addEventListener('DOMContentLoaded', () => {
    const msgAtencion = sessionStorage.getItem('msgAtencion');
    if (msgAtencion === 'ocultar') {
        mensaje.className = 'ocultar';
    }
});


let productsContainer = document.getElementById('products-container');

function renderProducto (productsArray) {
    productsArray.forEach (producto => {
        const card = document.createElement('div');
        card.classList.add('producto');
        card.innerHTML = `<label for="${producto.id}">${producto.nombre}</label>
                          <img src="${producto.imagen}" alt="${producto.nombre}">
                          <div class="sku">SKU <span id="${producto.id}">${producto.id}</span></div>
                          <div class="precio">$ <span>${producto.precio}</span></div>
                          <input type="radio" class="productoSeleccion" name="ladrillos" id="${producto.id}" id="${producto.id}" ${producto.checked}>`;
        productsContainer.appendChild(card);
    })
}
renderProducto(productos);


let marcasContainer = document.getElementById('marcas-cemento');

function renderMarcaCemento (marcasArray) {
    marcasArray.forEach (marcaCemento => {
        const opcion = document.createElement('option');
        opcion.innerHTML = `<option value="${marcaCemento.value}">${marcaCemento.nombre}</option>`;
        marcasContainer.appendChild(opcion);
    })
    getInputId();
}
renderMarcaCemento(marcaCemento);


function getInputId() {
    let inputId = document.querySelectorAll('.productoSeleccion');
    inputId.forEach (clickRadio => {
        clickRadio.onClick = (e) => {
            const productId = e.currentTarget.id;
            const selectedProduct = productos.find(producto => producto.id == productId);
            cartProducts.push(selectedProduct);
        }
    })
}


//Funcion principal
function calcularLadrillos() { 
    let longitud = document.getElementById('inputLongitud').value;
    let altura = document.getElementById('inputAltura').value;
    let bolsaCemento = document.getElementById('marcas-cemento').value;

    let resultadoPared = longitud * altura;

    let ladrilloMortero = ((largoLadrillo + junta) * (altoLadrillo + junta));

    let ladrillosCantidad = resultadoPared / ladrilloMortero * desperdicio;

    // let cementoBolsas = Math.round((ladrillosCantidad / 3) / cemento);
    let juntaSuperior = junta * largoLadrillo * anchoLadrillo;
    let juntaLateral = junta * altoLadrillo * anchoLadrillo;
    let juntaTotal = (juntaSuperior + juntaLateral) * ladrillosCantidad;

    //Relacion 1:3 - 454 Kg./m3 de cemento
    let dosificacionMortero = 454;
    let cementoBolsas = dosificacionMortero * juntaTotal * desperdicio / cemento;

    //Redondeo de valores
    resultadoPared = Math.round(resultadoPared);
    ladrillosCantidad = Math.round(ladrillosCantidad);
    cementoBolsas = Math.ceil(cementoBolsas);
    
    let resultadoCalculo = `<div class="resultado-final">
                            <h4>- RESULTADOS -</h4>
                            <p>Producto: <strong>${nombreLadrillo}</strong></p>
                            <p>Superficie de pared: <strong>${resultadoPared} m<sup>2</sup></strong></p>
                            <p>Cantidad: <strong>${ladrillosCantidad} unid.</strong></p>
                            <p>Marca de cemento: <strong>${bolsaCemento}</strong></p>
                            <p>Cantidad de bolsas: <strong>${cementoBolsas} unid. de 50 kg.</strong></p>
                            <button class="agregar-carrito" id="agregarAlCarrito">Agregar al Carrito</button>
                            </div>`;

    const resultado = document.getElementById('resultado');
    resultado.innerHTML = resultadoCalculo;

    tryAnalisis(longitud, altura);
}

let botonCalcular = document.getElementById('botonCalcular');
botonCalcular.addEventListener('click', () => {
    calcularLadrillos();
});

function borrarCalculo() {
    let resultadoFinal = document.querySelector('.resultado-final');
    resultadoFinal.remove();
    let mensajeAnalisis = document.querySelector('#analisis-resultado');
    mensajeAnalisis.innerText = '';
    mensajeAnalisis.classList.remove('mensaje','error','correcto','ocultar');
}

let botonBorrar = document.getElementById('botonBorrar');
botonBorrar.addEventListener('click', function() {
    borrarCalculo();
});


const radioSelection = document.querySelectorAll('input[type="radio"].productoSeleccion');

// Agrega un event listener a cada radio button
radioSelection.forEach(radio => {
    radio.addEventListener('click', function() {
        const idSeleccionado = parseInt(this.id);
        const productoSeleccionado = productos.find(producto => producto.id === idSeleccionado);
        
        if (productoSeleccionado) {
            altoLadrillo = productoSeleccionado.alto;
            anchoLadrillo = productoSeleccionado.ancho;
            largoLadrillo = productoSeleccionado.largo;
            nombreLadrillo = productoSeleccionado.nombre;
        }
    });
});


function tryAnalisis(longitud, altura) {
    let analisis = '';
    let analisisResultado = document.getElementById('analisis-resultado');
    try {
        // if ((longitud && altura) > 0) {
        if (longitud > 0 || altura > 0) {
            analisisResultado.classList.add('mensaje','correcto');
            analisis = 'El cálculo se realizó correctamente'; 
        } else {
            analisisResultado.classList.add('mensaje','error');
            throw new Error('Ingrese las medidas correctas para realizar el cálculo.');
        }

    } catch(err) {
        analisis = err;

    } finally {
        analisisResultado.innerHTML = analisis;
        setTimeout(() => {
            analisisResultado.classList.add('ocultar');
            analisisResultado.classList.remove('mensaje', 'error', 'correcto', 'ocultar');
            analisisResultado.innerText = '';
          }, 3000);
    }
}




// Footer
let footer = document.createElement('footer');
footer.innerHTML = '<p>©Todos los derechos reservados.</p>';
document.body.appendChild(footer);