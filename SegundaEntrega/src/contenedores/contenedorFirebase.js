let admin = require('firebase-admin');

const firebaseConfig = {
  apiKey: "AIzaSyC5alOpNcsZ9qxmu5kTrUwsr08qjcmb5Bc",
  authDomain: "shop-of-roll.firebaseapp.com",
  projectId: "shop-of-roll",
  storageBucket: "shop-of-roll.appspot.com",
  messagingSenderId: "470904819706",
  appId: "1:470904819706:web:2398fa79c4b66ebabede43",
  measurementId: "G-BLED7EHRP3"
};

admin.initializeApp(firebaseConfig);

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
  
    async getById(id){
      let result = await this.collection.get()
      result = result.docs.map(doc => ({ 
        id: doc.id,
        data: doc.data()
      }))
      let item = result.find(elem => elem.id == id)
      return item
    }
  
    async delete(id){
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