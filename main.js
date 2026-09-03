// PRE-ENTREGA 5 - SPORT SHOP ONLINE
// Integración de Arrays + Objetos + Clases


// 1. CREACIÓN DE LA CLASE PRODUCTO

class Producto {
  constructor(id, nombre, precio, stock) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
  }

  mostrarInformacion() {
    console.log(
      "Producto: " + this.nombre +
      " | Precio: $" + this.precio +
      " | Stock: " + this.stock
    );
  }

  vender(cantidad) {
    if (cantidad > 0 && cantidad <= this.stock) {
      this.stock = this.stock - cantidad;

      console.log(
        "Se vendieron " +
        cantidad +
        " unidad(es) de " +
        this.nombre
      );

      alert(
        "Compra realizada correctamente.\n" +
        "Producto: " + this.nombre +
        "\nCantidad: " + cantidad
      );

    } else {
      console.log("Stock insuficiente de " + this.nombre);

      alert("No hay stock suficiente.");
    }
  }

  aplicarDescuento(porcentaje) {
    let descuento = this.precio * porcentaje / 100;

    this.precio = this.precio - descuento;

    console.log(
      "Se aplicó un descuento del " +
      porcentaje +
      "% a " +
      this.nombre
    );
  }
}


// 2. INSTANCIACIÓN DE OBJETOS

const producto1 = new Producto(
  1,
  "Camiseta de Boca",
  50000,
  10
);

const producto2 = new Producto(
  2,
  "Camiseta de River",
  55000,
  8
);

const producto3 = new Producto(
  3,
  "Camiseta de Racing",
  48000,
  6
);

const producto4 = new Producto(
  4,
  "Camiseta de Independiente",
  47000,
  7
);

const producto5 = new Producto(
  5,
  "Camiseta de San Lorenzo",
  45000,
  9
);


// 3. ARRAY DE PRODUCTOS

let productos = [
  producto1,
  producto2,
  producto3,
  producto4,
  producto5
];

console.log("Lista inicial de productos:");
console.log(productos);


// 4. MANIPULACIÓN DEL ARRAY

const producto6 = new Producto(
  6,
  "Camiseta de Estudiantes",
  46000,
  5
);

// Agregar al final
productos.push(producto6);


// Agregar al principio
const producto7 = new Producto(
  7,
  "Camiseta de Vélez",
  44000,
  4
);

productos.unshift(producto7);


// Eliminar el último producto
let productoEliminado = productos.pop();

console.log(
  "Se ha eliminado el producto: " +
  productoEliminado.nombre
);


// 5. FUNCIÓN PARA MOSTRAR PRODUCTOS

function mostrarProductos(lista) {

  console.log("----- PRODUCTOS DISPONIBLES -----");

  for (let producto of lista) {
    producto.mostrarInformacion();
  }
}


// Mostrar productos
mostrarProductos(productos);


// 6. BÚSQUEDA Y VALIDACIÓN

let nombresProductos = [];

for (let producto of productos) {
  nombresProductos.push(producto.nombre);
}


let productoBuscado = prompt(
  "Ingrese el nombre del producto que desea buscar:"
);


if (productoBuscado !== null) {

  productoBuscado = productoBuscado.trim();

  if (nombresProductos.includes(productoBuscado)) {

    let posicion = nombresProductos.indexOf(productoBuscado);

    alert(
      "El producto " +
      productoBuscado +
      " se encuentra en el índice " +
      posicion
    );

  } else {

    alert(
      "El producto " +
      productoBuscado +
      " no se encuentra en la lista."
    );

  }
}


// 7. MODIFICACIÓN POR ÍNDICE CON SPLICE

const nuevoProducto = new Producto(
  8,
  "Camiseta de Rosario Central",
  49000,
  6
);

productos.splice(
  2,
  1,
  nuevoProducto
);

console.log("Producto del índice 2 modificado.");


// 8. SIMULADOR DE COMPRA

let nombreCompra = prompt(
  "Ingrese el nombre del producto que desea comprar:"
);

let cantidadCompra = Number(
  prompt("Ingrese la cantidad que desea comprar:")
);


let encontrado = false;

for (let producto of productos) {

  if (
    nombreCompra !== null &&
    producto.nombre.toLowerCase() ===
    nombreCompra.trim().toLowerCase()
  ) {

    producto.vender(cantidadCompra);

    encontrado = true;

    break;
  }
}


if (!encontrado) {
  alert("El producto ingresado no existe.");
}


// 9. APLICAR DESCUENTO

producto1.aplicarDescuento(10);


// 10. MOSTRAR ESTADO FINAL

console.log("----- ESTADO FINAL DE LA TIENDA -----");

mostrarProductos(productos);