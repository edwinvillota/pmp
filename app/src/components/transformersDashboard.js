import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import {
    Grid,
    Typography,
    Button,
    Paper,
    Card,
    CardContent,
    CardActions,
    FormHelperText
} from '@material-ui/core'

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        width: '100%'
    },
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
      title: {
        fontSize: 14,
    },
      pos: {
        marginBottom: 12,
    },
})

class TransformersDashboard extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    render() {
        const { classes } = this.props

        return (
            <div className='content'>
                <Grid container className={classes.root} 
                    style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                    >
                    <Typography variant='h5' component='h3' align='center'
                        style={{
                            marginBottom: '1em'
                        }}
                        >
                        BALANCE ENERGÉTICO DE TRANSFORMADORES
                    </Typography>
                    <Grid item xs={12}>
                        <Grid item xs={4}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography variant='h5' component='h2'>
                                        Agregar Transformador
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        Crear Nuevo Transformador
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Link to='/transformers/new' className='nav-link'>
                                        <Button size='small' variant='contained' color='primary'>
                                            Agregar
                                        </Button>
                                    </Link>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    apiUrl: state.api.apiUrl
})

export default withRouter(withStyles(styles, { withTheme: true })(connect(mapStateToProps)(TransformersDashboard)))