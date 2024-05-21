// Header
let header = document.getElementsByTagName('header');
header[0].innerText = 'Calculadora de Materiales v0.68. Última Actualización: 21/05/2024';

// Mensaje de advertencia
let msgDesperdicio = document.getElementById('msg');
msgDesperdicio.innerHTML = '<i class="fa-solid fa-triangle-exclamation fa-lg"></i>Los datos son a modo de referencia y pueden no ser exactos. Los cálculos <strong>tienen incluido un 5% de desperdicio</strong>. <button id="cerrar" class="btn-cerrar">Cerrar</button>';

const botonCerrar = document.getElementById('cerrar');
const mensaje = document.getElementById('msg');

// Boton cerrar mensaje
botonCerrar.addEventListener('click', () => {
    mensaje.className = 'ocultar';
    sessionStorage.setItem('msgAtencion', 'ocultar');
});

// Oculta el mensaje
document.addEventListener('DOMContentLoaded', () => {
    const msgAtencion = sessionStorage.getItem('msgAtencion');
    if (msgAtencion === 'ocultar') {
        mensaje.className = 'ocultar';
    }
});

// Impide agregar números negativos y numeros muy altos en los inputs
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('.inputs input[type="number"]');

    inputs.forEach(input => {
      input.addEventListener('input', () => {
        if (input.value < 1) {
          input.value = 1;
        } else if (input.value > 999) {
            input.value = 999;
        }
      });
    });
  });


// Bolsa de 50 kg.
let cemento = 50;
let cementoPrecio = 8450;

// Coeficiente de desperdicio (5%)
let desperdicio = 1.05;

// Espesor del mortero en mts.
let junta = 0.015;

// Declaracion de variables globales
let altoLadrillo  = '';
let anchoLadrillo = '';
let largoLadrillo = '';
let nombreLadrillo = '';
let precioLadrillo = '';

// Sectores de contenido en el HTML
let productsContainer = document.getElementById('products-container');
let marcasContainer = document.getElementById('marcas-cemento');


// Fetch para llamar a los Ladrillos
fetch('../db/ladrillos.json')
.then(response => response.json())
.then(data => {
    data.forEach(producto => {
        altoLadrillo = producto.alto;
        anchoLadrillo = producto.ancho;
        largoLadrillo = producto.largo;
        nombreLadrillo = producto.nombre;
        precioLadrillo = producto.precio;

        const card = document.createElement('div');
        card.classList.add('producto');
        card.innerHTML = `<label for="${producto.id}">
                          <span>${producto.nombre}</span>
                          <img src="${producto.imagen}" alt="${producto.nombre}">
                          <div class="sku">SKU <span>${producto.id}</span></div>
                          <div class="precio">$ <span>${producto.precio}</span></div>
                          <input type="radio" class="productoSeleccion" name="ladrillos" id="${producto.id}" ${producto.checked  ? 'checked' : ''} data-alto="${producto.alto}" data-ancho="${producto.ancho}" data-largo="${producto.largo}" data-nombre="${producto.nombre}" data-precio="${producto.precio}">
                          </label>`
        productsContainer.appendChild(card);

    })
    actualizarData(altoLadrillo, anchoLadrillo, largoLadrillo, nombreLadrillo, precioLadrillo);
})

// Actualiza el atributo Data y las variables globales que seran tomados por la funcion principal
function actualizarData() {
    const inputs = document.querySelectorAll('.producto input');
    inputs.forEach(input => {
        input.addEventListener('click', () => {
            altoLadrillo = parseFloat(input.dataset.alto);
            anchoLadrillo = parseFloat(input.dataset.ancho);
            largoLadrillo = parseFloat(input.dataset.largo);
            nombreLadrillo = input.dataset.nombre;
            precioLadrillo = parseFloat(input.dataset.precio);

            console.log(altoLadrillo);
            console.log(anchoLadrillo);
            console.log(largoLadrillo);
            console.log(nombreLadrillo);
            console.log(precioLadrillo);
        });
    });
}

