import { Router } from 'express'
import Auth from '../middlewares/authorization'

// Import Controllers
import Transformer from '../controllers/transformer.controller'

const router = new Router()

router.use('/', Auth.verifyAuth)

router.post('/transformers', (req, res) => {
    Transformer.addTransformer(req, res)
})

router.get('/transformers', (req, res) => {
    Transformer.getTransformers(req, res)
})

router.get('/transformer/:id', (req, res) => {
    Transformer.getTransformerData(req, res)
})

router.post('/transformer/:id/addUser', (req, res) => {
    Transformer.addTransformerUser(req, res)
})

export default router