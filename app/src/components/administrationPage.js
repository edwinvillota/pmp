import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import {
    Grid, 
    Typography,
    Card,
    CardActions,
    CardContent,
    CardActionArea,
    Button
} from '@material-ui/core'

const styles = theme => ({
    
})

class AdministrationPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    render () {
        const { classes } = this.props

        return (
            <div className='content'>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Typography variant='display1'>Administración</Typography>
                    </Grid>
                    <Grid item={4}>
                    <Card className={classes.card}>
                        <CardActionArea>
                            </CardActionArea>
                            <CardContent>
                            <Typography variant='h5' component='h2'>
                                Administrar Usuarios
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                Agregar, editar o eliminar usuarios.
                                </Typography>
                            </CardContent>
                            <CardActions>
                            <Link to='/administration/users' className='nav-link'>
                                <Button size='small' color='primary'>
                                    Ingresar
                                </Button>
                            </Link>
                        </CardActions>
                    </Card>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    apiUrl: state.api.apiUrl
})

export default withRouter(withStyles(styles, { withTheme: true })(connect(mapStateToProps)(AdministrationPage)))