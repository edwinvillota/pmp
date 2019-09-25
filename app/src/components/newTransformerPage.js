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
    TextField,
    Divider,
    FormControl,
    InputLabel,
    Select,
    FilledInput,
    OutlinedInput
} from '@material-ui/core'
import {
    setFileStatus,
    setLoaderStatus
} from '../actions/filesLoader'
import axios from 'axios'
import FilesUploader from './filesUploader'
import * as XLSX from 'xlsx'
import TransformerUsersTable from './trasformerUsersTable'
import PaginationTable from './paginationTable'

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        width: '100%',
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: '.5em'
    },
    formItem: {
        marginBottom: '1em',
        paddingRight: '1em'
    }
})

class NewTransformerPage extends Component {
    constructor() {
        super()
        this.state = {
            structure: '',
            town: 1,
            macro: '',
            kva: '',
            ratio: '',
            users: [],
            errors: {
                structure: {
                    status: false,
                    msg: ''
                },
                macro: {
                    status: false,
                    msg: ''
                },
                kva: {
                    status: false,
                    msg: ''
                },
                ratio: {
                    status: false,
                    msg: ''
                }
            }
        }
    }

    handleSendTransformer = e => {
        e.preventDefault()
        const { 
            structure, 
            town,
            macro,
            kva,
            ratio,
            users
        } = this.state 
        const endpoint = `${this.props.apiUrl}/api/transformers`

        axios.post(endpoint, {
            structure: structure, 
            town: town,
            macro: macro,
            kva: kva,
            ratio: ratio,
            users: users
        })
            .then(json => {
                console.log(json)
            }).catch(err => {
                console.log(err)
            })
    }

    dataValidator = e => {
        e.preventDefault()
        let isValidData = true
        const {
            structure, 
            town,
            macro,
            kva,
            ratio,
            users
        } = this.state

        let errors = {}
        // Structure validations
        if (structure.length < 10 || structure.length > 10) {
            errors = {
                ...errors,
                structure: {
                    status: true,
                    msg: 'La estructura debe tener 7 Caracteres'
                }
            }
            isValidData = false
        }

        // Town validations

        // Macro validations
        if (!(typeof macro === 'string') || macro.length !== 7) {
            errors = {
                ...errors,
                macro: {
                    status: true,
                    msg: 'El serial del macromedidor debe tener 7 digitos'
                }
            }
            isValidData = false
        }

        // Kva validations
        if (kva.trim().length === 0) {
            errors = {
                ...errors,
                kva: {
                    status: true,
                    msg: 'Ingrese el KVA del transformador'
                }
            }
            isValidData = false
        }

        // Ratio validations
        if (ratio.trim().length === 0) {
            errors = {
                ...errors,
                ratio: {
                    status: true,
                    msg: 'Ingrese el ratio de los transformadores de corriente'
                }
            }
            isValidData = false
        }

        this.setState({
            errors: errors
        })

        if (isValidData) {
            this.handleSendTransformer(e)
        }
    } 

    dataURItoBlob = (dataURI) => {
        let byteString = atob(dataURI.split(',')[1]);
        let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
        let ab = new ArrayBuffer(byteString.length);
        let ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        let blob = new Blob([ab], {type: mimeString});
        return blob;
    }

    handleUploadUsers = e => {
        //Leer usuarios
        const { filesToUpload } = this.props.filesLoader
        const usersData = filesToUpload[0]
        const usersBlob = this.dataURItoBlob(usersData.file)
        const reader = new FileReader()

        reader.onload = () => {
            const wb = XLSX.read(reader.result, {type: 'binary'})
            const wsname = wb.SheetNames[0]
            const ws = wb.Sheets[wsname]
            const data = XLSX.utils.sheet_to_json(ws, {header:2})
            this.props.setFileStatus(0, 'SUCCESS')
            this.props.setLoaderStatus('SUCCESS')
            this.setState({
                users: data
            })
        }
        reader.readAsBinaryString(usersBlob)
    }

    handleChange = prop => event => {
        const value = event.target.value.toUpperCase()
        this.setState({ [prop]: value })
    }

