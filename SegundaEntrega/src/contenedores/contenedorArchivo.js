const fs = require("fs");

class ContenedorArchivo {
    constructor(txt) {
        this.txt = txt;
    }

    guardarArchivo(data) {
        fs.writeFileSync(this.txt, JSON.stringify(data, null, "\t"));
    }

    getContenido() {
        let contenido = [];
        try {
            const data = fs.readFileSync(this.txt, 'utf-8');
            contenido = JSON.parse(data.toString("utf-8"));
        }
        catch (err) {
            console.log(`Hubo un error en contenedor = ${err} `);
        }
        return contenido;
    }

    getByID(id) {
            const data = this.getContenido();
            const obj = data.find(e => e.id === id);
            return { obj: obj ? obj : { error: 'producto no encontrado' } };
    }
    deleteById(id) {
        let respuesta = '';
        try {
            const data = this.getContenido();
            const indexObj = data.findIndex(e => e.id === id);
            if (data[indexObj]) {
                data.splice(indexObj, 1);
                this.guardarArchivo(data);
                respuesta = 'Producto Eliminado'
                return respuesta;
            } else {
                respuesta = 'Producto no encontrado';
                return respuesta;
            }
        }
        catch (err) {
            console.log(`Hubo un error = ${err} `);
        }
    }
}

module.exports = { ContenedorArchivo }