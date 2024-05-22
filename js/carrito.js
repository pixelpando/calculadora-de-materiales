// Recuperar info del localStorage
let cartStorage = localStorage.getItem('cartInfo');
cartStorage = JSON.parse(cartStorage);
console.log(cartStorage);

let cartSection = document.getElementById('cart-section');

function renderProductos() {
    const cardProduct = document.createElement('div');
    cardProduct.classList.add('card-producto')
    cardProduct.innerHTML = `<div>
                            <span>Producto</span>
                            <span>Cantidad</span>
                            <span>Precio (subtotal)</span>
                            <span>Modificar</span>
                            </div>
                             <div>
                             <span>${cartStorage[0]}</span>
                             <span>${cartStorage[1]} unid.</span>
                             <span>$ ${cartStorage[2]}</span>
                             <button id="btnBorrarProducto">Borrar</button>
                             </div>
                             <div>
                             <span>Cemento ${cartStorage[3]}</span>
                             <span>${cartStorage[4]} unid.</span>
                             <span>$ ${cartStorage[5]}</span>
                             <button id="btnBorrarProducto">Borrar</button>
                             </div>
                             <section>
                             <span class="total">Total: <strong>$ ${cartStorage[6]}</strong></span>
                             </section>
                             <section>
                             <button id="btnBorrarTodo">Borrar todo</button>
                             </section>`;
    cartSection.appendChild(cardProduct)
}

renderProductos();

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