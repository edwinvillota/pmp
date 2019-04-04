import mongoose from 'mongoose'
const Schema = mongoose.Schema

let csvuaSchema = new Schema({
  usuario: { type: 'String', unique: true, index: true},
  georeferencia: { type: 'String'},
  tipo: { type: 'String' },
  concentrador: { type: 'Number' },
  caja: { type: 'Number' },
  colector: { type: 'Number' },
  medidor: { type: 'Number' },
  homedisplay: { type: 'Number' },
  limite: { type: 'String' },
  servicio: { type: 'String' }
})


let csvua = mongoose.model('csvua', csvuaSchema)

export default csvua