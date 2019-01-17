import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles'
import UserCedInfo from './userCedInfo'
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
  hoverRow: {
    cursor: 'pointer',
    '&:hover': {
      background: 'rgba(0,0,0,.2)'
    }
  },
  anomalia: {
    background: 'rgba(255,0,0,.2)'
  },
  found: {
    border: 'solid 2px white',
    boxShadow: '3px 3px 5px rgba(0,0,0,.5)'
  }
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
      selectedUser: {}
    }
  }


  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value }, () => { this.getInfo() })
  }

  handleSelectUser = user => e => {
    e.preventDefault()
    this.setState({ selectedUser : user })
  }

  getUsers = () => {
    const {colector} = this.state

    let url = `${this.props.apiUrl}/api/dbcsv/getBoxState?searchType=1&number=${colector}`
    axios.get(url)
      .then(json => {
        this.setState({users: json.data})
      })
      .catch(err => {
        console.log(err)
      })
  }

  getInfo = () => {
    const {searchType, searchNumber} = this.state
    let url = `${this.props.apiUrl}/api/dbcsv/getPreInfo`
    axios.post(url,{searchType: searchType, number: searchNumber})
      .then(json => {
        let data = json.data
        if (data.concentrador) {
          this.setState(data)
        } else {
          this.setState({
            concentrador: 0,
            colector: 0,
            caja: 0
          })
        }
      }).catch(err => {
        console.log(err)
      })
  }

  render() {
    const { classes } = this.props
    const searchTypes = [
            {name: 'Colector', value: 1},
            {name: 'Caja', value: 2},
            {name: 'Usuario', value: 3},
            {name: 'Medidor', value: 4},
            {name: 'Homedisplay', value: 5}
          ]
    const users = this.state.users
    let { concentrador, colector, caja } = this.state
    let anomalies = users.filter(u => u.lecturas[0].anomalia)
    let metters = users.map(u => {
      return u.medidor
    })
    let metterCount = metters.join('').length / 5

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
            <Chip
              avatar={<Avatar style={{backgroundColor: '#009B0C', color: 'white'}}>M</Avatar>}
              label={metterCount}
              className={classes.chip}
              style={{backgroundColor: '#05D315', color: 'white'}}
            />
        </Grid>
        <Grid container>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Codigo</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell numeric>Medidor</TableCell>
                <TableCell numeric>Homedisplay</TableCell>
                <TableCell numeric>Fecha</TableCell>
                <TableCell numeric>Lectura</TableCell>
                <TableCell >Direccion</TableCell>
                <TableCell >Anomalia</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(u => {
                let novainfo = u.novainfo[0] ? u.novainfo[0] : {direccion: ''}
                let foundNumber
                if ((this.state.searchType === 3 && this.state.searchNumber === u.usuario.toString()) ||
                    (this.state.searchType === 4 && parseInt(this.state.searchNumber) === u.medidor) ||
                    (this.state.searchType === 5 && parseInt(this.state.searchNumber) === u.homedisplay)
                  ) {
                  foundNumber = classes.found
                } else {
                  foundNumber = ''
                }
                return (
                  <TableRow 
                    key={u.usuario} 
                    className={`${classes.hoverRow} ${u.lecturas[0].anomalia ? classes.anomalia : ''} ${foundNumber}`}
                    onClick={this.handleSelectUser(u)} 
                  >
                    <TableCell>
                      {u.usuario}
                    </TableCell>
                    <TableCell >{u.tipo}</TableCell>
                    <TableCell numeric>{u.medidor}</TableCell>
                    <TableCell numeric>{u.homedisplay}</TableCell>
                    <TableCell numeric>{u.lecturas[0].fecha_lectura}</TableCell>
                    <TableCell numeric>{u.lecturas[0].lectura}</TableCell>
                    <TableCell >{novainfo.direccion.toLowerCase()}</TableCell>
                    <TableCell >{u.lecturas[0].anomalia}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Grid>
        <Grid item xs={12}>
            {/* <UserCedInfo usuario={this.state.selectedUser} /> */}
        </Grid>
      </div>
    )
  }
}

BoxState.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  apiUrl: state.api.apiUrl
})

export default withStyles(styles)(connect(mapStateToProps)(BoxState))
