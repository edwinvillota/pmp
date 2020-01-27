import React, { Component } from 'react'
import { connect } from 'react-redux'
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
    OutlinedInput,
    FormControlLabel,
    Switch

} from '@material-ui/core'
import {
    setFileStatus,
    setLoaderStatus
} from '../actions/filesLoader'
import axios from 'axios'
import FilesUploader from './filesUploader'
import * as XLSX from 'xlsx'
import PaginationTable from './paginationTable'
import { CheckBox } from '@material-ui/icons'
import classnames from 'classnames'

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
    },
    success_button: {
        backgroundColor: 'green',
        color: 'white'
    },
    error_button: {
        backgroundColor: 'red',
        color: 'white'
    }
})

class NewTransformerPage extends Component {
    constructor() {
        super()
        this.state = {
            structure: '',
            town: '',
            address: '',
            kva: '',
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
                },
                address: {
                    status: false,
                    msg: ''
                }
            },
            haveMacro: true,
            macro: '',
            ratio: '',
            newMacro: 'NO',
            savedTransformer: false,
            saveError: false
        }
    }

    handleSendTransformer = e => {
        e.preventDefault()
        const { 
            structure, 
            town,
            address,
            kva,
            users,
            haveMacro,
            macro,
            ratio,
            newMacro
        } = this.state 
        const endpoint = `${this.props.apiUrl}/api/transformers`

        axios.post(endpoint, {
            structure: structure, 
            town: town,
            address: address,
            kva: kva,
            users: users,
            haveMacro: haveMacro,
            macro: macro,
            ratio: ratio,
            newMacro: newMacro
        })
            .then(json => {
                this.setState({
                    savedTransformer: true
                })
                alert('Transformador registrado correctamente')
            }).catch(error => {
                this.setState({
                    saveError: true
                })
                alert('Error al guardar el transformador: ' + error)
            })
    }

    dataValidator = e => {
        e.preventDefault()
        let isValidData = true
        const {
            structure, 
            macro,
            kva,
            ratio,
            haveMacro
        } = this.state

        let errors = this.state.errors
        // Structure validations
        if (structure.length > 10 || structure.length < 4) {
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
        if ((!(typeof macro === 'string') || macro.length !== 7) && haveMacro) {
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
        if (ratio.trim().length === 0 && haveMacro) {
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
                                                defaultValue={'PASTO'}
                                                input={
                                                    <OutlinedInput
                                                        labelWidth={50}
                                                        name='Municipio'
                                                    />
                                                }
                                                value={this.state.town}
                                                onChange={this.handleChange('town')}
                                            >
                                                <option value={'PASTO'}>PASTO</option>
                                                <option value={'TUMACO'}>TUMACO</option>
                                                <option value={'LA UNION'}>LA UNION</option>
                                                <option value={'LA CRUZ'}>LA CRUZ</option>
                                                <option value={'BELEN'}>BELEN</option>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4} className={classes.formItem}>
                                        <TextField 
                                            fullWidth
                                            id='address'
                                            label='Dirección'
                                            variant='outlined'
                                            onChange={this.handleChange('address')}
                                            value={this.state.address}
                                            error={errors.address.status}
                                            helperText={errors.address.status ? errors.address.msg : ''}
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

                                </form>
                        </Grid>
                        <Typography variant='h5' component='h3' align='left'>
                            Información del Macromedidor
                        </Typography>
                        <Divider /> <br/>
                        <Grid item xs={12}>
                            <form className={classes.form}>
                                <FormControlLabel
                                    style={{
                                        display: 'flex',
                                        width: '100%',
                                        justifyContent: 'center'
                                    }}
                                    control={
                                        <Switch checked={this.state.haveMacro} onChange={(event) => {
                                            this.setState({
                                                haveMacro: event.target.checked
                                            })
                                        }}/>
                                    }
                                    label='¿Tiene Macromedidor?'
                                />
                                {
                                    this.state.haveMacro 
                                    ? (
                                        <Grid container xs={12} direction='row'>
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
                                                    id='ratio'
                                                    label='Ratio'
                                                    variant='outlined'
                                                    onChange={this.handleChange('ratio')}
                                                    value={this.state.ratio}
                                                    error={errors.ratio.status}
                                                    helperText={errors.ratio.status ? errors.ratio.msg : ''}
                                                    />
                                            </Grid>
                                            <Grid item xs={4} className={classes.formItem}>
                                            <FormControl variant='outlined' fullWidth>
                                                <InputLabel
                                                    style={{backgroundColor: 'white'}}
                                                    >
                                                    Macromedidor Nuevo
                                                </InputLabel>
                                                <Select
                                                    defaultValue={'NO'}
                                                    native
                                                    input={
                                                        <OutlinedInput
                                                            labelWidth={50}
                                                            name='MacroNuevo'
                                                        />
                                                    }
                                                    value={this.state.newMacro}
                                                    onChange={this.handleChange('newMacro')}
                                                >
                                                    <option value={'SI'}>SI</option>
                                                    <option value={'NO'}>NO</option>
                                                </Select>
                                            </FormControl>
                                    </Grid>
                                        </Grid>
                                    ) 
                                    : (null)
                                }
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
                                className={classnames({
                                    [classes.success_button]: this.state.savedTransformer,
                                    [classes.error_button]: this.state.saveError
                                })}
                                fullWidth
                                onClick={this.dataValidator}
                                disabled={(!this.props.filesLoader.status === 'SUCCESS') || this.state.savedTransformer}
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