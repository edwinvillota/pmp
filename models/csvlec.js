import mongoose from 'mongoose'
const Schema = mongoose.Schema

let csvlecSchema = new Schema({
    usuario: { type: Schema.Types.ObjectId, ref: 'csvua'},
    medidor: { type: 'Number' },
    fecha_consulta: { type: 'Date' },
    fecha_lectura: { type: 'Date' },
    lectura: { type: 'Number' },
    anomalia: { type: 'String' }
})

let csvlec = mongoose.model('csvlec', csvlecSchema)

export default csvlec