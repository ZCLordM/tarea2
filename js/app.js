//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaPeliculas = document.querySelector('#lista-peliculas');
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners(){
    //Cuando agregas un pelicula presionando "Agregar al Carrito"
 listaPeliculas.addEventListener('click',agregarPelicula);

    //Elimina peliculas del carrito
    carrito.addEventListener('click',eliminarPelicula);


    //Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; //dejar el arreglo vacío
        limpiarHTML(); //eliminar el html
    })
}

//Funciones
function agregarPelicula(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const peliculaSeleccionada = e.target.parentElement.parentElement;
        leerDatospelicula(peliculaSeleccionada);
    }
    
}

//Eliminar una pelicula del carrito
function eliminarPelicula(e){
    if(e.target.classList.contains('borrar-pelicula')){
        const peliculaId = e.target.getAttribute('data-id');

        //Eliminar del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( pelicula => pelicula.id !== peliculaId);

        carritoHTML();
    }
}


//Lee el contenido del HTML al que le dimos click y extrae la informacion de la pelicula
function leerDatospelicula(pelicula){
    console.log(pelicula);

    //Crear un objeto con el contenido de la pelicula actual
    const infopelicula = {
        imagen: pelicula.querySelector('img').src,
        titulo: pelicula.querySelector('h4').textContent,
        precio: pelicula.querySelector('.precio span').textContent,
        id: pelicula.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisar si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( pelicula => pelicula.id === infopelicula.id);
    if(existe){
        //Actualizar la cantidad
        const peliculas = articulosCarrito.map( pelicula => {
            if(pelicula.id === infopelicula.id){
                pelicula.cantidad++;
                return pelicula; //retorna el objeto actualizado
            }else{
                return pelicula; //retorna los objetos que no son duplicados
            }
        });
        articulosCarrito = [...peliculas];
    }else{
        //Agregar elementos al arreglo del carrito
        articulosCarrito = [...articulosCarrito, infopelicula];
    }

    //console.log(articulosCarrito);

    carritoHTML();

}

//Mostrar el carrito de compras en el HTML
function carritoHTML(){

    //Limpiar el HTML
    limpiarHTML();

    //Recorrer el carrito y generar el HTML
    articulosCarrito.forEach( pelicula => {
        const { imagen, titulo, precio, cantidad, id } = pelicula;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100px">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-pelicula" data-id="${id}"> X </a>
            </td>
        
        `;

        //Agregar el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })

}

//Eliminar los peliculas del tbody
function limpiarHTML(){
    //contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}