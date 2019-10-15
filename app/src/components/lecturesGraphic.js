import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles'
import {
    Grid
} from '@material-ui/core'
import {
    Line
} from 'react-chartjs-2'
import moment from 'moment'

const styles = theme => ({
})

class LecuresGraphic extends Component {
    constructor() {
        super()
        this.state = {
            labels: [],
            total: [],
            online: [],
            offline: []
        }
    }

    componentDidMount() {
        const api = `${this.props.apiUrl}/api/analysis/getLecStatus`
        const {type, lastRecords} = this.props
        const endpoint = `${api}/${type}/${lastRecords}`

        axios.get(endpoint)
            .then(response => {
                let labels = []
                let total = []
                let online = []
                let offline = []

                const records = response.data.records
                records.reverse().forEach(r => {
                    const date = moment(r.fecha_estado).format("DD-MM-YYYY")

                    labels.push(date)
                    total.push(r.total_usuarios)
                    online.push(r.usuarios_online)
                    offline.push(r.usuarios_offline)
                })

                this.setState({
                    labels: labels,
                    total: total,
                    online: online,
                    offline: offline
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const {
            labels,
            total,
            online,
            offline
        } = this.state

        const graphData = {
            labels: labels,
            backgroundColor: ['yellow'],
            datasets: [
                {
                    label: 'Offline',
                    borderColor: 'rgba(255,74,131,1)',
                    backgroundColor: 'rgba(255,74,131,.6)',
                    data: offline
                },
                {
                    label: 'Online',
                    borderColor: 'rgba(2,132,207,1)',
                    backgroundColor: 'rgba(2,132,207,.6)',
                    data: online
                },
                {
                    label: 'Total',
                    borderColor: 'rgba(217,220,222,1)',
                    backgroundColor: 'rgba(217,220,222,.5)',
                    data: total
                },
            ]
        }
        return (
            <Line data={graphData} height={100}/>    
        )
    }
}

const mapStateToProps = (state) => ({
    apiUrl: state.api.apiUrl
})

export default withStyles(styles)(connect(mapStateToProps)(LecuresGraphic))