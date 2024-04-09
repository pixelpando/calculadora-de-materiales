//Bolsa de 50 kg.
let cemento = 50;

//Coeficiente de desperdicio (5%)
let desperdicio = 1.05;

//Espesor del mortero en mts.
let junta = 0.015;

const ladrillos = ['Ladrillos Comunes 5x13x25', 'Ladrillos Huecos 6 agujeros 12x18x25', 'Ladrillos Huecos 9 agujeros 18x18x25']

//Medidas de referencia ladrillo común en mts.
// let altoLadrillo = 0.05;
// let anchoLadrillo = 0.13;
// let largoLadrillo = 0.25;

//Funciones
function calcularLadrillos(altoLadrillo, anchoLadrillo, largoLadrillo, ladrilloNombre) {
    let longitudPared = parseFloat(prompt('Longitud de todas las paredes en mts. (Ej: 4.2):'));
    let alturaPared = parseFloat(prompt('Altura de paredes en mts. (Ej: 2.5):'));
    console.log('********** Desglose de valores **************');

    let resultadoPared = longitudPared * alturaPared;
    console.log('Pared: '+resultadoPared+ ' m2');

    let ladrilloMortero = ((largoLadrillo + junta) * (altoLadrillo + junta));
    console.log('Superficie del ladrillo: '+ladrilloMortero+ ' mts.');

    let ladrillosCantidad = resultadoPared / ladrilloMortero * desperdicio;
    console.log('Cantidad de ladrillos: '+ladrillosCantidad+' unid.');

    // let cementoBolsas = Math.round((ladrillosCantidad / 3) / cemento);
    let juntaSuperior = junta * largoLadrillo * anchoLadrillo;
    let juntaLateral = junta * altoLadrillo * anchoLadrillo;
    let juntaTotal = (juntaSuperior + juntaLateral) * ladrillosCantidad;
    console.log('Junta total: ' +juntaTotal+ ' m3');

    //Relacion 1:3 - 454 Kg./m3 de cemento
    let dosificacionMortero = 454;
    let cementoBolsas = dosificacionMortero * juntaTotal * desperdicio / cemento;
    console.log('Bolsas de cemento: ' +cementoBolsas+ ' unid.');
    
    if (cementoBolsas > 0, cementoBolsas <= 1) {
        // cementoBolsas = 1;
        txtBolsa = 'bolsa';
    } else {
        txtBolsa = 'bolsas';
    }

    //Redondeo de valores
    resultadoPared = Math.round(resultadoPared);
    ladrillosCantidad = Math.round(ladrillosCantidad);
    cementoBolsas = Math.ceil(cementoBolsas);
    
    alert('La superficie de su pared será de apróximadamente '+resultadoPared+' m2. \nNecesitará: \n- '+ladrillosCantidad+' '+ladrilloNombre+'.\n- '+cementoBolsas+' '+txtBolsa+' de cemento de 50 kg.');
}

const cemento1 = {
    marca: 'Loma Negra',
    tipo: 'Cemento Portland',
    presentacion: 'Bolsa de 50 kg.'
}

const cemento2 = {
    marca: 'Loma Negra',
    tipo: 'Cemento de Albañileria',
    presentacion: 'Bolsa de 40 kg.'
}

const cemento3 = {
    marca: 'Avellaneda',
    tipo: 'Cemento Portland',
    presentacion: 'Bolsa de 50 kg.'
}

const verCementos = () => {
    const bolsasCemento = [cemento1, cemento2, cemento3];
    console.log(bolsasCemento);
    for (const bolsaCemento of bolsasCemento) {
        console.table(bolsaCemento)
    }
}

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


let footer = document.createElement('footer');
footer.innerHTML = '<p>©Todos los derechos reservados.</p>';
document.body.appendChild(footer);

const botonCerrar = document.getElementById('cerrar');
const mensaje = document.getElementById('msg');

botonCerrar.addEventListener('click', () => {
    mensaje.className = 'ocultar';
    localStorage.setItem('msgAtencion', 'ocultar')
});

document.addEventListener('DOMContentLoaded', () => {
    const msgAtencion = localStorage.getItem('msgAtencion');
    if (msgAtencion === 'ocultar') {
        mensaje.className = 'ocultar';
    }
});

localStorage.removeItem('msgAtencion'); //Para que se vuelva a ver el mensaje
