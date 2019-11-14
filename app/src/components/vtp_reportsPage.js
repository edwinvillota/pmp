import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import axios from 'axios'
import {
    Grid,
    Button,
    Typography
} from '@material-ui/core'
import VTPReportsTable from '../components/vtpReportsTable'
import { setVTPRequestStatus, requestVTPReports } from '../actions/vtp'

const styles = theme => ({

})

class VTPReportsPage extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount () {
        this.props.requestVTPReports('00072586')
    }

    render() {
        const {vtp_reports} = this.props.vtp
        return(
            <div className="content">
                <Grid container>
                    <Typography variant='h3'>Reportes de VTP</Typography>
                    {
                        vtp_reports.length ? (
                            <VTPReportsTable reports={vtp_reports}/>
                        ) : (null)
                    }
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
    requestVTPReports: (serial) => {
        dispatch(requestVTPReports(serial))
    }
})

export default withRouter(withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(VTPReportsPage)))