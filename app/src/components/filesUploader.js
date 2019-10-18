import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
    addFileToUpload,
    setFileStatus,
    cleanFilesToUpload,
    uploadFile,
    setLoaderStatus
 } from '../actions/filesLoader'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
    Grid,
    Button,
    Typography,
    CircularProgress
} from '@material-ui/core'
import {
    InsertDriveFile,
    List
} from '@material-ui/icons'
import {
    green
} from '@material-ui/core/colors'

const styles = theme => ({
    hide: {
        display: 'none'
    },
    dropArea: {
        display: 'flex',
        flexDirection: 'row',
        margin: 'theme.spacing.unit',
        alignItems: 'center',
        justifyContent: 'center',
        backgroudColor: 'rgba(0,0,0,.1)',
        boderRadius: '5px',
        border: 'dashed 3px #888',
        cursor: 'pointer',
        transition: 'all linear .2s',
        width: '100%',
        minHeight: '10em',
        marginBottom: '.5em',
        overflow: 'hidden',
        padding: '.5em',
        '&:hover': {
            borderColor: 'black'
        }
    },
    dropAreaText: {
        pointerEvents: 'none'
    },
    onDragOver: {
        borderColor: '#DF320D'
    },
    filesContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        backgroudColor: 'white',
        pointerEvents: 'all'
    },
    fileItem: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '6em',
        height: '7em',
        overflow: 'hidden',
        borderRadius: '5px',
        backgroundColor: 'white',
        boxShadow: '0px 0px 5px rgba(0,0,0,.5)',
        margin: '.5em',
        opacity: '0',
        tranformOrigin: 'center',
        transform: 'translate(20em,0) scale(0, 0)',
        transition: 'opacity .3s ease-in, transform .2s linear',
    },
    fileItemIcon: {
        transition: 'color .5s ease-in'
    },
    fileItemIconLoaded: {
        color: '#878787',
        fontSize: '3em'
    },
    fileItemIconUploading: {
        color: '#CCC',
        fontSize: '3em'
    },
    fileItemIconSuccess: {
        color: green[500],
        fontSize: '3em'
    },
    buttonSuccess: {
        color: 'white',
        backgroundColor: green[500],
        '$:hover': {
            color: green[500],
            borderColor: green[500],
        }
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12
    },
    visible: {
        transform: 'translate(0,0) scale(1, 1)',
        opacity: '1'
    },
    buttonWrapper: {
        width: '100%',
        marginBottom: '.5em',
        position: 'relative'
    },
    button: {
        width: '100%',
    },
})

