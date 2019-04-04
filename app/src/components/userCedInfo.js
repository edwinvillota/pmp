import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
    Grid,
    Paper,
    Typography,
    Divider,
    Fade
} from '@material-ui/core'
import { Bar } from 'react-chartjs-2'
import 'chartjs-plugin-annotation'

const styles = theme => ({
    root: {
        margin: '10px 0px'
    },
    paper: {
        padding: '10px',
        minHeight: '300px'
    },
    infoTable: {
        width: '100%',
        border: 'none',
        borderCollapse: 'collapse',
        '& > tr:nth-child(odd)': {
            backgroundColor: '#DDD'
        },
    }
})

class userCedInfo extends Component {
    constructor(){
        super()
        this.state = {
            visible: false
        }
    }

    componentWillReceiveProps () {
        if (Object.keys(this.props.usuario).length === 0) {
            this.setState({visible: false})
        } else {
            this.setState({visible: true})
        }
    }

    render() {
        const { classes } = this.props
        const { usuario } = this.props
        const graphOptions = {
            scales: {
                yAxes: [{
                    ticks: {
                        suggestedMin: 0,
                        suggestedMax: 300
                    }
                }]
            }
        }
        let labels = []
        let kwh = []
        let existNovainfo = false
        if (usuario.novainfo !== undefined && usuario.novainfo[0] !== undefined ) {
            existNovainfo = true
        }
        if (usuario.novainfo !== undefined && usuario.novainfo[0] !== undefined && usuario.novainfo[0].consumos !== undefined) {
            const c = usuario.novainfo[0].consumos
            labels = [c[0].fecha,c[1].fecha,c[2].fecha]
            kwh = [
                parseInt(c[0].kwh),
                parseInt(c[1].kwh),
                parseInt(c[2].kwh)
                ]
        } 
        const data = {
            labels: labels,
            datasets: [
              {
                label: 'KWh',
                backgroundColor: 'rgba(4,202,169,0.4)',
                borderWidth: [1,1,1],
                borderColor: 'rgba(4,202,169,1)',
                hoverBackgroundColor: 'rgba(4,202,169,.7)',
                hoverBorderColor: 'rgba(4,202,169,1)',
                data: kwh
              }
            ]
        }
        return (
            <Fade in={this.state.visible}>
            <Grid container alignItems='center' className={classes.root}>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>
                        <Typography variant="h5" component="h3">
                            Información de usuario
                        </Typography>
                        <Divider />
                        <table className={classes.infoTable}>
                            <tr>
                                <td><Typography variant='subtitle2'>Código:</Typography></td>
                                <td><Typography align='right'>{usuario.usuario}</Typography></td>
                            </tr>
                            <tr>
                                <td><Typography variant='subtitle2'>Coordenadas:</Typography></td>
                                <td><Typography align='right'>{usuario.georeferencia}</Typography></td>
                            </tr>
                            <tr>
                                <td><Typography variant='subtitle2'>Fecha de Lectura:</Typography></td>
                                <td><Typography align='right'>{existNovainfo ? usuario.lecturas[0].fecha_lectura : ''}</Typography></td>
                            </tr>
                            <tr>
                                <td><Typography variant='subtitle2'>Nombre:</Typography></td>
                                <td><Typography align='right'>{existNovainfo ? usuario.novainfo[0].nombre : ''}</Typography></td>
                            </tr>
                            <tr>
                                <td><Typography variant='subtitle2'>Barrio:</Typography></td>
                                <td><Typography align='right'>{existNovainfo ? usuario.novainfo[0].barrio : ''}</Typography></td>
                            </tr>
                            <tr>
                                <td><Typography variant='subtitle2'>Estado:</Typography></td>
                                <td><Typography align='right'>{existNovainfo ? usuario.novainfo[0].estado_comercial : ''}</Typography></td>
                            </tr>
                        </table>
                        <Divider/>
                        <Typography variant="h6" component="h6">
                            Medidor Supernova
                        </Typography>
                        <table className={classes.infoTable}>
                            <tr>
                                <td><Typography variant='subtitle2'>Marca:</Typography></td>
                                <td><Typography align='right'>{existNovainfo ? usuario.novainfo[0].marca_nova : ''}</Typography></td>
                            </tr>
                            <tr>
                                <td><Typography variant='subtitle2'>Serial:</Typography></td>
                                <td><Typography align='right'>{existNovainfo ? usuario.novainfo[0].medidor : ''}</Typography></td>
                            </tr>
                            <tr>
                                <td><Typography variant='subtitle2'>Fases:</Typography></td>
                                <td><Typography align='right'>{existNovainfo ? usuario.novainfo[0].fases : ''}</Typography></td>
                            </tr>
                        </table>
                    </Paper>
                </Grid>
                <Grid item xs={9}>
                    <Paper className={classes.paper} style={{marginLeft: '10px'}}>
                        <Typography variant="h5" component="h3">
                            Consumos
                        </Typography>
                        <Bar 
                            data={data}
                            height={70}
                            options={graphOptions}
                        />
                    </Paper>
                </Grid>
            </Grid>
            </Fade>
        )
    }
}

userCedInfo.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(userCedInfo)