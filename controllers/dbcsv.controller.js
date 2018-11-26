import csv from 'fast-csv'

const DbcsvController = {}

DbcsvController.getUsers = async (req, res) => {
  try {
    let searchType = req.query.type
    let number = req.query.number
    let searchProp = ''
    if (searchType && number) {
      switch (searchType) {
        case '1':
          searchProp = 'codigo de colector '
          break
        case '2':
          searchProp = 'codigo de caja'
          break
      }
      let result = []
      csv
        .fromPath('./csv/UA.csv', { headers: true, delimiter: ';' })
        .on('data', function (data) {
          result.push(data)
        })
        .on('end', function () {
          let filter = result.filter(user => user[searchProp] === number)
          let lecs = []
          csv
            .fromPath('./csv/LEC.csv', { headers: true, delimiter: ';' })
            .on('data', function (data) {
              lecs.push(data)
            })
            .on('end', function () {
              filter.map(u => {
                let ul = lecs.filter(lec => lec['codigo usuario'] === u['codigo usuario'])
                u.fecha = ul[0]['fecha lectura']
                u.lectura = ul[0]['lectura final']
                u.anomalia = ul[0]['anomalia']
              })
              res.send(filter)
            })
        })
    } else {
      res.status(500).send('Error: Missing colector number')
    }
  } catch (e) {
    res.status(500).send(e)
  }
}

DbcsvController.getInfo = async (req, res) => {
  try {
    const { type, number } = req.body
    let searchProp = ''
    if (type && number) {
      switch (type) {
        case 1:
          searchProp = 'codigo de colector '
          break
        case 2:
          searchProp = 'codigo de caja'
          break
        case 3:
          searchProp = 'codigo usuario'
          break
        case 4:
          searchProp = 'codigo de medidor'
          break
      }

      let result = {}

      csv
        .fromPath('./csv/UA.csv', { headers: true, delimiter: ';' })
        .on('data', function (data) {
          if (data[searchProp] === number) {
            result = {
              concentrador: data['codigo concentrador'],
              colector: data['codigo de colector '],
              caja: data['codigo de caja']
            }
          }
        })
        .on('end', function () {
          res.send(result)
        })
    } else {
      res.status(500).send('Missing parameters')
    }
  } catch (e) {
    res.status(500).send(e)
  }
}

DbcsvController.getLec = async (req, res) => {
  const user = req.query.user
  let result = {}
  if (user) {
    csv
      .fromPath('./csv/LEC.csv', { headers: true, delimiter: ';' })
      .on('data', function (data) {
        if (data['codigo usuario'] === user) {
          result = {
            fecha: data['fecha lectura'],
            lectura: data['lectura final'],
            anomalia: data['anomalia']
          }
        }
      })
      .on('end', function () {
        res.send(result)
      })
  }
}

export default DbcsvController
