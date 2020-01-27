// Import Models
import Transformer from '../models/transformer'
import TransformerUser from '../models/transformerUser'
import Macro from '../models/macro'
import TransformerActivity from '../models/transformerActivity'

import Formidable from 'formidable'
import FileReader from 'filereader'
import fs from 'fs'
import { ObjectId } from 'mongodb'

const TransformerController = {}

TransformerController.addTransformer = async (req, res) => {
    const { 
        structure,
        town,
        address,
        kva,
        users,
        haveMacro,
        macro,
        ratio,
        newMacro
     } = req.body

    // Create a new transformer
    const newTransformer = new Transformer(
        {
            structure: structure,
            town: town,
            address: address,
            kva: kva,
        }
    )

    newTransformer.save((err, transformer) => {
        if (err) console.log(err)
        console.log(`Se creo el transformador ${transformer.structure}`)
        // create a macrometer
        if (haveMacro) {
            const newMacrometer = new Macro({
                serial: macro,
                ratio: ratio,
                new: (newMacro === 'SI') ? true : false,
                transformer_id: transformer._id
            })
            newMacrometer.save((err, macro) => {
                if (err) console.log(err)
                console.log(`Se creo el macromedidor ${macro.serial}`)
            })
        }

        users.forEach(u => {
            let newTransformerUser = new TransformerUser({
                type: u.tipo,
                meter: u.medidor,
                brand: u.marca,
                code: u.codigo,
                address: u.direccion,
                transformer_id: transformer._id,
                factor: u.factor
            })
            newTransformerUser.save((err, saved) => {
                if (err) console.log(err)
            })
        })

        res.status(200).json({status: 'ok', message: 'Se registraron los usuarios correctamente'})
    })
}

TransformerController.deleteTransformer = async (req, res) => {
    try {
        const { id } = req.params

        const deleteTransformer = await Transformer.deleteOne({'_id': ObjectId(id)})
        const deleteMacro = await Macro.deleteOne({'transformer_id': ObjectId(id)})
        const deleteUsers = await TransformerUser.deleteMany({'transformer_id': ObjectId(id)})

        if (deleteTransformer.ok, deleteMacro.ok, deleteUsers.ok) {
            res.status(200).send()
        } else {
            res.status(500).send('Database error')
        }
    } catch (err) {
        res.send(err)
    }
}

TransformerController.getTransformers = async (req, res) => {
    try {
        await Transformer.find().sort('number').exec((err, transformers) => {
            if (err) res.send(err)
            res.status(200).json(transformers)
        })
    } catch (err) {
        res.send(err)
    }
}

TransformerController.getTransformerData = async (req, res) => {
    try {

        Transformer.aggregate([
            {
                $match: {_id: ObjectId(req.params.id)}
            },
            {
                $lookup: 
                    {
                        from: 'macrometers',
                        localField: '_id',
                        foreignField: 'transformer_id',
                        as: 'macro_info'
                    }
            },
            {
                $lookup:
                    {
                        from: 'transformerusers',
                        localField: '_id',
                        foreignField: 'transformer_id',
                        as: 'users'
                    }
            }
        ]).exec((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.status(200).json(result)
            }
        })
    } catch (err) {
        res.send(err)
    }
}

TransformerController.addTransformerUser = async (req, res) => {
    let form = new Formidable.IncomingForm()
    form.parse(req,(err, fields, files) => {
        const user = JSON.parse(fields.user)
        const location = JSON.parse(fields.location)
        const transformerFolder = `storage/balances/${user.transformer}`
        const stakeoutFolder = `${transformerFolder}/stakeout`

        if (!fs.existsSync(transformerFolder)){
            fs.mkdirSync(transformerFolder)
        }

        if(!fs.existsSync(stakeoutFolder)){
            fs.mkdirSync(stakeoutFolder)
        }
        
        fs.rename(files.Activa.path,`${stakeoutFolder}/${files.Activa.name}.jpg`, err => {
            console.log(err)
        })
        fs.rename(files.Reactiva.path,`${stakeoutFolder}/${files.Reactiva.name}.jpg`, err => {
            console.log(err)
        })
    })
    res.status(200).json({status: 'OK', message:'Successfull'})
}

TransformerController.getAllTransformerActivities = async (req, res) => {
    try {
        TransformerActivity.aggregate([
            {
                $lookup: 
                        {
                            from: 'transformers',
                            localField: 'transformer_id',
                            foreignField: '_id',
                            as: 'transformer_info'
                        }
            }
        ]).exec((err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.status(200).json(result)
            }
        })
    } catch (err) {
        res.send(err)
    }
}

TransformerController.addTransformerActivity = async (req, res) => {
    const t_id = req.body.newActivity.t_id
    const activity_type = req.body.newActivity.activity_type

    const newActivity = new TransformerActivity({
        type: activity_type,
        transformer_id: t_id,
        creator: req.user.CC
    })

    newActivity.save((err, activity) => {
        if (err) {console.log(err)}
        res.status(200).send('OK')
    })
}

TransformerController.delTransformerActivity = async (req, res) => {
    const { id } = req.params

    const deleted_activity = await TransformerActivity.deleteOne({'_id': ObjectId(id)})

    if (deleted_activity.ok) {
        res.status(200).json({
            status: 'ok',
            message: 'Actividad eliminada exitosamente'
        })
    } else {
        res.status(500).json({
            status: 'error',
            message: 'Error al eliminar la actividad'
        })
    }
}

TransformerController.assignTransformerActivity = async (req, res) => {
    const { id, user_id } = req.params

    TransformerActivity.findOne({
        '_id': ObjectId(id)
    })
    .then((activity) => {
        activity.asigned_to = ObjectId(user_id)
        activity
            .save()
            .then(() => {
                res.status(200).json(activity)
            })        
    })
}

TransformerController.breakfreeTransformerActivity = async (req, res) => {
    const { id } = req.params

    TransformerActivity.findOne({
        '_id': ObjectId(id)
    })
        .then(activity => {
            activity.asigned_to = null
            activity
                .save()
                .then(() => {
                    res.status(200).json(activity)
                })
        })
}

export default TransformerController