    render() {
        const { classes } = this.props
        const { users, errors } = this.state

        return (
            <div className='content'>
                <Grid container className={classes.root}>
                    <Paper className={classes.root}>
                        <Typography variant='h4' component='h3' align='center'>
                            NUEVO TRANSFORMADOR
                        </Typography><br/><br/>
                        <Typography variant='h5' component='h3' align='left'>
                            Información del transformador
                        </Typography>
                        <Divider/><br/>
                        <Grid item xs={12}>
                                <form className={classes.form}>
                                    <Grid item xs={4} className={classes.formItem}>
                                        <TextField 
                                            fullWidth
                                            id='structure'
                                            label='Estructura'
                                            variant='outlined'
                                            onChange={this.handleChange('structure')}
                                            value={this.state.structure}
                                            error={errors.structure.status}
                                            helperText={errors.structure.status ? errors.structure.msg : ''}
                                            />
                                    </Grid>
                                    <Grid item xs={4} className={classes.formItem}>
                                        <FormControl variant='outlined' fullWidth>
                                            <InputLabel
                                                style={{backgroundColor: 'white'}}
                                                >
                                                Municipio
                                            </InputLabel>
                                            <Select
                                                native
                                                input={
                                                    <OutlinedInput
                                                        labelWidth={50}
                                                        name='Municipio'
                                                    />
                                                }
                                                value={this.state.town}
                                                onChange={this.handleChange('town')}
                                            >
                                                <option value={1}>PASTO</option>
                                                <option value={2}>TUMACO</option>
                                                <option value={3}>LA UNION</option>
                                                <option value={4}>LA CRUZ</option>
                                                <option value={5}>BELEN</option>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4} className={classes.formItem}>
                                        <TextField 
                                            fullWidth
                                            type='number'
                                            id='macromedidor'
                                            label='Macromedidor'
                                            variant='outlined'
                                            onChange={this.handleChange('macro')}
                                            value={this.state.macro}
                                            error={errors.macro.status}
                                            helperText={errors.macro.status ? errors.macro.msg : ''}
                                            />
                                    </Grid>
                                    <Grid item xs={4} className={classes.formItem}>
                                        <TextField
                                            fullWidth
                                            type='number'
                                            id='Kva'
                                            label='Kva'
                                            variant='outlined'
                                            onChange={this.handleChange('kva')}
                                            value={this.state.kva}
                                            error={errors.kva.status}
                                            helperText={errors.kva.status ? errors.kva.msg : ''}
                                            />
                                    </Grid>
                                    <Grid item xs={4} className={classes.formItem}>
                                        <TextField
                                            fullWidth
                                            type='number'
                                            id='ratio'
                                            label='Ratio'
                                            variant='outlined'
                                            onChange={this.handleChange('ratio')}
                                            value={this.state.ratio}
                                            error={errors.ratio.status}
                                            helperText={errors.ratio.status ? errors.ratio.msg : ''}
                                            />
                                    </Grid>
                                </form>
                        </Grid>
                        <Typography variant='h5' component='h3' align='left'>
                            Usuarios
                        </Typography>
                        <Divider/><br/>
                        <Grid item xs={12}>
                            <FilesUploader
                                typeFile='application/xlsx'
                                multiple={false}
                                handleUpload={this.handleUploadUsers}
                                icon='List'
                                />
                        </Grid>
                        <Grid item xs={12}>
                            {
                                users.length ? (
                                    <PaginationTable users={users}/>
                                    // <TransformerUsersTable users={users} />
                                ) : null
                            }
                        </Grid>
                        <Grid item xs={12} style={{marginTop: '1em'}}>
                            <Button
                                variant='outlined'
                                color='secondary'
                                fullWidth
                                onClick={this.dataValidator}
                                disabled={!(this.props.filesLoader.status === 'SUCCESS')}
                            >
                                Crear Transformador
                            </Button>
                        </Grid>
                    </Paper>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    apiUrl: state.api.apiUrl,
    filesLoader: state.filesLoader
})

const mapDispatchToProps = dispatch => ({
    setFileStatus: (index, newStatus) => {
        dispatch(setFileStatus(index, newStatus))
    },
    setLoaderStatus: (newStatus) => {
        dispatch(setLoaderStatus(newStatus))
    }
})

export default withRouter(withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(NewTransformerPage)))