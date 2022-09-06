const express = require('express');
const app = express();
const routerProductos = require('./routerProductos');
const routerCarrito = require('./routerCarrito');
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);

app.listen(process.env.PORT || 8080, () => {
    console.log('Escuchando en el puerto 8080')
});