class FilesUploader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            typeFile: this.props.typeFile,
            multiple: this.props.multiple,
            icon: this.props.icon,
            iconColor: this.props.iconColor
        }
    }

    // On load files
    handleChange = e => {
        const files = e.target.files
        Array.from(files).forEach((file, i) => {
            let fileReader = new FileReader()
            fileReader.onload = () => {
                this.props.setLoaderStatus('WAITING')
                this.props.addFileToUpload(`${file.name}`, fileReader.result)
            }
            fileReader.readAsDataURL(file)
        })
    }

    handleClick = e => {
        if (this.props.filesLoader.filesToUpload.length !== 0) {
            this.props.cleanFilesToUpload()
        }    
    }

    handleDragOver = e => {
        e.preventDefault()
        if (this.props.filesLoader.filesToUpload.length !== 0) {
            this.props.cleanFilesToUpload()
        }      
        e.target.classList.add(this.props.classes.onDragOver)
    }

    handleDragLeave = e => {
        e.preventDefault()
        e.target.classList.remove(this.props.classes.onDragOver)
    }

    handleDrop = e => {
        const { multiple } = this.state
        e.preventDefault()
        this.props.cleanFilesToUpload()
        e.target.classList.remove(this.props.classes.onDragOver)
        let files 
        if (typeof e.dataTransfer === 'undefined') {
            files = e.target.files
        } else {
            files = e.dataTransfer.files
        }
        e.target.value=''
        Array.from(files).forEach((file,i) => {
            if (!multiple && i > 0) return false
            let fileReader = new FileReader()
            fileReader.onload = () => {
                this.props.setLoaderStatus('WAITING')
                this.props.addFileToUpload(`${file.name}`, fileReader.result)
            }
            fileReader.readAsDataURL(file)
        })
    }

    handleUploadFiles = e => {
        e.preventDefault()
        this.props.setLoaderStatus('UPLOADING')
        this.props.handleUpload()
    }

    render() {
        const {classes} = this.props
        const { 
            filesToUpload,
            status
        } = this.props.filesLoader
        const {
                typeFile,
                icon
            } = this.state
        const buttonClassName = classNames({
            [classes.buttonSuccess]: (status === 'SUCCESS')
        })
        const fileItems = (filesToUpload.length > 0) ? filesToUpload.map((file,key) => {
            return(
                <FileItem classes={classes} key={key} id={key} file={file} icon={icon}/>
            )
        }) : false

        return(
            <Grid container>
                <Grid
                    item
                    xs={12}
                    >
                    <label
                        htmlFor='files_input'
                        className={classes.dropArea}
                        onDragOver={this.handleDragOver}
                        onDragLeave={this.handleDragLeave}
                        onDrop={this.handleDrop}
                        onClick={this.handleClick}
                        >
                        <input
                            accept={typeFile}
                            id='files_input'
                            className={classes.hide}
                            type='file'
                            multiple={this.state.multiple}
                            onChange={this.handleChange}
                            />
                        <Grid
                            item
                            xs={12}
                            className={classes.filesContainer}
                            >
                            <Typography
                                variant='caption' 
                                className={classes.dropAreaText}>
                                {(filesToUpload.length === 0) ? 'Arratre su archivo aqui.' : false}
                            </Typography>
                            {fileItems}
                        </Grid>
                    </label>
                    <div className={classes.buttonWrapper}>
                        <Button
                            variant={(status === 'SUCCESS') ? 'contained' : 'outlined'}
                            color='primary'
                            className={classNames(buttonClassName, classes.button)} 
                            onClick={this.handleUploadFiles}
                            disabled={(status === 'UPLOADING' || status === 'EMPTY')}
                            >
                                Cargar
                            {(status === 'UPLOADING') && <CircularProgress size={24} className={classes.buttonProgress} />}
                        </Button>
                    </div>
                </Grid>
            </Grid>
        )
    }
}

class FileItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id,
            name: this.props.file.name,
            file: this.props.file.file,
            status: this.props.file.status,
            classes: this.props.classes,
            visible: false,
            icon: this.props.icon
        }
    }

    componentDidMount(){
        setTimeout(() => {
            this.setState({
                visible: true
            })
        },(this.state.id - 1)*50)
    }

    render() {
        const {classes} = this.props
        const {id, name, visible, icon} = this.state
        const {status} = this.props.file


        let iconClass
        switch (status) {
            case 'LOADED':
                iconClass = classes.fileItemIconLoaded
                break
            case 'UPLOADING':
                iconClass = classes.fileItemIconUploading
                break
            case 'SUCCESS':
                iconClass = classes.fileItemIconSuccess
                break                    
            default:
                break
        }

        const Icon = () => {
            switch (icon) {
                case 'InsertDriveFile':
                    return (
                        <InsertDriveFile className={classNames(classes.fileItemIcon, iconClass)}/>
                    )
                case 'List':
                    return (
                        <List className={classNames(classes.fileItemIcon, iconClass)}/>
                    )
                default:
                    break;
            }
        }

        return(
            <div 
                className={classNames(classes.fileItem, {[`${classes.visible}`]: visible})}
                >
                {Icon()}
                <Typography variant='caption'>{`Archivo ${id + 1}`}</Typography>
                <Typography variant='caption' align='center'>{name}</Typography>
                {(status === 'UPLOADING') && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
        )
    }
}

FilesUploader.propTypes = {
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    filesLoader: state.filesLoader
})

const mapDispatchToProps = dispatch => ({
    addFileToUpload: (name, file, status) => {
        dispatch(addFileToUpload(name, file, status))
    },
    cleanFilesToUpload: () => {
        dispatch(cleanFilesToUpload())
    },
    setFileStatus: (index, newStatus) => {
        dispatch(setFileStatus(index, newStatus))
    },
    uploadFile: (index) => {
        dispatch(uploadFile(index))
    },
    setLoaderStatus: (newStatus) => {
        dispatch(setLoaderStatus(newStatus))
    }
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(FilesUploader))