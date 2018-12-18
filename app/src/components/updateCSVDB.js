import React, { Component } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
    Typography,
    Grid,
		Button,
		LinearProgress
} from '@material-ui/core'

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
		success: {
			color: 'green'
		},
		error: {
			color: 'red'
		}
})

class UpdateCSVDB extends Component {
  constructor() {
    super()
		this.state = {	
			uaProgress: false,
			uaLoad: false,
			uamessage: '',
			uamessageV: false,
			lecProgress: false,
			lecLoad: false,
			lecmessage: '',
			lecmessageV: false,
      //api: 'http://192.168.0.3:5000/'
      api: 'http://localhost:5000/'
      //api: 'https://agile-shore-21901.herokuapp.com/'
    }
	}

	handleUpdateUA = () => {
		this.setState({
			uaProgress: true,
			uaLoad: false,
			uamessage: '',
			uamessageV: false
		})

		let fetchConf = {
			method: 'POST',
			mode: 'cors'
		}

		let url = `${this.state.api}api/dbcsv/updateCSVUA`

		fetch(url, fetchConf)
			.then(response => {
				if (response.ok) {
					response.json().then(json => {
						if (json.ok) {
							this.setState({
								uaProgress: false,
								uaLoad: true,
								uamessage: `Se actualizaron ${json.records} registros`,
								uamessageV: true
							})
						} else {
							this.setState({
								uaProgress: false,
								uaLoad: false,
								uamessage: json.err,
								uamessageV: true
							})
						}
					})
				}
			})
	}

	handleUpdateLEC = () => {
		this.setState({
			lecProgress: true,
			lecLoad: false,
			lecmessage: '',
			lecmessageV: false
		})

		let fetchConf = {
			method: 'POST',
			mode: 'cors'
		}

		let url = `${this.state.api}api/dbcsv/updateCSVLEC`

		fetch(url, fetchConf)
			.then(response => {
				if (response.ok) {
					response.json().then(json => {
						if (json.ok) {
							this.setState({
								lecProgress: false,
								lecLoad: true,
								lecmessage: `Se actualizaron ${json.records} registros`,
								lecmessageV: true
							})
						} else {
							this.setState({
								lecProgress: false,
								lecLoad: false,
								lecmessage: json.err,
								lecmessageV: true
							})
						}
					})
				}
			})
	}

  render() {
		const { classes } = this.props
		let { lecProgress, 
					uaProgress,
					uaLoad,
					uamessage,
					uamessageV,
					lecLoad,
					lecmessage,
					lecmessageV
				} = this.state

		let uamClasses

		if (uaLoad) {
			uamClasses = classNames({
				[classes.margin]: true,
				[classes.hide]: !uamessageV,
				[classes.success]: true
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
				[classes.hide]: !lecmessageV,
				[classes.success]: true
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
						<LinearProgress className={`${classes.margin} ${uaProgress ? '' : classes.hide}`} />
						<Typography variant="h6" component="h6" align='center' className={uamClasses}>
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
						<LinearProgress className={`${classes.margin} ${lecProgress ? '' : classes.hide}`} color='secondary' />
						<Typography variant="h6" component="h6" align='center' className={lecmClasses}>
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

export default withStyles(styles)(UpdateCSVDB)