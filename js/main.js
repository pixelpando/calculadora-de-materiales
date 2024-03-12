console.warn("Los datos ofrecidos son de referencia y pueden no ser exactos.\n Los cálculos tienen incluido un 5% de desperdicio.")

//Bolsa de 50 kg.
let cemento = 50;

//Coeficiente de desperdicio
let desperdicio = 1.05;

//Espesor default del mortero en mts.
let junta = 0.015;

const ladrillos = ['Ladrillos Comunes 5x13x25', 'Ladrillos Huecos 6 agujeros 12x18x25', 'Ladrillos Huecos 9 agujeros 18x18x25']

//Medidas default ladrillo 1 común en mts.
// let altoLadrillo = 0.05;
// let anchoLadrillo = 0.13;
// let largoLadrillo = 0.25;

//Funciones
function calcularLadrillos(altoLadrillo, anchoLadrillo, largoLadrillo, ladrilloNombre) {
    let longitudPared = parseFloat(prompt('Longitud de la pared en mts. (Ej: 4.2):'));
    let alturaPared = parseFloat(prompt('Altura de la pared en mts. (Ej: 2.5):'));
    
    let resultadoPared = Math.round(longitudPared * alturaPared);
    console.log(resultadoPared);

    let ladrilloMortero = ((largoLadrillo + junta) * (altoLadrillo + junta));
    console.log(ladrilloMortero);

    let ladrillosCantidad = Math.round(resultadoPared / ladrilloMortero * desperdicio);
    console.log(ladrillosCantidad);

    let cementoBolsas = Math.round((ladrillosCantidad / 3) / cemento);
    
    if (cementoBolsas > 0, cementoBolsas <= 1.4999) {
        cementoBolsas = 1;
        txtBolsa = 'bolsa';
    } else {
        txtBolsa = 'bolsas';
    }
    console.log(cementoBolsas);
    
    alert('La superficie de su pared será de apróximadamente '+resultadoPared+' m2. \nNecesitará: \n- '+ladrillosCantidad+' '+ladrilloNombre+' para construir toda la pared.\n- '+cementoBolsas+' '+txtBolsa+' de cemento de 50 kg.');
}


const textoPrompt = 'Que tipo de ladrillos desea llevar: \n(1) '+ladrillos[0]+' \n(2) '+ladrillos[1]+' \n(3) '+ladrillos[2]+' \n(4) Salir';
let productoElegido = parseInt(prompt(textoPrompt));

while (productoElegido !== 4) {
    switch(productoElegido) {
        case 1:
            calcularLadrillos(0.05, 0.13, 0.25, ladrillos[0]);
            break;
        case 2:
            calcularLadrillos(0.12, 0.18, 0.25, ladrillos[1]);
            break;
        case 3:
            calcularLadrillos(0.18, 0.18, 0.25, ladrillos[2]);
            break;
        default:
            alert('Selecciones una opción del (1) al (3). \nPara salir elija el (4).');
    }

    productoElegido = parseInt(prompt(textoPrompt));
}

alert('¡Gracias por usar nuestros servicios!');