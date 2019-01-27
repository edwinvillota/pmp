import mongoose, { mongo } from 'mongoose'
const Schema = mongoose.Schema

let novauserSchema = new Schema({
    usuario: { type: 'String', unique: true, index: true },
    nombre: { type: 'String' },
    direccion: { type: 'String' },
    barrio: { type: 'String' },
    estado_comercial: { type: 'String' },
    marca_nova: { type: 'String' },
    medidor: { type: 'String' },
    fases: { type: 'String' },
    consumos: [{
        kwh: { type: 'String' },
        lectura: { type: 'String' },
        fecha: { type: 'String' },
        critica: { type: 'String'} 
    }]
})

let novauser = mongoose.model('novauser', novauserSchema)

export default novauser