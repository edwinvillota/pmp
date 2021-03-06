import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import FilesUploader from './filesUploader'
import OrderDataList from './orderDataList'
import {
    setFileStatus,
    setLoaderStatus
} from '../actions/filesLoader'
import socketClient from 'socket.io-client'

const styles = theme => ({
    
})

class TestPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fileType: false,
            results: [],
            socket: false
        }
    }

    componentDidMount() {
        const endpoint = this.props.apiUrl.replace('5000','4001')
        const socket = socketClient(endpoint)
        socket.on('connect', () => {
            this.setState({
                socket: socket
            })
        })
    }

    handleUploadFile = () => {
        const { filesToUpload } = this.props.filesLoader
        const { socket } = this.state
        this.setState({
            results: []
        })
        socket.on('ordersData', data => {
            let { results } = this.state
            results.push(data)
            this.setState({
                results: results
            })
            this.props.setFileStatus(data.index, data.status)
            if(data.index === filesToUpload.length - 1) {
                this.props.setLoaderStatus('SUCCESS')
            }
        })
        filesToUpload.forEach((file, i) => {
            this.props.setFileStatus(i, 'UPLOADING')
            file.index = i
            file.user = this.props.auth.user.CC
            socket.emit('orderPDF', file)
        })
    }

    render() {
        // const section_names = {
        //     1: 'DATOS_ODT',
        //     2: 'INFORMACION_BASICA',
        //     3: 'MEDIDOR_SITIO',
        //     4: 'INFORMACION_PREDIO',
        //     5: 'PRUEBAS_MEDIDOR',
        //     6: 'CONEXION_EN_BORNES',
        //     7: 'PRUEBAS_ACOMETIDA',
        //     8: 'GEOREFERENCIACION',
        //     9: 'AFORO',
        //     10: 'ACCIONES_TOMADAS',
        //     11: 'PAGARE',
        //     12: 'FINALIZACION'
        // }

        return (
        <div className='content'>
            <FilesUploader 
                typeFile='application/pdf'
                handleUpload={this.handleUploadFile}
                />
            <OrderDataList orders={this.state.results} />
        </div>
        )
    }
}

TestPage.propTypes = {
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    apiUrl: state.api.apiUrl,
    filesLoader: state.filesLoader
})

const mapDispatchToProps = dispatch => ({
    setFileStatus: (index, newStatus) => {
        dispatch(setFileStatus(index, newStatus))
    },
    setLoaderStatus: (newStatus) => {
        dispatch(setLoaderStatus(newStatus))
    }
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TestPage))