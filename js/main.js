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


let productsContainer = document.getElementById('products-container');
let marcasContainer = document.getElementById('marcas-cemento');
let txtErrorProductos = 'ERROR. No se pudo cargar los productos. Intente nuevamente más tarde.';
let msgErrorProductos = document.getElementById('msgErrorProductos');


fetch('../db/ladrillos.json')
.then(response => response.json())
.then(data => {
    data.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('producto');
        card.innerHTML = `<label for="${producto.id}">${producto.nombre}</label>
                          <img src="${producto.imagen}" alt="${producto.nombre}">
                          <div class="sku">SKU <span id="${producto.id}">${producto.id}</span></div>
                          <div class="precio">$ <span>${producto.precio}</span></div>
                          <input type="radio" class="productoSeleccion" name="ladrillos" id="${producto.id}" id="${producto.id}" ${producto.checked}>`
        productsContainer.appendChild(card);
    })
})


const obtenerMarcasCementos = async () => {
    let URL = '../db/cementos.json';
    const marcaError = `<option disabled>ERROR. No se pudo cargar las marcas, intente más tarde.</option>`;
    let renderizado = ``;

    try {
        let solicitud = await fetch(URL);
        let response = await solicitud.json();

        response.forEach(marcaCemento => {
            let marcasContainer = document.getElementById('marcas-cemento');
            renderizado += `<option value="${marcaCemento.value}">${marcaCemento.nombre}</option>`;
            marcasContainer = renderizado;
        })

    } catch(err) {
        console.log('Error detectado', err);
        renderizado = marcaError;

    } finally {
        let marcasContainer = document.getElementById('marcas-cemento');
        marcasContainer.innerHTML = renderizado;
        // document.body.innerHTML = renderizado;
    }
}
obtenerMarcasCementos();


//Boton cerrar mensaje
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

    //let cementoBolsas = Math.round((ladrillosCantidad / 3) / cemento);
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


//Botones
let botonCalcular = document.getElementById('botonCalcular');
botonCalcular.addEventListener('click', () => {
    calcularLadrillos();
});

function borrarCalculo() {
    let resultadoFinal = document.querySelector('.resultado-final');
    resultadoFinal.remove();
    let mensajeAnalisis = document.querySelector('#analisis-resultado');
    mensajeAnalisis.innerText = '';
    mensajeAnalisis.classList.remove('mensaje','error','correcto','ocultar-anim');
}

let botonBorrar = document.getElementById('botonBorrar');
botonBorrar.addEventListener('click', function() {
    borrarCalculo();
});


//Agrega un event listener a cada radio button
const radioSelection = document.querySelectorAll('input[type="radio"].productoSeleccion');

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

//Mensaje de estado de calculo con try-catch-finally
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
            analisisResultado.classList.add('ocultar-anim');
            analisisResultado.classList.remove('mensaje', 'error', 'correcto', 'ocultar-anim');
            analisisResultado.innerText = '';
          }, 3000);
    }
}


//Footer
let footer = document.createElement('footer');
footer.innerHTML = '<p>©Todos los derechos reservados.</p>';
document.body.appendChild(footer);