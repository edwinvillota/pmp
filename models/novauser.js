import mongoose, { mongo } from 'mongoose'
const Schema = mongoose.Schema

let novauserSchema = new Schema({
    usuario: { type: 'String', unique: true, index: true },
    direccion: { type: 'String' },
    barrio: { type: 'String' },
    nombre: { type: 'String' }
})

let novauser = mongoose.model('novauser', novauserSchema)

export default novauser