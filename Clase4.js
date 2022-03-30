const fs = require('fs');

class Contenedor {
    constructor (archivo) {
        this.archivo = archivo;
    }
    // Devuelve el id, para tener diferentes id puse el length de data (da numeros segun los caracteres),
    // aunque podria poner el de json y me tiraria un id lineal (1, 2, 3, 4, etc)
    async save(title, price) {
        try {
            const data = await fs.promises.readFile(this.archivo, 'utf-8');
            const json = JSON.parse(data.toString("utf-8"));
            const obj = {title: title, price: price, id: data.length}; //<-- Aca pondria json.length
            json.push(obj);
            console.log(`El id del producto es ${data.length}`);
            await fs.promises.writeFile(this.archivo, JSON.stringify(json, null, "\t"));
        }
        catch(err) {
            console.log('Hubo un error');
        }

    }
    // Espero que este bien devolverlo por consola, como todavia no tenemos html,
    // no sabria como devolver el dato, pero la logica esta
    async getById(id) {
        try {
            const data = await fs.promises.readFile(this.archivo, 'utf-8');
            const json = JSON.parse(data.toString("utf-8"));
            const obj = json.find(e => e.id === id);
            console.log(obj);
        }
        catch(err) {
            console.log('Hubo un error');
        }
    }
    // Si le hacia un stringify quedaba feo, asi que lo tiro tal cual
    // a la consola porque todavia no manipulamos el dom 
    async getAll() {
        try {
            const data = await fs.promises.readFile(this.archivo, 'utf-8');
            console.log(data);
        }
        catch(err) {
            console.log('Hubo un error');
        }
    }
    // Busca el index primero del objeto y despues lo borra usando
    // el metodo splice de los array
    async deleteById(id) {
        try {
            const data = await fs.promises.readFile(this.archivo, 'utf-8');
            const json = JSON.parse(data.toString("utf-8"));
            const indexObj = json.findIndex(e => e.id === id);
            json.splice(indexObj, 1);
            await fs.promises.writeFile(this.archivo, JSON.stringify(json, null, "\t"));
        }
        catch(err) {
            console.log('Hubo un error');
        }
    }
    // Borra el archivo directamente
    async deleteAll() {
        try{
            await fs.promises.unlink(this.archivo);
            console.log("borrado exitoso");
        }
        catch(err){
            console.log('Hubo un error');
        }
    }
}

// Creo el contenedor pasandole unicamente el link al archivo txt (tiene que estar creado previamente)
const productos = new Contenedor('./items.txt');

// Los metodos estan probados uno por uno, para probar ir descomentandolo
// Ojo con el deleteAll xd
productos.save('regla', 28);
// productos.getById(161);
// productos.getAll();
// productos.deleteById(177);
// productos.deleteAll();

// Las consignas del desafio para no tener que tabear tanto

// save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
// getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
// getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
// deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
// deleteAll(): void - Elimina todos los objetos presentes en el archivo.
