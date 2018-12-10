import { Router } from 'express'
import Dbcsv from '../controllers/dbcsv.controller'
const router = new Router()
// Actualizar usuarios asociados
router.get('/dbcsv/updateCSVUA', (req,res) => {
  Dbcsv.updateCSVUA(req, res)
})
// Actualizar lecturas
router.get('/dbcsv/updateCSVLEC', (req,res) => {
  Dbcsv.updateCSVLEC(req, res)
})
// Consultar usuario
router.get('/dbcsv/getUserInfo', (req, res) => {
  Dbcsv.getUserInfo(req, res)
})
// Consultar estado de caja
router.get('/dbcsv/getBoxState', (req, res) => {
  Dbcsv.getBoxState(req, res)
})
// Consular información previa
router.post('/dbcsv/getPreInfo', (req, res) => {
  Dbcsv.getPreInfo(req, res)
})
export default router
