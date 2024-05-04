// const textoPrompt = 'Que tipo de ladrillos desea llevar: \n(1) '+ladrillos[0]+' \n(2) '+ladrillos[1]+' \n(3) '+ladrillos[2]+' \n(4) Ver lista de Cementos \n(5) Salir';
// let productoElegido = parseInt(prompt(textoPrompt));

// while (productoElegido !== 5) {
//     switch(productoElegido) {
//         case 1:
//             calcularLadrillos(0.05, 0.13, 0.25, ladrillos[0]);
//             break;
//         case 2:
//             calcularLadrillos(0.12, 0.18, 0.25, ladrillos[1]);
//             break;
//         case 3:
//             calcularLadrillos(0.18, 0.18, 0.25, ladrillos[2]);
//             break;
//         case 4:
//             verCementos();
//             alert('El listado con los cementos se verá en consola.');
//             break;
//         default:
//             alert('Selecciones una opción del (1) al (4). \nPara salir elija el (5).');
//     }
//     productoElegido = parseInt(prompt(textoPrompt));
// }

// alert('¡Gracias por utilizar nuestros servicios!');



// **************** NUEVA VERSION ********************

let header = document.getElementsByTagName('header');
header[0].innerText = 'Calculadora de Materiales v0.45. Última Actualización: 03/05/2024';

let msgDesperdicio = document.getElementById('msg');
msgDesperdicio.innerHTML = '<i class="fa-solid fa-triangle-exclamation fa-lg"></i>Los datos son a modo de referencia y pueden no ser exactos. Los cálculos <strong>tienen incluido un 5% de desperdicio</strong>. <button id="cerrar" class="btn-cerrar">Cerrar</button>';


//Bolsa de 50 kg.
let cemento = 50;

//Coeficiente de desperdicio (5%)
let desperdicio = 1.05;

//Espesor del mortero en mts.
let junta = 0.015;

const ladrillos = ['Ladrillos Comunes 5x13x25', 'Ladrillos Huecos 6 agujeros 12x18x25', 'Ladrillos Huecos 9 agujeros 18x18x25']

//Medidas de referencia ladrillo común en mts.
let altoLadrillo = 0.05;
let anchoLadrillo = 0.13;
let largoLadrillo = 0.25;


const productos = [
    {
        id: 1,
        nombre: 'Ladrillo Común 5x13x25',
        precio: 112,
        imagen: './images/1-ladrillo-comun-5x13x25.jpg'
    },
    {
        id: 2,
        nombre: 'Ladrillo Hueco 6A 8x18x33',
        precio: 356,
        imagen: './images/2-ladrillo-hueco-6a-8x18x33.jpg'
    },
    {
        id: 3,
        nombre: 'Ladrillo Hueco 6A 12x18x33',
        precio: 446,
        imagen: './images/3-ladrillo-hueco-6a-12x18x33.jpg',
        checked: 'checked'
    },
    {
        id: 4,
        nombre: 'Ladrillo Hueco 9A 12x18x33',
        precio: 451,
        imagen: './images/4-ladrillo-hueco-9a-12x18x33.jpg'
    },
    {
        id: 5,
        nombre: 'Ladrillo Hueco 9A 18x18x33',
        precio: 685,
        imagen: './images/5-ladrillo-hueco-9a-18x18x33.jpg'
    },
    {
        id: 6,
        nombre: 'Ladrillo Portante 18x19x33',
        precio: 819,
        imagen: './images/6-ladrillo-portante-18x19x33.jpg'
    },
    {
        id: 7,
        nombre: 'Ladrillo Retak 10x25x50',
        precio: 2882,
        imagen: './images/7-ladrillo-retak-10x25x50.jpg'
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
// localStorage.removeItem('msgAtencion');

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


function getInputId () {
    let inputId = document.querySelectorAll('.productoSeleccion');
    inputId.forEach (clickRadio => {
        clickRadio.onClick = (e) => {
            const productId = e.currentTarget.id;
            const selectedProduct = productos.find(producto => producto.id == productId);
            cartProducts.push(selectedProduct);
            console.log(cartProducts);
        }
    })
}



//  *****************************************************************************

//Funcion principal
function calcularLadrillos() { 
    const longitud = document.getElementById('inputLongitud').value;
    const altura = document.getElementById('inputAltura').value;
    const bolsaCemento = document.getElementById('marcas-cemento').value;

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
                            <p>Superficie de pared: <strong>${resultadoPared} m<sup>2</sup></strong></p>
                            <p>Cantidad: <strong>${ladrillosCantidad} unid.</strong></p>
                            <p>Marca de cemento: <strong>${bolsaCemento}</strong></p>
                            <p>Cantidad de bolsas: <strong>${cementoBolsas} unid. de 50 kg.</strong></p>
                            <p></p></div>
                            `;

    const resultado = document.getElementById('resultado');
    resultado.innerHTML = resultadoCalculo;
}

let botonCalcular = document.getElementById('botonCalcular');
botonCalcular.addEventListener('click', function() {
    calcularLadrillos();
});


function borrarCalculo() {
    document.querySelector('.resultado-final').remove();
}

let botonBorrar = document.getElementById('botonBorrar');
botonBorrar.addEventListener('click', function() {
    borrarCalculo();
});

// ******************************************************************************


let footer = document.createElement('footer');
footer.innerHTML = '<p>©Todos los derechos reservados.</p>';
document.body.appendChild(footer);