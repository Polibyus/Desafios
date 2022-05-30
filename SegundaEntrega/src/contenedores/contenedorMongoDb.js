const MONGO_URI = 'mongodb+srv://Juanchi:prueba123@cluster0.zhljr.mongodb.net/?retryWrites=true&w=majority';
const mongoose = require('mongoose')

class ContainerMongo {
  constructor(model) {
    mongoose.connect(MONGO_URI, {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    }, () => console.log('Connected'))

    this.model = model;
  }

  async getAll(){
    return await this.model.find()
  }

}

module.exports = ContainerMongo;