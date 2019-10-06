import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
    Grid,
    Button,
    Typography
} from '@material-ui/core'
import {setFileStatus, setLoaderStatus} from '../actions/filesLoader'
import CustomTable from './customTable'

const styles = theme => ({
    button: {
        marginTop: theme.spacing.unit,
      },
    hide: {
      display: 'none'
      },
    dropArea: {
        display: 'flex',
        flexDirection: 'row',
        height: '200px',
        margin: 'theme.spacing.unit',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,.1)',
        borderRadius: '5px',
        border: 'dashed 3px #888',
        cursor: 'pointer',
        transition: 'all linear .2s',
        '&:hover': {
            backgroundColor: 'rgba(0,0,0,.5)',
            borderColor: '#333'
        }
    },
    dropAreaText: {
        display: 'block',
        pointerEvents: 'none'
    },
    label: {
        width: '100%',
        height: '100%'
    },
    onDrag: {
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    fileTypeText: {
        display: 'inline-block',
        margin: theme.spacing.unit,
    },
    successColor: {
        color: '#0BA748'
    },
    errorColor: {
        color: '#E82E2E'
    }
})

class UploadCSVButton extends Component {
    constructor() {
        super ()
        this.state = {
            fileLoaded: false,
            file: false,
        }
    }

    handleChange = e => {
        const file = e.target.files[0]
        this.setState({
            fileLoaded: true,
            file: file
        })
    }

    handleDragOver = e => {
        e.preventDefault()
        const target = e.target
        target.classList.add(this.props.classes.onDrag)
    }

    handleDragLeave = e => {
        e.preventDefault()
        const target = e.target
        target.classList.remove(this.props.classes.onDrag)
    }

    handleDrop = e => {
        e.preventDefault()
        const target = e.target
        target.classList.remove(this.props.classes.onDrag)
        let file
        if (typeof e.dataTransfer === 'undefined'){
            file = e.target.files[0]
        } else {
            file = e.dataTransfer.files[0]
        }
        if (file.type === 'text/csv') {
            this.setState({
                fileLoaded: true,
                file: file
            })
        }
    }

    handleLoad = e => {
        e.preventDefault()
        this.props.handleUpload(this.state.file)
    }

    render() {
        const {
            classes,
            fileType
        } = this.props

        let fileText
        let fileTextClasses
        let fileKeys = []
        let fileData = []

        if (fileType) {
            if (!fileType.error) {
                fileText = `Archivo de ${fileType.name} Cargado.`
                fileTextClasses = classNames(classes.fileTypeText, classes.successColor)
                fileKeys = fileType.keys
                fileData = fileType.data 
            } else {
                fileText = `El Archivo no fue reconocido.`
                fileTextClasses = classNames(classes.fileTypeText, classes.errorColor)
            }
        }

        return(
          <Grid item xs={12} >
            <label 
                htmlFor='file_input' 
                className={classes.dropArea}
                onDragOver={this.handleDragOver}
                onDragLeave={this.handleDragLeave}
                onDrop={this.handleDrop}
                >
                <input
                    accept='text/csv'
                    id='file_input'
                    className={classes.hide}
                    type='file'
                    onChange={this.handleChange}
                    >
                </input>
                <Typography className={classes.dropAreaText} variant='display1'>
                    {this.state.fileLoaded ? this.state.file.name : 'ARRASTRE Y SUELTE SU ARCHIVO'}
                </Typography>
            </label>
            <Button 
                variant='contained' 
                color='primary' 
                className={classes.button}
                onClick={this.handleLoad}
                >
                CARGAR
            </Button>
            <Typography 
                className={fileTextClasses}
                variant='subtitle1'
                >
                {fileText}
            </Typography>
            <CustomTable 
                headers={fileKeys}
                data={fileData}
            />
          </Grid>
        )
    }
}

UploadCSVButton.propTypes = {
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    apiUrl: state.apiUrl,
    filesLoader: state.filesLoader
})

const mapDispatchToProps = dispath => ({
    setFileStatus: (index, newStatus) => {
        dispath(setFileStatus(index, newStatus))
    },
    setLoaderStatus: (newStatus) => {
        dispath(setLoaderStatus(newStatus))
    }
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(UploadCSVButton))