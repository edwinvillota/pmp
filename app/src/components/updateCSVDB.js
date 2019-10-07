import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles'
import {
    Typography,
    Grid,
	Button,
	LinearProgress,
	Chip,
	Avatar,
	ButtonBase,
	Grow
} from '@material-ui/core'
import {setLoaderStatus, setFileStatus} from '../actions/filesLoader'
import socketClient from 'socket.io-client'
import UploadCSVButton from './uploadCSVButton'
import FilesUploader from './filesUploader'
import UpdateCSVInfo from './updateCSVInfo'

const styles = theme => ({
    root: {
      display: 'flex',
			flexWrap: 'wrap',
			flexGrow: 1
    },
    margin: {
			margin: theme.spacing.unit,
			width: '100%'
    },
    button: {
      height: '100px',
      width: '100%',
      margin: theme.spacing.unit,
    },
    textField: {
      flexBasis: 200,
      width: '100%',
		},
		hide: {
			display: 'none'
		},
		error: {
			color: 'red'
	},
	chip: {
		margin: theme.spacing.unit,
		marginLeft: '20px',
		transition: 'all 1s ease-in'
		}, 
	connected: {
		backgroundColor: 'rgb(9.8%, 67.9%, 9.8%)',
		color: 'white',
		transition: 'all 1s ease-in'
	}	
	
})

class UpdateCSVDB extends Component {
  constructor() {
    super()
	this.state = {	
			socket: false,
			fileLoaded: false,
			fileType: '',
			dataLoaded: [],
			uploadStatus: 'WAITING...',
			dataStatus: {
				OK: 0,
				Pending: 0,
				Error: 0
			}
		}
	}

	componentDidMount () {
		const endpoint = this.props.apiUrl.replace('5000','4001')
		const socket = socketClient(endpoint)
		socket.on('connect', () => {
			this.setState({
				socket: socket
			})
		})
		socket.on('uploadCSVStatus', (status) => {
			this.setState({
				uploadStatus: status
			})
		})
		socket.on('recordsCSVStatus', (status) => {
			this.setState({
				dataStatus: status
			})
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

	handleLoadFile = e => {
		const { filesToUpload } = this.props.filesLoader
		const endpoint = `${this.props.apiUrl}/api/dbcsv/loadCSV`
		const base64 = filesToUpload[0].file
		const blob = this.dataURItoBlob(base64)
		const formData = new FormData()
		formData.append('file', blob)
		axios.post(endpoint, formData)
			.then(json => {
				if (json.statusText === 'OK') {
					this.props.setFileStatus(0, 'SUCCESS')
					this.props.setLoaderStatus('SUCCESS')
					this.setState({
						fileLoaded: true,
						fileType: json.data.name,
						dataLoaded: json.data.data,
						dataStatus: {
							OK: 0,
							Pending: json.data.data.length,
							Error: 0
						}
					})
				}
			}).catch(err => {
				console.log(err)
			})
	}

	handleUploadRecords = async () => {
		const {dataLoaded, dataStatus, fileType} = this.state 
		let endpoint = `${this.props.apiUrl}`
		if (fileType === 'Usuarios Asociados') {
			endpoint += '/api/dbcsv/addUA' 
		} else if (fileType === 'Lecturas') {
			endpoint += '/api/dbcsv/addLEC'
		} else {
			alert('Este tipo de archivo no tiene metodo de carga')
			return
		}
		const blob = this.dataURItoBlob(this.props.filesLoader.filesToUpload[0].file)
		const formData = new FormData()
		formData.append('file', blob)
		axios.post(endpoint, formData)
			.then(json => {
				console.log(json)
			})
			.catch(err => {
				console.log(err)
			})
	}

	render() {
		const { classes } = this.props
		const { socket, fileLoaded, fileType, dataLoaded, dataStatus, uploadStatus } = this.state
		const filesLoaderStatus = this.props.filesLoader.status
					
		return(
		<div className='content'>
				<Grid container spacing={8}>
					<Grid item xs={12}>
						<Typography variant="h4" component="h4" align='center'>
							ACTUALIZAR BASES DE DATOS
						</Typography>
						<Chip
							avatar={
							<Avatar
								className = {classNames({
									[classes.connected] : socket
								})}
							>WS
							</Avatar>
							}
							label='WebSocket'
							className = {classNames({
								[classes.chip]: true,
							})}
						/>
					</Grid>
					<Grid item xs={12}>
						<FilesUploader
							typeFile='text/csv'
							icon='List'
							multiple={false}
							handleUpload={this.handleLoadFile}
						/>
						{
							fileLoaded && filesLoaderStatus === 'SUCCESS' ? <Typography align='center' variant='caption'>{`Se ha cargado un archivo de tipo: ${fileType} con ${dataLoaded.length} registros`}</Typography> : null
						}
					</Grid>
					<Grow in={fileLoaded && filesLoaderStatus === 'SUCCESS'}>
						<Grid item xs={12}>
							<UpdateCSVInfo 
								fileType = {fileType}
								dataStatus={dataStatus}
								uploadStatus={uploadStatus}
								handleUploadRecords={this.handleUploadRecords}
								/>
						</Grid>
					</Grow>
				</Grid>
		</div>
		)
	}
}

UpdateCSVDB.propTypes = {
	classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    apiUrl: state.api.apiUrl,
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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(UpdateCSVDB))
