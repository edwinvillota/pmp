import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
    Grid,
    Paper,
    Typography,
    Button
} from '@material-ui/core'
import { Doughnut } from 'react-chartjs-2'
import 'chartjs-plugin-annotation'

const styles = theme => ({
    consoleStatus: {
        color: 'white'
    },
    consoleLineSuccess: {
        marginLeft: '20px',
        color: '#4E9525'
    },
    consoleLineError: {
        marginLeft: '20px',
        color: '#EA5455'
    },
    uploadButton: {
        marginTop: '1em',
        width: '100%'
    }
})

class UpdateCSVInfo extends Component {
    constructor() {
        super()
        this.state = {
            visible: false
        }
    }

    handleUploadRecords = (e) => {
        this.props.handleUploadRecords()
    }
 
    render () {
        const {
            classes,
            dataStatus,
            uploadStatus
        } = this.props
        const graphData = {
            labels: ['OK','Pendientes', 'Error'],
            datasets: [
                {
                    label: 'Registros',
                    backgroundColor: ['#4E9525','#2D4059','#EA5455'],
                    data: [dataStatus.OK,dataStatus.Pending,dataStatus.Error]
                }
            ]
        }
        return (
            <Grid container>
                <Grid container spacing={16}>
                    <Grid item xs={6}>
                        <Paper>
                            <Doughnut data={graphData} height={150}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper style={{backgroundColor: '#333333', height: '100%', padding:'1em', overflow: 'hidden'}}>
                            <Typography className={classes.consoleStatus}>{uploadStatus}</Typography>
                            <Typography variant='caption' className={classes.consoleLineSuccess}>> Record:1 User: 125658 Status: OK</Typography>
                            <Typography variant='caption' className={classes.consoleLineError}>> Record:2 User: 105758 Status: ERROR</Typography>
                            <Typography variant='caption' className={classes.consoleLineSuccess}>> Record:3 User: 155858 Status: OK</Typography>
                            <Typography variant='caption' className={classes.consoleLineSuccess}>> Record:4 User: 135258 Status: OK</Typography>
                            <Typography variant='caption' className={classes.consoleLineSuccess}>> Record:5 User: 225658 Status: OK</Typography>
                            <Typography variant='caption' className={classes.consoleLineError}>> Record:6 User: 525658 Status: ERROR</Typography>
                            <Typography variant='caption' className={classes.consoleLineSuccess}>> Record:1 User: 125658 Status: OK</Typography>
                            <Typography variant='caption' className={classes.consoleLineError}>> Record:2 User: 105758 Status: ERROR</Typography>
                            <Typography variant='caption' className={classes.consoleLineSuccess}>> Record:3 User: 155858 Status: OK</Typography>
                            <Typography variant='caption' className={classes.consoleLineSuccess}>> Record:4 User: 135258 Status: OK</Typography>
                            <Typography variant='caption' className={classes.consoleLineError}>> Record:6 User: 525658 Status: ERROR</Typography>
                            <Typography variant='caption' className={classes.consoleLineSuccess}>> Record:3 User: 155858 Status: OK</Typography>
                            <Typography variant='caption' className={classes.consoleLineSuccess}>> Record:4 User: 135258 Status: OK</Typography>
                            <Typography variant='caption' className={classes.consoleLineSuccess}>> Record:5 User: 225658 Status: OK</Typography>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Button 
                        className={classes.uploadButton} 
                        color='primary' 
                        variant='contained'
                        onClick={this.handleUploadRecords}
                        >
                            SUBIR
                    </Button>
                </Grid>
            </Grid>
        )
    }
}
export default withStyles(styles)(UpdateCSVInfo)