import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
    Grid,
    Button,
    Typography,
    Table,
    TableBody,
    TableHead,
    TablePagination,
    TableRow,
    TableCell,
    Paper
} from '@material-ui/core'

const styles = theme => ({
    root: {

    }
})

class TransformerUsersTable extends Component {

    render () {
        const { users } = this.props
        console.log(users)
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Medidor</TableCell>
                        <TableCell>Marca</TableCell>
                        <TableCell>Código</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        users.map((user, i) => (
                            <TableRow key={i}>
                                <TableCell component='th' scope='row'>
                                    {user.medidor}
                                </TableCell>
                                <TableCell >{user.marca}</TableCell>
                                <TableCell >{user.codigo}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        )
    }
}

export default withStyles(styles)(TransformerUsersTable)