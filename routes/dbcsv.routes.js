import { Router } from 'express'
import Dbcsv from '../controllers/dbcsv.controller'
import Auth from '../middlewares/authorization'

const router = new Router()
router.use('/', Auth.verifyAuth)
// Actualizar usuarios asociados
router.post('/dbcsv/updateCSVUA', (req,res) => {
  Dbcsv.updateCSVUA(req, res)
})
// Actualizar lecturas
router.post('/dbcsv/updateCSVLEC', (req,res) => {
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
// Actualizar sabana
router.post('/dbcsv/updateNova', (req, res) => {
  Dbcsv.updateNova(req, res)
})

// Ingresar CSV
router.post('/dbcsv/loadCSV', (req, res) => {
  Dbcsv.loadCSV(req, res)
})

// Ingresar PDF
router.post('/dbcsv/loadOrder', (req, res) => {
  Dbcsv.PDFToOrder(req, res)
})

// Agregar usuario asociado
router.post('/dbcsv/addUA', (req, res) => {
  Dbcsv.addUA(req,res)
})

// Agregar Lectura 
router.post('/dbcsv/addLEC', (req, res) => {
  Dbcsv.addLEC(req,res)
})
export default router