// Async con Try-Catch-Finally para llamar a las marcas de cemento
const obtenerMarcasCementos = async () => {
    let URL = '../db/cementos.json';
    const marcaError = `<option disabled>ERROR. No se pudo cargar las marcas, intente más tarde.</option>`;
    let renderizado = ``;

    try {
        let solicitud = await fetch(URL);
        let response = await solicitud.json();

        response.forEach(marcaCemento => {
            renderizado += `<option value="${marcaCemento.value}">${marcaCemento.nombre}</option>`;
        })

    } catch(err) {
        console.log('Error detectado', err);
        renderizado = marcaError;

    } finally {
        let marcasContainer = document.getElementById('marcas-cemento');
        marcasContainer.innerHTML = renderizado;
    }
}
obtenerMarcasCementos();


// Funcion Try-Catch-Finally
function tryAnalisis(longitud, altura) {
    let analisis = '';
    let analisisResultado = document.getElementById('analisis-resultado');
    try {
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


// Funcion principal
function calcularLadrillos() { 
    console.log(altoLadrillo, anchoLadrillo, largoLadrillo, nombreLadrillo, precioLadrillo);
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

    // Relacion 1:3 - 454 Kg./m3 de cemento
    let dosificacionMortero = 454;
    let cementoBolsas = dosificacionMortero * juntaTotal * desperdicio / cemento;

    // Redondeo de valores
    resultadoPared = Math.round(resultadoPared);
    ladrillosCantidad = Math.round(ladrillosCantidad);
    cementoBolsas = Math.ceil(cementoBolsas);

    // Precio subtotal
    let subtotal = ladrillosCantidad * precioLadrillo;

    // Cementos total
    let cementoTotal = cementoPrecio * cementoBolsas;

    // Calculo total en $
    let totalFinal = subtotal + cementoTotal;
    
    let resultadoCalculo = `<div class="resultado-final">
                            <h4>- RESULTADOS -</h4>
                            <p>Producto: <strong>${nombreLadrillo}</strong></p>
                            <p>Superficie de pared: <strong>${resultadoPared} m<sup>2</sup></strong></p>
                            <p>Cantidad: <strong>${ladrillosCantidad} unid.</strong></p>
                            <p>Precio por unidad: <strong>$ ${precioLadrillo} c/u.</strong></p>
                            <p>Ladrillos (subtotal): <strong>$ ${subtotal}</strong></p>
                            <p>Marca de cemento: <strong>${bolsaCemento}</strong></p>
                            <p>Cantidad de bolsas: <strong>${cementoBolsas} unid. de 50 kg.</strong></p>
                            <p>Precio de bolsa: <strong>$ ${cementoPrecio} c/u.</strong></p>
                            <p>Cemento (subtotal): <strong>$ ${cementoTotal}</strong></p>
                            <hr>
                            <p class="total-final">TOTAL: <strong>$ ${totalFinal}</strong></p>
                            <button class="agregar-carrito" id="agregarAlCarrito">Agregar al Carrito</button>
                            </div>`;

    const resultado = document.getElementById('resultado');
    resultado.innerHTML = resultadoCalculo;

    tryAnalisis(longitud, altura);
}

// Boton Calcular
let botonCalcular = document.getElementById('botonCalcular');
botonCalcular.addEventListener('click', () => {
    calcularLadrillos();
});

// Boton Reset
let botonReset = document.getElementById('botonReset');
botonReset.addEventListener('click', () => {
    let resultadoFinal = document.querySelector('.resultado-final');
    if (resultadoFinal === null) {
        } else {
        resultadoFinal.remove();
    }
    let mensajeAnalisis = document.querySelector('#analisis-resultado');
    mensajeAnalisis.innerText = '';
    mensajeAnalisis.classList.remove('mensaje','error','correcto','ocultar-anim');
});


// Footer
let footer = document.createElement('footer');
footer.innerHTML = '<p>©Todos los derechos reservados.</p>';
document.body.appendChild(footer);