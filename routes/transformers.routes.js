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

router.delete('/transformer/:id', (req, res) => {
    Transformer.deleteTransformer(req, res)
})

router.post('/transformer/:id/addUser', (req, res) => {
    Transformer.addTransformerUser(req, res)
})

router.get('/transformers/activities', (req, res) => {
    Transformer.getAllTransformerActivities(req, res)
})

router.post('/transformer/:id/activity', (req, res) => {
    Transformer.addTransformerActivity(req, res)
})

router.delete('/transformer/activity/:id', (req, res) => {
    Transformer.delTransformerActivity(req, res)
})

router.put('/transformer/activity/:id/assign', (req, res) => {
    Transformer.assignTransformerActivity(req, res)
})

router.put('/transformer/activity/:id/breakfree', (req, res) => {
    Transformer.breakfreeTransformerActivity(req, res)
})

router.get('/transformers/activities/asigned', (req, res) => {
    Transformer.getAsignedTransformerActivities(req, res)
})

export default router