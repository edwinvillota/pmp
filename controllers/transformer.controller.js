// Import Models
import Transformer from '../models/transformer'
import TransformerUser from '../models/transformerUser'

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

export default TransformerController