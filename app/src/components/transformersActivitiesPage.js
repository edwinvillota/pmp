import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import {
    Grid,
    Typography,
    OutlinedInput,
    InputLabel,
    FormControl,
    Select,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions

} from '@material-ui/core'
import axios from 'axios'
import {
    addTransformerActivity
} from '../actions/transformerActivities'
import TransformersActivitiesList from './transformerActivitiesList'

const styles = theme => ({
    form: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formItem: {
        marginBottom: '1em',
        paddingRight: '1em'
    }
})

class TransformersActivitiesPage extends Component {

    constructor (props) {
        super(props) 
        this.state = {
            transformers: [],
            transformer_id: '',
            activity_type: 'STAKEOUT',
            errors: {
                transformer_id: {
                    error: false,
                    msg: ''
                },
                activity_type: {
                    error: false,
                    msg: ''
                }
            },
            dialogs: {
                creation: false,
                remove: false
            }
        }
    }


    componentDidMount() {
        const api = this.props.apiUrl
        const endpoint = `${api}/api/transformers`

        axios.get(endpoint)
            .then(response => {
                this.setState({
                    transformers: response.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    _renderTransformerOptions = () => {
        const {transformers} = this.state

        const options = transformers.map((t, i) => (
            <option key={i} value={t._id}>{t.structure}</option>
        ))
            
        return options
    }

    handleAddActivity = () => {

        const newActivity = {
            t_id: this.state.transformer_id,
            activity_type: this.state.activity_type
        }

        // Validate new activity

        if (newActivity.t_id === '') {
            const error = {
                error: true,
                msg: 'Seleccione el transformador'
            }
            this.setState({
                errors: {
                    ...this.state.errors,
                    transformer_id: error
                }
            })
        }

        if (newActivity.activity_type === '') {
            const error = {
                error: true,
                msg: 'Seleccione el tipo de actividad'
            }
            this.setState({
                errors: {
                    ...this.state.errors,
                    activity_type: error
                }
            })
        }

        if (newActivity.t_id !== '' && newActivity.activity_type !== '') {
            this.setState({
                errors: {
                    transformer_id: {
                        error: false,
                        msg: ''
                    },
                    activity_type: {
                        error: false,
                        msg: ''
                    }
                }
            })
            this.setState({
                dialogs: {
                    ...this.state.dialogs,
                    creation: true
                }
            })
            this.props.addTransformerActivity(newActivity)
        } 
    }

    handleCloseCreationDialog = e => {
        this.setState({
            dialogs: {
                ...this.state.dialogs,
                creation: false
            }
        })
        window.location.reload()
    }

    handleOpenRevomeDialog = e => {
        this.setState({
            dialogs: {
                ...this.state.dialogs,
                remove: true
            }
        })
    }

    handleCloseRemoveDialog = e => {
        this.setState({
            dialogs: {
                ...this.state.dialogs,
                remove: false
            }
        })
    }

    handleChange = prop => e => {
        this.setState({
            [prop]: e.target.value
        })
    }

    render () {
        const { classes } = this.props
        return (
            <div className='content'>
                <Grid container spacing={24}>

                    <Dialog
                        open={this.state.dialogs.creation}
                        >
                        <DialogTitle>
                            Actividad creada correctamente
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Se creo la actividad correctamente
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button color='primary'
                                onClick={
                                    this.handleCloseCreationDialog
                                }
                                >
                                OK
                            </Button>
                        </DialogActions>
                    </Dialog>


                    <Grid item xs={12}>
                        <Typography variant='h5' component='h3' align='center'
                            style={{
                                marginBottom: '1em'
                            }}
                            >
                            ACTIVIDADES
                        </Typography>
                    </Grid>

                    <Grid item xs={12} spacing={24}>
                            <Typography variant='h5' component='h5'
                                style={{
                                    marginBottom: '1em'
                                }}
                                >
                                Nueva Actividad
                            </Typography>
                            <form className={classes.form}>
                                <Grid item xs={5} className={classes.formItem}>
                                    <FormControl variant='outlined' fullWidth>
                                        <InputLabel
                                            style={{backgroundColor: 'white'}}
                                            >
                                            Tipo
                                        </InputLabel>
                                        <Select
                                            native
                                            style={{height: '50px'}}
                                            value={this.state.activity_type}
                                            defaultValue='STAKEOUT'
                                            input={
                                                <OutlinedInput
                                                    labelWidth={50}
                                                    name='Tipo'
                                                />
                                            }
                                            onChange={this.handleChange('activity_type')}
                                        >
                                            <option value={'STAKEOUT'}>LEVANTAMIENTO</option>
                                            <option value={'LECTURE'}>LECTURA</option>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={5} className={classes.formItem}>
                                    <FormControl variant='outlined' fullWidth
                                        error={this.state.errors.transformer_id.error}
                                        >
                                        <InputLabel
                                            style={{backgroundColor: 'white'}}
                                            >
                                            Transformador
                                        </InputLabel>
                                        <Select
                                            native
                                            style={{height: '50px'}}
                                            value={this.state.transformer_id}
                                            defaultValue=''
                                            input={
                                                <OutlinedInput
                                                    labelWidth={50}
                                                    name='Transformador'
                                                />
                                            }
                                            onChange={this.handleChange('transformer_id')}
                                        >
                                            <option value=''></option>
                                            {this._renderTransformerOptions()}
                                        </Select>
                                        {this.state.errors.transformer_id.error ? (
                                            <Typography 
                                                variant='caption'
                                                color='error'
                                                align='center'
                                                >{
                                                this.state.errors.transformer_id.msg
                                            }</Typography>
                                        ) : (null)}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={2} className={classes.formItem}
                                    style={{paddingRight: 0}}
                                    >
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        fullWidth
                                        style={{
                                            height: '50px'
                                        }}
                                        onClick={this.handleAddActivity}
                                        >
                                        Crear
                                    </Button>
                                </Grid>
                            </form>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h5' component='h5'
                            style={{
                                marginBottom: '1em'
                            }}
                            >
                            Estado Actividades
                        </Typography>
                        <TransformersActivitiesList 
                        />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    apiUrl: state.api.apiUrl,
})

const mapDispatchToProps = dispatch => ({
    addTransformerActivity: (newActivity) => {
        dispatch(addTransformerActivity(newActivity))
    }
})

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(TransformersActivitiesPage))