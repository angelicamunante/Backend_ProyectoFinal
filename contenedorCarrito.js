const fs = require('fs');

const checkFile = async (nombreArchivo) => {
    const stats = fs.existsSync(nombreArchivo);

    if (stats == false) {
        try {
            await fs.promises.writeFile(nombreArchivo, "[]");
        } catch (error) {
            throw error;
        }
    }
}

class ContenedorCarrito{
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    };
    async saveCarrito(objeto) {
        try {
            await checkFile(this.nombreArchivo);
            let contenido = JSON.parse(await fs.promises.readFile(this.nombreArchivo));
            const longitud = contenido.length;
            if(longitud == 0){
                objeto.id = 1;
            }else{
                objeto.id = contenido[longitud - 1].id + 1;
            }
            objeto.productos = [];
            objeto.timestapm = Date.now();
            contenido.push(objeto);
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(contenido));
            return objeto.id;
        } catch (error) {
            throw error;
        }
    }

    async saveProductoCarrito(idCarrito,producto){
        await checkFile(this.nombreArchivo);
        let contenido = JSON.parse(await fs.promises.readFile(this.nombreArchivo));
        const carrito = contenido.find((x) => x.id == idCarrito);
        carrito.productos.push(producto);
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(contenido));
        return producto;
    }

    async deleteCarritoById(id) {
        await checkFile(this.nombreArchivo);
        let contenido = JSON.parse(await fs.promises.readFile(this.nombreArchivo));
        const eliminarCarrito = contenido.filter((x) => x.id !== id);
        contenido = eliminarCarrito;
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(contenido));
         return 'Carrito borrado';
    }

    async getId(id) {
        try {
                await checkFile(this.nombreArchivo);
                let array = JSON.parse(await fs.promises.readFile(this.nombreArchivo));
                array = array.filter((x) => {
                    return x.id == id;
                });
                return array[0].productos
        } catch (error) {
            throw error;
            return "[]";
        }

    }

    async deleteProductoById(idCarrito,idProducto) {
        await checkFile(this.nombreArchivo);
        let contenido = JSON.parse(await fs.promises.readFile(this.nombreArchivo));
        const carrito = contenido.find((x) => x.id == idCarrito);
        const eliminarProducto = carrito.productos.filter((x) => x.id !== idProducto);
        carrito.productos = eliminarProducto;
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(contenido));
        return 'Producto borrado';      
    }
}
module.exports = ContenedorCarrito;