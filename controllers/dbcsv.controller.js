import axios from 'axios'
import csv2json from 'csvtojson'
import CSVUA from '../models/csvua'
import CSVLEC from '../models/csvlec'
import novauser from '../models/novauser'
import mongoose from 'mongoose'
import { socket, emitters } from '../controllers/socket.controller'
import Formidable from 'formidable'
import FileReader from 'filereader'
import fs from 'fs'
import { ENOMEM } from 'constants'
const amqp = require('amqplib/callback_api')
const path = require('path')

const DbcsvController = {}

DbcsvController.CSVTypes = [
  {
    id: 1,
    name: 'Usuarios Asociados',
    headers: [ 
      'ï»¿"Codigo de Transformador"',
      'CapacidadTransformador',
      'Georeferencia',
      'TipoTransformador',
      'direccion',
      'Codigo Nodo',
      'Codigo Usuario',
      'TipoUsuario',
      'Codigo Concentrador',
      'Codigo de Caja',
      'Codigo de Colector',
      'Codigo de Medidor',
      'Display',
      'Estado',
    ],
    ignore: /(id_colector|transformador|capacidad|tipotransformador|direccion|nodo|estado)/,
    keys: [
      'id_colector',
      'transformador',
      'capacidad',
      'georeferencia',
      'tipotransformador',
      'direccion',
      'nodo',
      'usuario',
      'tipo',
      'concentrador',
      'caja',
      'colector',
      'medidor',
      'homedisplay',
      'estado',
    ] 
  },
  {
    id: 2,
    name: 'Lecturas',
    headers: [ 
      'ï»¿"Codigo Usuario"',
      'Medidor',
      'Fecha Consulta',
      'Fecha de Lectura',
      'Lectura Activa',
      'Lectura Reactiva',
      'Anomalia' 
    ],
    ignore: false,
    keys: [
      'usuario',
      'medidor',
      'fecha_consulta',
      'fecha_lectura',
      'lectura_activa',
      'lectura_reactiva',
      'anomalia'
    ]
  },
]

DbcsvController.addUA = async (req, res) => {
  let form = new Formidable.IncomingForm()
  const headers = ['transformador','capacidad','georeferencia','tipotransformador','direccion','nodo','usuario','tipo','concentrador','caja','colector','medidor','homedisplay','estado']
  const ignore = /(transformador|capacidad|tipotransformador|direccion|nodo|estado)/
  form.parse(req,(err, fields, files) => {
  })
  form.on('file', async (name, file) => {
    const csv = await DbcsvController.fileToCSV(file, headers, ignore)
    const totalRecords = csv.length
    emitters.uploadCSVStatus(socket, 'DROP DATABASE...')
    mongoose.connection.db.dropCollection('csvuas', (err, result) => {
      if (err) {
        result.err = 'Error: Drop collections'
        res.status(500).send(JSON.stringify(result))
      } else {
        emitters.uploadCSVStatus(socket, 'UPLOADING...')
        console.log('Sucessfull: Collections droped')
      }
    })
    let totalCount = 0
    let successCount = 0
    let errorCount = 0
    let interval = setInterval(() => {
      emitters.recordsCSVStatus(socket, {OK: successCount, Error: errorCount, Pending: totalRecords - successCount})
    }, 500)
    csv.forEach(u => {
      let newU = new CSVUA(u)
      newU.save((err, saved) => {
        if (err) {
          errorCount += 1
          totalCount += 1
          console.log(err)
        } else {
          successCount += 1
          totalCount += 1
          if (totalRecords === totalCount) {
            clearInterval(interval)
            emitters.recordsCSVStatus(socket, {OK: successCount, Error: errorCount, Pending: totalRecords - totalCount})
            emitters.uploadCSVStatus(socket, 'SUCCESS...')
            console.log('Success csvuas updated')
            res.status(200).json({status: 'Success', message: 'Data base update'})
          }
        }
      })
    })
  })
}

