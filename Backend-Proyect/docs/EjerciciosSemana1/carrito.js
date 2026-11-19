  // 1. Crear el carrito con 4 productos
const carrito = [
  { nombre: "Laptop", precio: 10 },
  { nombre: "Mouse", precio: 20 },
  { nombre: "Teclado", precio: 30 },
  { nombre: "Audífonos", precio: 40 },
];

// 2. Mostrar cuántos productos hay usando length
console.log("Cantidad de productos:", carrito.length);

// 3. Mostrar el primer y el último producto
const primerProducto = carrito[0];
const ultimoProducto = carrito[carrito.length - 1];

console.log("Primer producto:", primerProducto.nombre, "- S/", primerProducto.precio);
console.log("Último producto:", ultimoProducto.nombre, "- S/", ultimoProducto.precio);

// 4. Calcular el total usando un bucle for
let total = 0;
for (let i = 0; i < carrito.length; i++) {
  total += carrito[i].precio;
}
console.log("Total del carrito:", total);
