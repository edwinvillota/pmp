import axios from 'axios'
import csv2json from 'csvtojson'
import CSVUA from '../models/csvua'
import CSVLEC from '../models/csvlec'
import mongoose from 'mongoose'

const DbcsvController = {}

DbcsvController.updateCSVUA = async (req, res) => {
  let csv = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ7qHvvXRjG0RnMRio5JTa5qq1vlnubBOB2Hg_gAwKVZM5pHRxjFdEUk1Vy1_EEMuElQbWqqL22FmBh/pub?gid=0&single=true&output=csv'
  axios({
    url: csv,
    method: 'GET',
    responseType: 'blob'
  })
  .then(response => {
    csv2json({
      ignoreEmpty: true,
      ignoreColumns: /(id_colector|transformador|capacidad|tipotransformador|direccion|nodo|estado)/,
      headers: ['id_colector','transformador','capacidad','georeferencia','tipotransformador','direccion','nodo','usuario','tipo','concentrador','caja','colector','medidor','homedisplay','estado'],
      checkType: true
    })
    .fromString(response.data)
    .then(jsonRow => {
      console.log(`Borrando base de datos`)
      mongoose.connection.db.dropCollection('csvuas',(err, result) => {
        if (err) {
          console.log(err)
        } else {
          console.log(result)
        }
      })
      let count = 1
      jsonRow.map(u => {
        let newU = new CSVUA(u)
        newU.save((err, saved) => {
          if (err) {
            console.log(err)
          } else {
            console.log(`Total de registros = ${jsonRow.length}`)
            console.clear()
            console.log(`Registros actualizados ${count}`)
            if(jsonRow.length === count){
              res.status(200).send('Database Update')
            } else {
              count += 1
            }
          }
        })
      })
    })
   })
  }

DbcsvController.updateCSVLEC = async (req, res) => {
  let csv = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ7qHvvXRjG0RnMRio5JTa5qq1vlnubBOB2Hg_gAwKVZM5pHRxjFdEUk1Vy1_EEMuElQbWqqL22FmBh/pub?gid=393198388&single=true&output=csv'
  axios({
    url: csv,
    method: 'GET',
    responseType: 'blob'
  })
  .then(response => {
    csv2json({
      ignoreEmpty: true,
      headers: ['usuario','medidor','fecha_consulta','fecha_lectura','lectura','anomalia'],
      colParser: {
        'fecha_consulta' : function(fecha_consulta){
          return new Date(fecha_consulta)
        },
        'fecha_lectura' : function(fecha_lectura){
          return new Date(fecha_lectura)
        },
      },
      checkType: true
    })
    .fromString(response.data)
    .then(jsonRow => {
      console.log(`Borrando base de datos`)
      mongoose.connection.db.dropCollection('csvlecs',(err, result) => {
        if (err) {
          console.log(err)
        } else {
          console.log(result)
        }
      })
      console.log(`Actualizando lecturas`)
      let count = 1
      jsonRow.map(l => {
        let newL = new CSVLEC(l)
        newL.save((err, saved) => {
          if (err) {
            console.log(err)
          } else {
            console.log(`Total de registros = ${jsonRow.length}`)
            console.clear()
            console.log(`Registros actualizados ${count}`)
            if(jsonRow.length === count){
              res.status(200).send('Database Update')
            } else {
              count += 1
            }
          }
        })
        // Find user _id
/*         CSVUA.findOne({ usuario : l.usuario }, (err, user) => {
          if (err) {
            console.log(err)
          } else {
            newL.usuario = user._id
            newL.save((err, saved) => {
              if (err) {
                console.log(err)
              } else {
                console.log(`Total de registros = ${jsonRow.length}`)
                console.clear()
                user.lecturas.push (saved)
                user.save()
                console.log(`Registros actualizados ${count}`)
              if(jsonRow.length === count){
                res.status(200).send('Database Update')
              } else {
                count += 1
              }
            }
          }) 
        } */
      })
    })
  })
}
  
DbcsvController.getUserInfo = async (req, res) => {
  let { user } = req.query

  CSVUA.aggregate([
    {
      $match: {
        usuario: '1103846'
      }
    },
    {
      $lookup:
        {
          from: "csvlecs",
          localField: "usuario",
          foreignField: "usuario",
          as: "lecturas"
        }
    },
    {
      $project: {
        _id: 1,
        usuario: 1,
        georeferencia: 1,
        medidor: 1,
        lecturas: 1
      }
    }
  ]).exec((err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.setHeader('Content-Type', 'application/json')
      res.status(200).send(result)
    }
  })
}

DbcsvController.getBoxState = async (req, res) => {
  let { searchType, number} = req.query
  if (searchType && number) {
    let searchJson = {}
    // Tipos de busqueda 
    // 1 - Colector
    // 2 - Caja
    // 3 - Usuario
    // 4 - Medidor
    // 5 - Homedisplay
    number = parseInt(number)
    switch (searchType) {
      case '1':
          searchJson = { colector: number }
        break
      case '2':
          searchJson = { caja: number }
        break
      case '3':
          searchJson = { usuario: number }
        break
      case '4':
          searchJson = { medidor: number }
        break
      case '5':
          searchJson = { homedisplay: number }
        break
    }
    CSVUA.aggregate([
      {
        $match: searchJson 
      },
      {
        $lookup:
          {
            from: "csvlecs",
            localField: "usuario",
            foreignField: "usuario",
            as: "lecturas"
          }
      },
      {
        $project: {
          usuario: 1,
          tipo: 1,
          colector: 1,
          georeferencia: 1,
          medidor: 1,
          homedisplay: 1,
          lecturas: 1
        }
      }
    ]).exec((err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.status(200).send(result)
      }
    })
  } else {
    res.status(500).send('Missing parameters')
  }
}

DbcsvController.getPreInfo = async (req, res) => {
  let { searchType, number} = req.body
  if (searchType && number) {
    let searchJson = {}
    // Tipos de busqueda 
    // 1 - Colector
    // 2 - Caja
    // 3 - Usuario
    // 4 - Medidor
    // 5 - Homedisplay
    switch (searchType) {
      case 1:
          searchJson = { colector: number }
        break
      case 2:
          searchJson = { caja: number }
        break
      case 3:
          searchJson = { usuario: number }
        break
      case 4:
          searchJson = { medidor: number }
        break
      case 5:
          searchJson = { homedisplay: number }
        break
    }
    CSVUA.findOne(searchJson)
    .exec((err, info) => {
      if (err) {
        res.status(500).send(err)
      } else {
        if (info) {
          let response = {
            concentrador: info.concentrador,
            colector: info.colector,
            caja: info.caja
          }
          res.status(200).send(response)
        } else {
          let response = {
            concentrador: 0,
            colector: 0,
            caja: 0
          }
          res.status(200).send(response)
        }
      }
    })
  } else {
    res.status(500).send('Missing parameters')
  }
}

export default DbcsvController
