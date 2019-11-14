import React, { Component } from 'react'
import {
  Grid,
  Paper,
  Typography
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import LecturesGraphic from './lecturesGraphic'
import ActualStateGraphic from './actualStateGraphic'

const styles = theme => ({
  paper: {
    padding: '1em',
    height: '100%'
  }
})

class Home extends Component {
  render() {
    const { classes } = this.props
    return (
      <Grid container className='content' spacing={16}>
        <Grid item xs={12}>
          <Typography variant='title'>MEDICIÓN CENTRALIZADA</Typography>
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            <Typography variant='subtitle1'>COMPORTAMIENTO DE COMUNICACIÓN</Typography>
            <LecturesGraphic type='MEC' lastRecords={60}/>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <Typography variant='subtitle1'>ESTADO ACTUAL</Typography>
            <ActualStateGraphic type='MEC'/>
          </Paper>          
        </Grid>
        <Grid item xs={12}>
          <Typography variant='title'>MEDICIÓN INTELIGENTE</Typography>
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            <Typography variant='subtitle1'>COMPORTAMIENTO DE COMUNICACIÓN</Typography>
            <LecturesGraphic type='MIT' lastRecords={60}/>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <Typography variant='subtitle1'>ESTADO ACTUAL</Typography>
            <ActualStateGraphic type='MIT'/>
          </Paper>          
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Home)