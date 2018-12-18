import mongoose from 'mongoose'
const Schema = mongoose.Schema

let csvlecSchema = new Schema({
    usuario: { type: 'String' },
    medidor: { type: 'Number' },
    fecha_consulta: { type: 'String' },
    fecha_lectura: { type: 'String' },
    lectura: { type: 'Number' },
    anomalia: { type: 'String' }
})

let csvlec = mongoose.model('csvlec', csvlecSchema)

export default csvlec