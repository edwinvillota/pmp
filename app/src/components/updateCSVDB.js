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
		Avatar
} from '@material-ui/core'
import socketClient from 'socket.io-client'

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
			uaProgress: 0,
			uaTotal: 0,
			uaLoad: false,
			uamessage: '',
			uamessageV: false,
			uasUpdate: 0,
			lecProgress: 0,
			lecTotal: 0,
			lecLoad: false,
			lecmessage: '',
			lecmessageV: false,
			lecsUpdate: 0
		}
	}

	componentDidMount () {
		const endpoint = this.props.apiUrl.replace('3000','4001')
		const socket = socketClient(endpoint)
		socket.on('connect', () => {
			this.setState({
				socket: socket
			})
		})
	}

	handleUpdateUA = () => {
		const {socket} = this.state 
		this.setState({
			uaProgress: 0,
			uaTotal: 0,
			uaLoad: false,
			uamessage: '',
			uamessageV: false,
			uasUpdate: 0
		})

		let url = `${this.props.apiUrl}/api/dbcsv/updateCSVUA`

		axios.post(url)
			.then(json => {
				const data = json.data
				this.setState({
					uaLoad: true,
					uamessageV: true,
					uaTotal: data.records
				})
				socket.on('uProgress', data => {
					this.setState({
						uaProgress: (data * 100 / this.state.uaTotal),
						uasUpdate: data,
						uamessage: `Se han actualizado ${data} usuarios de ${this.state.uaTotal}`
					})
					if (data === this.state.uaTotal) {
						socket.removeAllListeners('uProgress')
					}
				})
			})
			.catch(err => {
				this.setState({
					uaProgress: false,
					uaLoad: false,
					uamessage: err,
					uamessageV: true
				})
			})
	}

	handleUpdateLEC = () => {
		const {socket} = this.state
		this.setState({
			lecProgress: 0,
			lecTotal: 0,
			lecLoad: false,
			lecmessage: '',
			lecmessageV: false,
			lecsUpdate: 0,
		})

		let url = `${this.props.apiUrl}/api/dbcsv/updateCSVLEC`

		axios.post(url)
			.then(json => {
				const data = json.data
				this.setState({
					lecLoad: true,
					lecmessageV: true,
					lecTotal: data.records
				})
				socket.on('uProgress', data => {
					this.setState({
						lecProgress: (data * 100 / this.state.lecTotal),
						lecsUpdate: data,
						lecmessage: `Se han actualizado ${data} lecturas de ${this.state.lecTotal}`
					})
					if (data === this.state.lecTotal) {
						socket.removeAllListeners('uProgress')
					}
				})
			})
			.catch(err => {
				this.setState({
					lecProgress: false,
					lecLoad: false,
					lecmessage: err,
					lecmessageV: true
				})
			})
	}

  render() {
		const { classes } = this.props
		let { 		socket,
					lecProgress, 
					uaProgress,
					uaLoad,
					uamessage,
					uamessageV,
					lecLoad,
					lecmessage,
					lecmessageV,
				} = this.state

		let uamClasses

		if (uaLoad) {
			uamClasses = classNames({
				[classes.margin]: true,
				[classes.hide]: !uamessageV
			})
		} 
		else {
			uamClasses = classNames({
				[classes.margin]: true,
				[classes.hide]: !uamessageV,
				[classes.error]: true
			})
		}

		let lecmClasses

		if (lecLoad) {
			lecmClasses = classNames({
				[classes.margin]: true,
				[classes.hide]: !lecmessageV
			})
		} 
		else {
			lecmClasses = classNames({
				[classes.margin]: true,
				[classes.hide]: !lecmessageV,
				[classes.error]: true
			})
		}

		
				
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
				<Grid item xs={6}>
					<Button
						variant="contained"
						color="primary"
						className={classes.button}
						onClick={this.handleUpdateUA}
						>
						Actualizar Usuarios Asociados 
					</Button>
					<LinearProgress className={`${classes.margin} ${uaProgress ? '' : classes.hide}`} variant='determinate' value={uaProgress} />
					<Typography variant="caption" align='center' gutterBottom className={uamClasses}>
						{uamessage}
					</Typography>
				</Grid>
				<Grid item xs={6}>
					<Button
						variant="contained"
						color="secondary"
						className={classes.button}
						onClick={this.handleUpdateLEC}
						>
						Actualizar Lecturas
					</Button>
					<LinearProgress className={`${classes.margin} ${lecProgress ? '' : classes.hide}`} color='secondary' variant='determinate' value={lecProgress}/>
					<Typography variant="caption" align='center' gutterBottom className={lecmClasses}>
						{lecmessage}
					</Typography>
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
	apiUrl: state.api.apiUrl
})

export default withStyles(styles)(connect(mapStateToProps)(UpdateCSVDB))
