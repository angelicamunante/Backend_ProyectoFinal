const express = require('express'); 
const routerCarrito = express.Router();
const validarAdmin = require('./middlewares/validarAdmin');
const Contenedor = require('./contenedorCarrito');
const claseCarrito = new Contenedor('carrito.txt');


routerCarrito.post('/', async(req,res) => {
    const crearCarrito = await claseCarrito.saveCarrito(req.body);
    res.send({id: crearCarrito});
});

routerCarrito.delete('/:id', async(req,res) => {
    const id = Number(req.params.id);
    const borrarCarrito = await claseCarrito.deleteCarritoById(id);
    res.send(borrarCarrito);
});

routerCarrito.get('/:id/productos', async(req,res) => {
    const id = Number(req.params.id);
    const listarProductos = await claseCarrito.getId(id);
    res.send({productos: listarProductos})
});

routerCarrito.post('/:id/productos', async(req,res) => {
    const idCarrito = Number(req.params.id);
    const guardarProducto = await claseCarrito.saveProductoCarrito(idCarrito,req.body);
    res.send({productoAgregado: guardarProducto});
});

routerCarrito.delete('/:id/productos/:id_prod', async(req,res) => {
    const idCarrito = Number(req.params.id);
    const idProducto = Number(req.params.id_prod);
    const eliminarProducto = await claseCarrito.deleteProductoById(idCarrito,idProducto);
    res.send(eliminarProducto);
});
module.exports = routerCarrito; 