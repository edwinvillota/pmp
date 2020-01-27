import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import {
    Grid,
    Typography,
    Button,
    Card,
    CardContent,
    CardActions,
    CardActionArea,
    CardMedia
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
    media: {
        objectFit: 'cover'
    }
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
                <Grid container className={classes.root}  spacing={24}
                    style={{
                        display: 'flex',
                    }}
                    >
                    <Grid xs={12}>
                        <Typography variant='h5' component='h3' align='center'
                            style={{
                                marginBottom: '1em'
                            }}
                            >
                            BALANCE ENERGÉTICO DE TRANSFORMADORES
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Transformer"
                                    className={classes.media}
                                    height="140"
                                    image="/images/balances/card/add_transformer.jpg"
                                    title="Transformer"
                                    />
                            </CardActionArea>
                            <CardContent>
                                <Typography variant='h5' component='h2'>
                                    Agregar Transformador
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    Agregar un nuevo Transformador para balance energético.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link to='/transformers/new' className='nav-link'>
                                    <Button size='small' color='primary'>
                                        Agregar
                                    </Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Transformer"
                                    className={classes.media}
                                    height="140"
                                    image="/images/balances/card/management.jpg"
                                    title="management"
                                    />
                            </CardActionArea>
                            <CardContent>
                                <Typography variant='h5' component='h2'>
                                    Administrar Transformadores
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    Eliminar y administrar transformadores registrados en la base de datos.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link to='/transformers/management' className='nav-link'>
                                    <Button size='small' color='primary'>
                                        Ingresar
                                    </Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Transformer"
                                    className={classes.media}
                                    height="140"
                                    image="/images/balances/card/add_tasks.jpg"
                                    title="Transformer"
                                    />
                            </CardActionArea>
                            <CardContent>
                                <Typography variant='h5' component='h2'>
                                    Asignar Tareas
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    Asignar tareas de levantamiento y toma de lecturas para transformadores registrados.
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link to='/transformers/activities' className='nav-link'>
                                    <Button size='small' color='primary'>
                                        Asignar
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

export default withRouter(withStyles(styles, { withTheme: true })(connect(mapStateToProps)(TransformersDashboard)))