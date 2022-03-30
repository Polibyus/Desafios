const fs = require('fs');

class Contenedor {
    constructor (archivo) {
        this.archivo = archivo;
    }
    
    async save(title, price) {
        try {
            const data = await fs.promises.readFile(this.archivo, 'utf-8')
            const json = JSON.parse(data.toString("utf-8"));
            const obj = {title: title, price: price, id: data.length};
            json.push(obj);
            console.log(`El id del producto es ${data.length}`);
            await fs.promises.writeFile(this.archivo, JSON.stringify(json, null, "\t"));
        }
        catch(err) {
            console.log('Hubo un error');
        }

    }
}
const productos = new Contenedor('./items.txt');

productos.save('regla', 28);


// save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
// getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
// getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
// deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
// deleteAll(): void - Elimina todos los objetos presentes en el archivo.
