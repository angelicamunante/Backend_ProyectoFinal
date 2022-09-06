const express = require('express');
const routerProductos = express.Router();
const Contenedor = require('./contenedorProductos');
const claseProductos = new Contenedor('productos.txt');
const validarAdmin = require('./middlewares/validarAdmin');

routerProductos.get('/:id' , async(req,res) => {
    const id = Number(req.params.id);
    const productos =  await claseProductos.getAllId(id);
    res.send(productos);
});

routerProductos.post('/' ,validarAdmin,async(req,res) => {
    const save = await claseProductos.save(req.body);
    res.send({productoAgregado: save});
})

routerProductos.put('/:id' ,validarAdmin,async(req,res) => {
    const id = Number(req.params.id);
    const update = await claseProductos.updateById(req.body,id);
    res.send(update);
})

routerProductos.delete('/:id' ,validarAdmin,async(req,res) => {
    const id = Number(req.params.id);
    const deleteProduct = await claseProductos.deleteById(id);
    res.send(deleteProduct);
})
module.exports = routerProductos;