DbcsvController.addLEC = async (req, res) => {
  let form = new Formidable.IncomingForm()
  const headers = ['usuario','medidor','fecha_consulta','fecha_lectura','lectura_activa','lectura_reactiva','anomalia']
  form.parse(req,(err, fields, files) => {
  })
  form.on('file', async (name, file) => {
    const csv = await DbcsvController.fileToCSV(file, headers)
    const totalRecords = csv.length
    emitters.uploadCSVStatus(socket, 'DROP DATABASE...')
    mongoose.connection.db.dropCollection('csvlecs', (err, result) => {
      if (err) {
        let result = {}
        result.err = 'Error: Drop collections'
        res.status(500).json(result)
      } else {
        emitters.uploadCSVStatus(socket, 'UPLOADING...')
        console.log('Sucessfull: Collections Droped')
      }
    })
    let totalCount = 0
    let successCount = 0
    let errorCount = 0
    let interval = setInterval(() => {
      emitters.recordsCSVStatus(socket, {
        OK: successCount,
        Error: errorCount,
        Pending: totalRecords - successCount
      })
    }, 500)
    csv.forEach(u => {
      let newU = new CSVLEC(u)
      newU.save((err, saved) => {
        if (err) {
          errorCount += 1
          totalCount += 1
          console.log(err)
        } else {
          successCount += 1
          totalCount += 1
          if (totalRecords === totalCount) {
            clearInterval(interval)
            emitters.recordsCSVStatus(socket, {
              OK: successCount,
              Error: errorCount,
              Pending: totalRecords - totalCount
            })
            emitters.uploadCSVStatus(socket, 'SUCCESS...')
            console.log('Success: csvlecs update')
            res.status(200).json({status: 'Success', message: 'Data base update'})
          }
        }
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
        $lookup:
          {
            from: "novausers",
            localField: "usuario",
            foreignField: "usuario",
            as: "novainfo"
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
          lecturas: 1,
          novainfo: 1,
          servicio: 1,
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

DbcsvController.updateNova = async (req, res) => {
  let result = {
    ok: true,
    err: false,
    records: 0
  }
  
  let csv = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSaK2BAnTOYb2exQX9vtHgZdykeOtnN-flwv_CZL2uQlqchGBeepEmg6RulYzULaTuDdUZFcgWSA9k_/pub?gid=0&single=true&output=csv'
  res.setHeader('Content-Type', 'application/json')
  axios({
    url: csv,
    method: 'GET',
    responseType: 'blob'
  })
  .then(response => {
    csv2json({
      ignoreEmpty: true,
      headers: ['usuario','direccion','barrio','nombre','estado_comercial','marca_nova','medidor','fases','con0','con1','con2','lec0','lec1','lec2','fec0','fec1','fec2','cri0','cri1','cri2'],
      checkType: true
    })
    .fromString(response.data)
    .then(jsonRow => {
      console.log(`Borrando base de datos`)
      mongoose.connection.db.dropCollection('novausers',(err, result) => {
        if (err) {
          result.err = 'Error: Drop collections'
          res.status(500).send(JSON.stringify(result))
        } else {
          console.log('Sucessfull: Collections droped')
        }
      })
      result.records = jsonRow.length
      res.status(200).send(result)
      let count = 1

      for (let i = 0; i < jsonRow.length; i++) {
        let newU = jsonRow[i]
        let consumos = []
        
        let unnecessaryProps = ['con0','con1','con2','lec0','lec1','lec2','fec0','fec1','fec2','cri0','cri1','cri2']
  
        for (let i=0;i<3;i++){
          consumos.push({
            kwh: newU['con'+i],
            lectura: newU['lec'+i],
            fecha: newU['fec'+i],
            critica: newU['cri'+i]
          })        
        }
        // Delete unnecessary properties
        unnecessaryProps.forEach((p) => {
          delete newU[p]
        })
        // Add user consumptions
        newU.consumos = consumos
        let newNovaUser = new novauser(newU)
        
        // Save new Nova User
        newNovaUser.save((err, saved) => {
          if (err) {
            console.log(err)
            result.err = 'Error: Save new user Nova'
          } else {
            if (jsonRow.length === count) {
              console.log(`Se actualizaron ${jsonRow.length} Usuarios Nova`)
            } else {
              console.log(`Se han actualizado ${count} usuarios de nova`)
              count += 1
            }
          }
        })

      }
    })
  })
}

DbcsvController.loadCSV = async (req, res) => {
  let form = new Formidable.IncomingForm()
  form.parse(req,(err, fields, files) => {
  })
  form.on('file', async (name, file) => {
    const csv = await DbcsvController.fileToCSV(file)
    const {CSVTypes} = DbcsvController
    let typeFlag = false
    CSVTypes.forEach(async type => {
      if(type.headers.toString() === Object.keys(csv[0]).toString()) {
        typeFlag = true
        res.status(200).json({
          type: type.id,
          name: type.name,
          keys: type.keys,
          data: csv,
          error: false
        })
      } 
    })
    if (!typeFlag) {
      res.status(200).json({
        type: 0,
        name: false,
        error: 'Archivo Desconocido'
      })
    }
  })
}

DbcsvController.fileToCSV = async (file, headers=false, ignore=false) => {
  return new Promise(resolve => {
    let reader = new FileReader()
    reader.readAsText(file)
    reader.on('load', e => {
      const result = e.target.result
      csv2json({
        noheader: true,
        output: 'line',
      })
      .fromString(result)
      .then(csvRow => {
        csv2json({
          delimiter: ';',
          eol: '\r',
          checkType: true,
          ignoreColumns: ignore,
          headers: headers,
        })
        .fromString(csvRow.join('\r'))
        .then(json => {
          resolve(json)
        })
      })
    })
  })
}

export default DbcsvController
