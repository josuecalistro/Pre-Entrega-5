document.addEventListener("DOMContentLoaded", function () {

    // ========================================
    // CLASE PRODUCTO
    // ========================================

    class Producto {

        constructor(id, nombre, equipo, precio, stock, imagen) {
            this.id = id;
            this.nombre = nombre;
            this.equipo = equipo;
            this.precio = precio;
            this.stock = stock;
            this.imagen = imagen;
        }

        vender(cantidad) {

            if (cantidad > 0 && cantidad <= this.stock) {

                this.stock -= cantidad;

                return true;
            }

            return false;
        }

        mostrarInformacion() {

            console.log(
                "Producto: " + this.nombre +
                " | Equipo: " + this.equipo +
                " | Precio: $" + this.precio +
                " | Stock: " + this.stock
            );
        }
    }


    // ========================================
    // PRODUCTOS
    // ========================================

    const producto1 = new Producto(
        1,
        "Camiseta Titular Boca Juniors",
        "Boca",
        89999,
        10,
        "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=700&q=80"
    );


    const producto2 = new Producto(
        2,
        "Camiseta Titular River Plate",
        "River",
        97999,
        12,
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=700&q=80"
    );


    const producto3 = new Producto(
        3,
        "Camiseta Titular Racing Club",
        "Racing",
        84999,
        8,
        "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=700&q=80"
    );


    const producto4 = new Producto(
        4,
        "Camiseta Titular Independiente",
        "Independiente",
        82999,
        7,
        "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=700&q=80"
    );


    const producto5 = new Producto(
        5,
        "Camiseta Titular San Lorenzo",
        "San Lorenzo",
        79999,
        9,
        "https://images.unsplash.com/photo-1577212017184-80cc0da11082?auto=format&fit=crop&w=700&q=80"
    );


    const producto6 = new Producto(
        6,
        "Camiseta Alternativa Boca Juniors",
        "Boca",
        94999,
        6,
        "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?auto=format&fit=crop&w=700&q=80"
    );


    const productos = [
        producto1,
        producto2,
        producto3,
        producto4,
        producto5,
        producto6
    ];


    // ========================================
    // CARRITO
    // ========================================

    let carrito = [];


    // ========================================
    // ELEMENTOS HTML
    // ========================================

    const contenedorProductos =
        document.getElementById("contenedorProductos");

    const productosCarrito =
        document.getElementById("productosCarrito");

    const contadorCarrito =
        document.getElementById("contadorCarrito");

    const totalCarrito =
        document.getElementById("totalCarrito");

    const botonCarrito =
        document.getElementById("botonCarrito");

    const cerrarCarrito =
        document.getElementById("cerrarCarrito");

    const carritoHTML =
        document.getElementById("carrito");

    const fondoCarrito =
        document.getElementById("fondoCarrito");

    const botonVaciar =
        document.getElementById("botonVaciar");

    const botonComprar =
        document.getElementById("botonComprar");

    const buscador =
        document.getElementById("buscador");

    const filtroEquipo =
        document.getElementById("filtroEquipo");

    const mensaje =
        document.getElementById("mensaje");


    // ========================================
    // VERIFICACIÓN
    // ========================================

    if (!contenedorProductos) {

        console.error(
            "ERROR: No existe #contenedorProductos en el HTML."
        );

        return;
    }


    // ========================================
    // PRECIO ARGENTINO
    // ========================================

    function formatearPrecio(precio) {

        return "$" + precio.toLocaleString("es-AR");
    }


    // ========================================
    // MOSTRAR PRODUCTOS
    // ========================================

    function mostrarProductos(lista) {

        contenedorProductos.innerHTML = "";


        if (lista.length === 0) {

            contenedorProductos.innerHTML = `
                <p class="sin-productos">
                    No se encontraron productos.
                </p>
            `;

            return;
        }


        for (let producto of lista) {

            const tarjeta =
                document.createElement("article");


            tarjeta.classList.add(
                "tarjeta-producto"
            );


            tarjeta.innerHTML = `

                <div class="imagen-producto">

                    <span class="stock">
                        Stock: ${producto.stock}
                    </span>

                    <img
                        src="${producto.imagen}"
                        alt="${producto.nombre}"
                    >

                </div>


                <div class="info-producto">

                    <span class="equipo-producto">
                        ${producto.equipo}
                    </span>


                    <h3>
                        ${producto.nombre}
                    </h3>


                    <span class="precio">
                        ${formatearPrecio(producto.precio)}
                    </span>


                    <button
                        class="boton-agregar"
                        data-id="${producto.id}"
                    >
                        Agregar al carrito 🛒
                    </button>

                </div>

            `;


            contenedorProductos.appendChild(
                tarjeta
            );
        }


        agregarEventosProductos();
    }


    // ========================================
    // BOTONES PRODUCTOS
    // ========================================

    function agregarEventosProductos() {

        const botones =
            document.querySelectorAll(
                ".boton-agregar"
            );


        for (let boton of botones) {

            boton.addEventListener(
                "click",
                function () {

                    const id =
                        Number(
                            boton.dataset.id
                        );


                    agregarAlCarrito(id);
                }
            );
        }
    }


    // ========================================
    // AGREGAR PRODUCTO
    // ========================================

    function agregarAlCarrito(id) {

        const producto =
            productos.find(
                producto =>
                    producto.id === id
            );


        if (!producto) {
            return;
        }


        const itemExistente =
            carrito.find(
                item =>
                    item.id === id
            );


        if (itemExistente) {

            if (
                itemExistente.cantidad
                < producto.stock
            ) {

                itemExistente.cantidad++;

                mostrarMensaje(
                    "Se agregó otra unidad."
                );

            } else {

                mostrarMensaje(
                    "No hay más stock disponible."
                );

                return;
            }

        } else {

            carrito.push({

                id: producto.id,

                nombre: producto.nombre,

                equipo: producto.equipo,

                precio: producto.precio,

                imagen: producto.imagen,

                cantidad: 1

            });


            mostrarMensaje(
                producto.nombre +
                " agregado al carrito"
            );
        }


        actualizarCarrito();
    }


    // ========================================
    // MOSTRAR CARRITO
    // ========================================

    function actualizarCarrito() {

        productosCarrito.innerHTML = "";


        if (carrito.length === 0) {

            productosCarrito.innerHTML = `

                <div class="carrito-vacio">

                    <span>🛒</span>

                    <h3>
                        Tu carrito está vacío
                    </h3>

                    <p>
                        Agregá productos para comenzar.
                    </p>

                </div>

            `;

        } else {

            for (let item of carrito) {

                const div =
                    document.createElement(
                        "div"
                    );


                div.classList.add(
                    "item-carrito"
                );


                div.innerHTML = `

                    <img
                        src="${item.imagen}"
                        alt="${item.nombre}"
                    >


                    <div>

                        <h4>
                            ${item.nombre}
                        </h4>

                        <p>
                            ${formatearPrecio(item.precio)}
                        </p>


                        <div class="controles-cantidad">

                            <button
                                class="restar"
                                data-id="${item.id}"
                            >
                                -
                            </button>


                            <span>
                                ${item.cantidad}
                            </span>


                            <button
                                class="sumar"
                                data-id="${item.id}"
                            >
                                +
                            </button>

                        </div>

                    </div>


                    <button
                        class="eliminar-item"
                        data-id="${item.id}"
                    >
                        ✕
                    </button>

                `;


                productosCarrito.appendChild(
                    div
                );
            }
        }


        agregarEventosCarrito();

        actualizarTotales();

        guardarCarrito();
    }


    // ========================================
    // EVENTOS DEL CARRITO
    // ========================================

    function agregarEventosCarrito() {

        const botonesSumar =
            document.querySelectorAll(
                ".sumar"
            );


        const botonesRestar =
            document.querySelectorAll(
                ".restar"
            );


        const botonesEliminar =
            document.querySelectorAll(
                ".eliminar-item"
            );


        for (let boton of botonesSumar) {

            boton.addEventListener(
                "click",
                function () {

                    sumarCantidad(
                        Number(
                            boton.dataset.id
                        )
                    );
                }
            );
        }


        for (let boton of botonesRestar) {

            boton.addEventListener(
                "click",
                function () {

                    restarCantidad(
                        Number(
                            boton.dataset.id
                        )
                    );
                }
            );
        }


        for (let boton of botonesEliminar) {

            boton.addEventListener(
                "click",
                function () {

                    eliminarProducto(
                        Number(
                            boton.dataset.id
                        )
                    );
                }
            );
        }
    }


    // ========================================
    // SUMAR CANTIDAD
    // ========================================

    function sumarCantidad(id) {

        const item =
            carrito.find(
                item =>
                    item.id === id
            );


        const producto =
            productos.find(
                producto =>
                    producto.id === id
            );


        if (!item || !producto) {
            return;
        }


        if (
            item.cantidad <
            producto.stock
        ) {

            item.cantidad++;

            actualizarCarrito();

        } else {

            mostrarMensaje(
                "Llegaste al límite de stock."
            );
        }
    }


    // ========================================
    // RESTAR CANTIDAD
    // ========================================

    function restarCantidad(id) {

        const item =
            carrito.find(
                item =>
                    item.id === id
            );


        if (!item) {
            return;
        }


        if (item.cantidad > 1) {

            item.cantidad--;

        } else {

            eliminarProducto(id);

            return;
        }


        actualizarCarrito();
    }


    // ========================================
    // ELIMINAR PRODUCTO
    // ========================================

    function eliminarProducto(id) {

        const indice =
            carrito.findIndex(
                item =>
                    item.id === id
            );


        if (indice !== -1) {

            carrito.splice(
                indice,
                1
            );
        }


        actualizarCarrito();
    }


    // ========================================
    // TOTAL
    // ========================================

    function actualizarTotales() {

        let total = 0;

        let cantidad = 0;


        for (let item of carrito) {

            total +=
                item.precio *
                item.cantidad;


            cantidad +=
                item.cantidad;
        }


        contadorCarrito.textContent =
            cantidad;


        totalCarrito.textContent =
            formatearPrecio(total);
    }


    // ========================================
    // GUARDAR LOCAL STORAGE
    // ========================================

    function guardarCarrito() {

        localStorage.setItem(

            "carritoSportShop",

            JSON.stringify(carrito)

        );
    }


    // ========================================
    // RECUPERAR LOCAL STORAGE
    // ========================================

    function cargarCarrito() {

        const guardado =
            localStorage.getItem(
                "carritoSportShop"
            );


        if (guardado) {

            try {

                carrito =
                    JSON.parse(guardado);

            } catch (error) {

                console.error(
                    "Error cargando carrito:",
                    error
                );


                carrito = [];
            }
        }


        actualizarCarrito();
    }


    // ========================================
    // VACIAR CARRITO
    // ========================================

    function vaciarCarrito() {

        if (carrito.length === 0) {

            mostrarMensaje(
                "El carrito está vacío."
            );

            return;
        }


        const confirmar =
            confirm(
                "¿Querés vaciar el carrito?"
            );


        if (confirmar) {

            carrito = [];

            actualizarCarrito();

            mostrarMensaje(
                "Carrito vaciado."
            );
        }
    }


    // ========================================
    // FINALIZAR COMPRA
    // ========================================

    function finalizarCompra() {

        if (carrito.length === 0) {

            mostrarMensaje(
                "Primero agregá algún producto."
            );

            return;
        }


        for (let item of carrito) {

            const producto =
                productos.find(
                    producto =>
                        producto.id === item.id
                );


            if (producto) {

                producto.vender(
                    item.cantidad
                );
            }
        }


        alert(
            "¡Compra realizada correctamente!\n" +
            "Gracias por comprar en Sport Shop."
        );


        carrito = [];


        actualizarCarrito();

        mostrarProductos(
            productos
        );


        cerrarMenuCarrito();
    }


    // ========================================
    // FILTRAR
    // ========================================

    function filtrarProductos() {

        const texto =
            buscador.value
                .toLowerCase()
                .trim();


        const equipo =
            filtroEquipo.value;


        const resultado =
            productos.filter(
                producto => {

                    const coincideTexto =

                        producto.nombre
                            .toLowerCase()
                            .includes(texto)

                        ||

                        producto.equipo
                            .toLowerCase()
                            .includes(texto);


                    const coincideEquipo =

                        equipo === "Todos"

                        ||

                        producto.equipo === equipo;


                    return (
                        coincideTexto &&
                        coincideEquipo
                    );
                }
            );


        mostrarProductos(
            resultado
        );
    }


    // ========================================
    // ABRIR CARRITO
    // ========================================

    function abrirCarrito() {

        carritoHTML.classList.add(
            "activo"
        );


        fondoCarrito.classList.add(
            "activo"
        );
    }


    // ========================================
    // CERRAR CARRITO
    // ========================================

    function cerrarMenuCarrito() {

        carritoHTML.classList.remove(
            "activo"
        );


        fondoCarrito.classList.remove(
            "activo"
        );
    }


    // ========================================
    // MENSAJES
    // ========================================

    function mostrarMensaje(texto) {

        mensaje.textContent =
            texto;


        mensaje.classList.add(
            "activo"
        );


        setTimeout(
            function () {

                mensaje.classList.remove(
                    "activo"
                );

            },

            2000
        );
    }


    // ========================================
    // EVENTOS
    // ========================================

    botonCarrito.addEventListener(
        "click",
        abrirCarrito
    );


    cerrarCarrito.addEventListener(
        "click",
        cerrarMenuCarrito
    );


    fondoCarrito.addEventListener(
        "click",
        cerrarMenuCarrito
    );


    botonVaciar.addEventListener(
        "click",
        vaciarCarrito
    );


    botonComprar.addEventListener(
        "click",
        finalizarCompra
    );


    buscador.addEventListener(
        "input",
        filtrarProductos
    );


    filtroEquipo.addEventListener(
        "change",
        filtrarProductos
    );


    // ========================================
    // PRE-ENTREGA ARRAYS
    // ========================================

    const equipos = [
        "Boca",
        "River",
        "Racing",
        "Independiente",
        "San Lorenzo"
    ];


    console.log(
        "¿Existe Boca?",
        equipos.includes("Boca")
    );


    console.log(
        "Índice de River:",
        equipos.indexOf("River")
    );


    for (let producto of productos) {

        producto.mostrarInformacion();
    }


    // ========================================
    // INICIAR
    // ========================================

    mostrarProductos(productos);

    cargarCarrito();

});