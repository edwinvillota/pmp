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
    FilledInput
} from '@material-ui/core'
import {
    setFileStatus,
    setLoaderStatus
} from '../actions/filesLoader'
import axios from 'axios'
import FilesUploader from './filesUploader'
import * as XLSX from 'xlsx'
import CustomTable from './customTable'

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
            structure: false,
            users: []
        }
    }

    handleSendTransformer = e => {
        const { structure } = this.state 
        const endpoint = `${this.props.apiUrl}/api/transformers`

        axios.post(endpoint, {structure: structure})
            .then(json => {
                console.log(json)
            }).catch(err => {
                console.log(err)
            })
            
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
            const data = XLSX.utils.sheet_to_csv(ws, {header:1})
            this.props.setFileStatus(0, 'SUCCESS')
            this.props.setLoaderStatus('SUCCESS')
            this.setState({
                users: data
            })
        }
        reader.readAsBinaryString(usersBlob)
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value })
    }

    render() {
        const { classes } = this.props
        const { users } = this.state

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
                                        <TextField fullWidth
                                            id='structure'
                                            label='Estructura'
                                            variant='filled'
                                            onKeyUp={(e) => {e.target.value = e.target.value.toUpperCase()}}
                                            onChange={this.handleChange('structure')}
                                            />
                                    </Grid>
                                    <Grid item xs={4} className={classes.formItem}>
                                        <FormControl variant='filled' fullWidth>
                                            <InputLabel>
                                                Municipio
                                            </InputLabel>
                                            <Select
                                                native
                                                input={
                                                    <FilledInput
                                                        name='Municipio'
                                                    />
                                                }
                                            >
                                                <option value={1}>PASTO</option>
                                                <option value={2}>TUMACO</option>
                                                <option value={2}>LA UNION</option>
                                                <option value={2}>LA CRUZ</option>
                                                <option value={2}>BELEN</option>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4} className={classes.formItem}>
                                        <TextField 
                                            fullWidth
                                            type='number'
                                            id='macromedidor'
                                            label='Macromedidor'
                                            variant='filled'
                                            onChange={this.handleChange('structure')}
                                            />
                                    </Grid>
                                    <Grid item xs={4} className={classes.formItem}>
                                        <TextField
                                            fullWidth
                                            type='number'
                                            id='Kva'
                                            label='Kva'
                                            variant='filled'
                                            onChange={this.handleChange('structure')}
                                            />
                                    </Grid>
                                    <Grid item xs={4} className={classes.formItem}>
                                        <TextField
                                            fullWidth
                                            type='number'
                                            id='ratio'
                                            label='Ratio'
                                            variant='filled'
                                            onChange={this.handleChange('structure')}
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
                            <Typography>{users}</Typography>
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