import mongoose from 'mongoose'
const Schema = mongoose.Schema

let csvuaSchema = new Schema({
  usuario: { type: 'String' },
  georeferencia: { type: 'String'},
  tipo: { type: 'String' },
  concentrador: { type: 'Number' },
  caja: { type: 'Number' },
  colector: { type: 'Number' },
  medidor: { type: 'Number' },
  homedisplay: { type: 'Number' },
  lecturas: [{ type: Schema.ObjectId, ref: 'csvlec' }]
})

let csvua = mongoose.model('csvua', csvuaSchema)

export default csvua