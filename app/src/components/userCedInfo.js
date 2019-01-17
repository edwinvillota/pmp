import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
    Grid,
    Paper,
    Typography,
    Divider
} from '@material-ui/core'

const styles = theme => ({
    root: {
        margin: '10px 0px'
    },
    paper: {
        padding: '10px'
    }
})

class userCedInfo extends Component {
    constructor(){
        super()
    }

    render() {
        const { classes } = this.props
        const { usuario } = this.props
        return (
            <Grid container alignItems='center' className={classes.root}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography variant="h5" component="h3">
                            Información de usuario
                        </Typography>
                        <Divider />
                        <Typography paragraph>
                            Código:         {usuario.usuario}
                            Coordenadas:    {usuario.georeferencia}    
                            Nombre:         {usuario.novainfo ? usuario.novainfo[0].nombre : ''}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

userCedInfo.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(userCedInfo)