import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import axios from 'axios'
import {
    Grid,
    Button,
    Typography,
    TextField,
    InputAdornment,
    CircularProgress
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import VTPReportsTable from '../components/vtpReportsTable'
import { setVTPRequestStatus, requestVTPReports } from '../actions/vtp'
import * as XLSX from 'xlsx'

const styles = theme => ({
    textField: {
        marginRight: 20
    }
})

class VTPReportsPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            vtpNumber: 0,
            init_date: Date.now(),
            end_date: Date.now(),
            status: 'idle'
        }
    }

    componentDidMount () {
        
    }

    handleSearch = () => {
        const {
            init_date,
            end_date
        } = this.state
        const vtpNumber = `000${this.state.vtpNumber}`
        this.props.requestVTPReports(vtpNumber, init_date, end_date);
        this.setState({
            status: 'success'
        })
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    }

    handleExport = () => {
        const {vtp_reports} = this.props.vtp

        if (vtp_reports.length) {

            const headers = ['VTP','Fecha','IP']
            
            for (let i = 1; i < 22; i++) {
                headers.push(`CT-${i} V`)
                headers.push(`CT-${i} A`)
                headers.push(`CT-${i} Kwh`)
            }

            const rows = vtp_reports.map(report => {
                const row = [report.serial,report.date,report.ip]
                report.cts.forEach(ct => {
                    row.push(ct.voltage)
                    row.push(ct.current)
                    row.push(ct.consumption)
                });
                return row
            })

            rows.unshift(headers)

            const worksheet = XLSX.utils.aoa_to_sheet(rows);
            const new_workbook = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(new_workbook, worksheet, "SheetJS")
    
            const csv = XLSX.utils.sheet_to_csv(worksheet)
            
            const blob = new Blob([csv], {type: "data:text/csv;charset=utf-8,"})
            const blobUrl = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.download = 'Consulta.csv'
            link.href = blobUrl
            link.dataset.dowloadurl = ['text/csv', link.download, link.href].join(":")
            link.click()
        }
    }

    render() {
        const { classes } = this.props
        const {vtp_reports} = this.props.vtp
        const {
            vtpNumber,
            init_date,
            end_date,
            status
        } = this.state
        return(
            <div className="content">
                <Grid container>
                    <Grid xs={12} style={{paddingTop: 20, paddingBottom: 20}}>
                        <Typography variant='display1'>Reportes VTP</Typography>
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            className={classes.textField}
                            label='Número de VTP'
                            value={vtpNumber}
                            onChange={this.handleChange('vtpNumber')}
                            InputProps={{
                                startAdornment: <InputAdornment position='start'>000</InputAdornment>
                            }}
                            />
                        <TextField 
                            className={classes.textField}
                            label='Fecha Inicial'
                            type='date'
                            value={init_date}
                            onChange={this.handleChange('init_date')}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField 
                            className={classes.textField}
                            label='Fecha Final'
                            type='date'
                            value={end_date}
                            onChange={this.handleChange('end_date')}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <Button
                            color='secondary'
                            variant='contained'
                            style={{height: '100%'}}
                            onClick={this.handleSearch}
                            >
                            {
                                status === 'searching' ? (
                                    <CircularProgress color='white' size={20} style={{marginRight: 10}}/>
                                ) : (
                                    <SearchIcon/>
                                )
                            }
                            Buscar
                        </Button>
                    </Grid>
                    <Grid xs={12}>
                    {
                        (vtp_reports.length && status === 'success') ? (
                            <VTPReportsTable 
                                reports={vtp_reports} 
                            />
                        ) : (
                            <Typography
                                align='center'
                                variant='h3'
                                style={{
                                    margin: 50
                                }}
                                >
                                No hay información para mostrar
                            </Typography>
                        )
                    }
                    </Grid>
                    <Grid xs={12}>
                        <Button
                            variant='contained'
                            color='primary'
                            style={{marginTop: 20, marginBottom: 20}}
                            onClick={this.handleExport}
                        >
                            Exportar
                        </Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

VTPReportsPage.propTypes = {
    apiUrl: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    apiUrl: state.api.apiUrl,
    vtp: state.vtp,
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({
    requestVTPReports: (serial, init_date, end_date) => {
        dispatch(requestVTPReports(serial, init_date, end_date))
    }
})

export default withRouter(withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(VTPReportsPage)))