// let cartStorage = localStorage.getItem('cartProductos');
// cartStorage = JSON.parse(cartStorage);

// let cartContainer = document.getElementById('cart-section');

// function renderCarrito(cartItems) {
//     cartItems.forEach(producto => {
//         const cart = document.createElement('div');
//         cart.innerHTML = `<h3>${producto.nombre}</h3>
//                           <p>${producto.precio}</p>`
//         cartContainer.appendChild(cart);
//     });
// }
// renderCarrito();


// let comision = localStorage.getItem('comision');
// console.log(comision);
// let saludo = localStorage.getItem('saludo');
// console.log(saludo);
// let aprobado = localStorage.getItem('aprobado');
// console.log(aprobado);


for (let i = 0; i < localStorage.length; i++) {
    let clave = localStorage.key(i)
    console.log('Clave: ', clave, 'valor: ', localStorage.getItem(clave))
}


// let cartSection = document.getElementById('cart-section');
// cartSection.innerHTML = `<p>Comision: ${comision}</p>
//                          <p>Saludo: ${saludo}</p>
//                          <p>Aprobado: ${aprobado}</p>
//                          <button id="btnBorrarProducto">Borrar</button>
//                          <button id="btnBorrarTodo">Borrar todo</button>`;

// // Boton Borrar Producto
// let btnBorrarProducto = document.getElementById('btnBorrarProducto');
// btnBorrarProducto.addEventListener('click', () => {
//     localStorage.removeItem('aprobado');
// });

// // Boton Borrar Todo
// let btnBorrarTodo = document.getElementById('btnBorrarTodo');
// btnBorrarTodo.addEventListener('click', () => {
//     localStorage.clear();
// });


// Footer
let footer = document.createElement('footer');
footer.innerHTML = '<p>©Todos los derechos reservados.</p>';
document.body.appendChild(footer);