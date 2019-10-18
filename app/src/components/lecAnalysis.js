import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
    Grid,
    Paper,
    Typography,
    AppBar,
    Tabs,
    Tab,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views'
import {Bar} from 'react-chartjs-2'

const styles = theme => ({
    title: {
        borderRadius: '5px 5px 0 0',
        backgroundColor: 'black',
        color: 'white',
        padding: '.2em 1em'
    },
    tabsHeader: {
    }
})

class LecAnalysis extends Component {
    constructor() {
        super()
        this.state = {
            visible: false,
            tab: 0
        }
    }

    handleChange = (event, tab) => {
        this.setState({
            tab: tab
        })
    }

    handleChangeIndex = index => {
        this.setState({value: index})
    }

    render () {
        const {
            classes,
            theme,
            lecStatus
        } = this.props

        const currentStatusData = {
            labels: ['En Linea', 'Fuera de Linea'],
            backgroundColor: ['red','blue'] ,
            datasets: [
                {
                    label: 'Centralizada',
                    backgroundColor: ['#0056EC','#00163C'],
                    data: [lecStatus.mec.online,lecStatus.mec.offline]
                },
                {
                    label: 'Inteligente',
                    backgroundColor: ['#00CE70','#00371E'],
                    data: [lecStatus.mit.online,lecStatus.mit.offline]
                }
            ]
        }

        return (
            <Grid container spacing={16}>
                <Grid item xs={12}>
                    <Typography variant='subheading' className={classes.title}>
                        ANÁLISIS DE LECTURAS 
                    </Typography>
                    <AppBar position='static' color='default'>
                        <Tabs
                            value={this.state.tab}
                            indicatorColor='secondary'
                            textColor='secondary'
                            variant='fullWidth'
                            onChange={this.handleChange}
                        >
                            <Tab label='Estado Actual'/>
                            <Tab label='Usuarios sin comunicación'/>
                            <Tab label='Avance'/>

                        </Tabs>
                    </AppBar>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={this.state.tab}
                        onChangeIndex={this.handleChangeIndex}
                    >
                        <Paper style={{padding: '1em'}}>
                            <Grid container spacing={16}>
                                <Grid item xs={8}>
                                    <Bar data={currentStatusData}/>
                                </Grid>
                                <Grid item xs={4}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell colSpan={3} align='center'>
                                                    ESTADO DE LA COMUNICACIÓN
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell colSpan={3} style={{backgroundColor: '#CCCCCC'}}>
                                                    Medida Centralizada
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Usuarios</TableCell>
                                                <TableCell>Online</TableCell>
                                                <TableCell>Offline</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>{lecStatus.mec.online + lecStatus.mec.offline}</TableCell>
                                                <TableCell>{lecStatus.mec.online}</TableCell>
                                                <TableCell>{lecStatus.mec.offline}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell colSpan={3} style={{backgroundColor: '#CCCCCC'}}>
                                                    Medida Inteligente
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Usuarios</TableCell>
                                                <TableCell>Online</TableCell>
                                                <TableCell>Offline</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>{lecStatus.mit.online + lecStatus.mit.offline}</TableCell>
                                                <TableCell>{lecStatus.mit.online}</TableCell>
                                                <TableCell>{lecStatus.mit.offline}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Grid>
                            </Grid>
                        </Paper>
                        <Typography>Usuarios sin Lectura</Typography>
                        <Typography>Avance de Lecturas</Typography>
                    </SwipeableViews>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles, { withTheme: true })(LecAnalysis)