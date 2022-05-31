const { ContainerFirestore } = require('../../contenedores/contenedorFirebase')

class ProductosDaoFirestore extends ContainerFirestore {
  constructor(){
    super('productos')
    this.id = 0
    this.checkId()
  }

  async checkId(){
    let data = await this.getAll()
    if(data.length > 0) {
      this.id = parseInt(data[data.length - 1].id) + 1
    }
  }

  save(obj){
    if(obj){
      console.log(obj)
      this.saveProducto(obj, this.id)
      this.id++
      return obj
    } else {
      return 'Not saved'
    }
  }
}

module.exports = { ProductosDaoFirestore }