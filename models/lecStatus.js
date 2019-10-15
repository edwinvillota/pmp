import mongoose from 'mongoose'
const Schema = mongoose.Schema

const lecStatusSchema = new Schema({
    tipo_medida: {type: 'String'},
    fecha_estado: {type: 'Date'},
    fecha_registro: {type: 'Date'},
    total_usuarios: {type: 'Number'},
    usuarios_online: {type: 'Number'},
    usuarios_offline: {type: 'Number'}
})

const lecStatus = mongoose.model('lecStatus', lecStatusSchema)

export default lecStatus