// Import Models
import Transformer from '../models/transformer'
import TransformerUser from '../models/transformerUser'

import Formidable from 'formidable'
import FileReader from 'filereader'
import fs from 'fs'

const TransformerController = {}

TransformerController.addTransformer = async (req, res) => {
    const { 
        structure,
        town,
        macro,
        kva,
        ratio,
        users
     } = req.body
    let newTransformer = new Transformer(
        {
            structure: structure,
            town: town,
            macro: macro,
            kva: kva,
            ratio
        }
    )

    newTransformer.save((err, transformer) => {
        if (err) console.log(err)
        console.log(transformer)
        users.forEach(u => {
            let newTransformerUser = new TransformerUser({
                meter: u.medidor,
                brand: u.marca,
                code: u.codigo,
                address: u.direccion,
                transformer: transformer._id
            })
            newTransformerUser.save((err, saved) => {
                if (err) console.log(err)
                console.log(saved)
            })
        })
    })
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
        await Transformer.findOne({_id: req.params.id}).exec((err, data) => {
            if (err) res.send(err)
            TransformerUser.find({transformer: req.params.id}).exec((err, users) => {
                if (err) res.send(err)
                const results = {
                    transformer_info: data,
                    users: users
                }
                res.status(200).json(results)
            })
            
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

export default TransformerController