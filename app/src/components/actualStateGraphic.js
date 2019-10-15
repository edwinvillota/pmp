import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles'
import {
    Grid
} from '@material-ui/core'
import {
    Doughnut
} from 'react-chartjs-2'

const styles = theme => ({
})

class ActualStateGraphic extends Component {
    constructor() {
        super()
        this.state = {
            online: 0,
            offline: 0
        }
    }

    componentDidMount() {
        const api = `${this.props.apiUrl}/api/analysis/getLecStatus`
        const {type} = this.props
        const endpoint = `${api}/${type}/${0}`

        axios.get(endpoint)
            .then(json => {
                const record = json.data.records[0]
                this.setState({
                    online: record.usuarios_online,
                    offline: record.usuarios_offline
                })
            })
            .catch(err => {
                console.log(err)
            })

    }

    render() {
        const { online, offline } = this.state
        const graphData = {
            labels: ['Online','Offline'],
            datasets: [
                {
                    label: 'Usuarios',
                    backgroundColor: ['rgba(2,132,207,1)','rgba(255,74,131,1)'],
                    data: [online,offline]
                },
             ]
        }
        return (
            <Doughnut data={graphData} height={200}/>    
        )
    }
}

const mapStateToProps = (state) => ({
    apiUrl: state.api.apiUrl
})

export default withStyles(styles)(connect(mapStateToProps)(ActualStateGraphic))