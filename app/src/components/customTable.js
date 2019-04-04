import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
    Grid
} from '@material-ui/core'
import uploadCSVButton from './uploadCSVButton';

const styles = theme => ({

})

class CustomTable extends Component {
    constructor() {
        super()
    }

    render() {
        const headers = this.props.headers.map((h, k) => {
            return (
                <th key={k}>{h}</th>
            )
        })
        let tableRows
        const data = this.props.data
        if (data.length) {
            let rows = []
            for (let i = 1; i < 5; i++) {
                rows.push(data[i])
            }
            tableRows = rows.map((r, k) => {
                const cells = headers.map((h, i) => {
                    console.log(r)
                    // console.log(h)
                    // console.log(r[h])
                    return (
                        <td key={i}>{r[h]}</td>
                    )
                })
                return(
                    <tr key={k}>
                        {cells}
                    </tr>
                )
            })
        }

        return (
            <Grid container>
                <table>
                    <tr>
                        {headers}
                    </tr>
                    <tbody>
                        {tableRows}
                    </tbody>
                </table>
            </Grid>
        )
    }
}

CustomTable.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CustomTable)