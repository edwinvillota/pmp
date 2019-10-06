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
	ButtonBase
} from '@material-ui/core'
import {setLoaderStatus, setFileStatus} from '../actions/filesLoader'
import socketClient from 'socket.io-client'
import UploadCSVButton from './uploadCSVButton'
import FilesUploader from './filesUploader'

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
			fileType: ''
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
						fileType: json.data.name
					})
				}
			}).catch(err => {
				console.log(err)
			})
	}

	render() {
		const { classes } = this.props
		const { socket, fileLoaded, fileType } = this.state
					
		return(
		<div className='content'>
				<Grid container spacing={8}>
					<Grid item xs={12}>
						<Typography variant="h4" component="h4" align='center'>
							Actualización de bases de datos
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
							fileLoaded ? <Typography variant='caption'>{`Se ha cargado un archivo de tipo: ${fileType}`}</Typography> : null
						}
					</Grid>
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
