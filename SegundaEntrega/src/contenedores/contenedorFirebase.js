let admin = require("firebase-admin");

let serviceAccount = require('../../db/ecommerce-57266-firebase-adminsdk-2hhgl-c391669b21.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore()

class ContainerFirestore {np
    constructor(collection){
      this.collection = db.collection(collection)
      console.log(`Base conectada con la collection ${collection}`)
    }
  
    async saveProducto(document, id){
      let doc = this.collection.doc(`${id}`)
      let item = await doc.create(document)
      return item
    }
  
    async getAll(){
      let result = await this.collection.get()
      result = result.docs.map(doc => ({ 
        id: doc.id,
        data: doc.data()
      }))
      return result
    }
  
    async getByID(id){
      let result = await this.collection.get()
      result = result.docs.map(doc => ({ 
        id: doc.id,
        data: doc.data()
      }))
      let item = result.find(elem => elem.id == id)
      return item
    }
  
    async deleteById(id){
      let doc = this.collection.doc(`${id}`)
      let item = doc.delete()
      return ({ status: 'Deleted' })
    }
    
    async update(content, id){
      let doc = this.collection.doc(`${id}`)
      let item = await doc.update(content)
      return item
    }
  
  }
  
  module.exports = { ContainerFirestore }