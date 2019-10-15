import { Router } from 'express'
import Analysis from '../controllers/analysis.controller'
import Auth from '../middlewares/authorization'

const router = new Router()
router.use('/', Auth.verifyAuth)

// Registrar estado de lecturas
router.post('/analysis/addLecStatus', (req, res) => {
    Analysis.addLecStatus(req,res)
})

// Obtener estados de Lecturas
router.get('/analysis/getLecStatus/:type/:lastRecords', (req, res) => {
    Analysis.getLecStatus(req, res)
})

export default router