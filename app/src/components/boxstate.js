import React, { Component } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Avatar
 } from '@material-ui/core'

 const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  textField: {
    flexBasis: 200,
    width: '100%',
  },
  button: {
    height: '75%',
    width: '100%',
    margin: theme.spacing.unit,
  },
  table: {
    minWidth: 700,
  },
  chip: {
    margin: theme.spacing.unit,
    marginLeft: '20px'
  },
});

class BoxState extends Component {
  constructor() {
    super()
    this.state = {
      searchNumber : 0,
      searchType: 1,
      users: [],
      concentrador: 0,
      colector: 0,
      caja: 0,
      //api: 'http://localhost:5000/'
      api: 'https://agile-shore-21901.herokuapp.com/'
    }
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value }, () => { this.getInfo() })
  }

  getUsers = () => {
    let fetchConf = {
      method: 'GET',
      mode: 'cors'
    }
    const {colector} = this.state

    let url = `${this.state.api}api/dbcsv/getBoxState?searchType=1&number=${colector}`
    fetch(url, fetchConf)
      .then(response => {
        if(response.ok) {
          response.json().then(json => {
            this.setState({users: json})
          })
        }
      })
      .catch(function(err) {
        console.log(err)
      })
  }

  getInfo = () => {
    const {searchType, searchNumber} = this.state

    let fetchConf = {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({searchType: searchType, number: searchNumber}),
      headers: {
        'Content-Type' : 'application/json'
      }
    }

    let url = `${this.state.api}api/dbcsv/getPreInfo`
    fetch(url, fetchConf)
      .then(response => {
        if(response.ok) {
          response.json().then(json => {
            if(json.concentrador) {
              this.setState(json)
            } else {
              this.setState({
                concentrador: 0,
                colector: 0,
                caja: 0
              })
            }
          })
        }
      }).catch(function(err){
        console.log(err)
      })
  }

  render() {
    const { classes } = this.props
    const searchTypes = [
            {name: 'Colector', value: 1},
            {name: 'Caja', value: 2},
            {name: 'Usuario', value: 3},
            {name: 'Medidor', value: 4}
          ]
    const users = this.state.users
    let { concentrador, colector, caja } = this.state
    let anomalies = users.filter(u => u.lecturas[0].anomalia)
    console.log(anomalies)

    return(
      <div className='content'>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Typography variant="h4" component="h4" align='center'>
              Verificación de Cajas
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <TextField
              select
              label="Buscar por:"
              className={classNames(classes.margin, classes.textField)}
              value={this.state.searchType}
              onChange={this.handleChange('searchType')}
              variant="outlined"
            >
              {searchTypes.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={5}>
            <TextField
              label="Código"
              className={classNames(classes.margin, classes.textField)}
              variant="outlined"
              onChange={this.handleChange('searchNumber')}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.getUsers}
              >
              BUSCAR
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={24}
          >
            <Chip
              avatar={<Avatar>CC</Avatar>}
              label={concentrador}
              className={classes.chip}
            />
            <Chip
              avatar={<Avatar>CL</Avatar>}
              label={colector}
              className={classes.chip}
            />
            <Chip
              avatar={<Avatar>CJ</Avatar>}
              label={caja}
              className={classes.chip}
            />
            <Chip
              avatar={<Avatar>U</Avatar>}
              label={users.length}
              className={classes.chip}
              color="primary"
            />
            <Chip
              avatar={<Avatar>A</Avatar>}
              label={anomalies.length}
              className={classes.chip}
              color="secondary"
            />
        </Grid>
        <Grid container spacing={24}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Codigo</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell numeric>Medidor</TableCell>
                <TableCell numeric>Homedisplay</TableCell>
                <TableCell numeric>Fecha</TableCell>
                <TableCell numeric>Lectura</TableCell>
                <TableCell numeric>Anomalia</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(u => {
                return (
                  <TableRow key={u.usuario}>
                    <TableCell>
                      {u.usuario}
                    </TableCell>
                    <TableCell >{u.tipo}</TableCell>
                    <TableCell numeric>{u.medidor}</TableCell>
                    <TableCell numeric>{u.homedisplay}</TableCell>
                    <TableCell numeric>{u.lecturas[0].fecha_lectura}</TableCell>
                    <TableCell numeric>{u.lecturas[0].lectura}</TableCell>
                    <TableCell numeric>{u.lecturas[0].anomalia}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Grid>
      </div>
    )
  }
}

BoxState.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(BoxState)
