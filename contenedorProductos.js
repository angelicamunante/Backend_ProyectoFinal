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

class ContenedorProductos {

    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    };

    async getAllId(id) {
        try {
            if(id > 0){
                await checkFile(this.nombreArchivo);
                let array = JSON.parse(await fs.promises.readFile(this.nombreArchivo));
                array = array.filter((x) => {
                    return x.id == id;
                });

                return array[0];
            }else if(id == 0){
                await checkFile(this.nombreArchivo);
                const contenidoJson = JSON.parse(await fs.promises.readFile(this.nombreArchivo));
                return contenidoJson;
            }

        } catch (error) {
            throw error;
            return "[]";
        }

    }

    async save(objeto) {
        try {
            await checkFile(this.nombreArchivo);
            let contenido = JSON.parse(await fs.promises.readFile(this.nombreArchivo));
            const longitud = contenido.length;
            if(longitud == 0){
                objeto.id = 1;
            }else{
                objeto.id = contenido[longitud - 1].id + 1;
            }
            objeto.timestapm = Date.now();
            contenido.push(objeto);
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(contenido));
            return objeto;
        } catch (error) {
            throw error;
        }
    }

    async updateById(producto,id) {
        await checkFile(this.nombreArchivo);
        let contenido = JSON.parse(await fs.promises.readFile(this.nombreArchivo));

        let index = contenido.findIndex((x) => x.id == id);

        if (index == -1) {
            return { error: 'El producto no existe' }
        } else {
            contenido[index].nombre = producto.nombre;
            contenido[index].descripcion = producto.descripcion;
            contenido[index].timestapm = Date.now()
            contenido[index].codigo = producto.codigo;
            contenido[index].foto = producto.foto;
            contenido[index].precio = producto.precio;
            contenido[index].stock = producto.stock;
        } 
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(contenido));
        return 'Producto Actualizado';
    }

    async deleteById(id) {
        await checkFile(this.nombreArchivo);
        let contenido = JSON.parse(await fs.promises.readFile(this.nombreArchivo));

        let index = contenido.findIndex((x) => x.id == id);
        if (index == -1) {
            return { error: 'El producto no existe' }
        } else {
            contenido.splice(id - 1, 1);
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(contenido));
            return 'Producto borrado';
        } 
    }
};
module.exports = ContenedorProductos;