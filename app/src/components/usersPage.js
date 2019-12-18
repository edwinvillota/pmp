import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import {
    Grid, 
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Avatar,
    IconButton,
    Paper
} from '@material-ui/core'
import {
    Person,
    Delete,
    Edit
} from '@material-ui/icons'
import {
    getAllUsers
} from '../actions/administration'
import axios from 'axios'
import AddUser from '../components/addUser'

const styles = theme => ({
    
})

class UserPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            errors: {}
        }
    }

    componentDidMount () {
        this.props.getAllUsers()
    }

    handleDeleteUser = id => e => {
        const endpoint = `${this.props.apiUrl}/api/users/${id}`
        
        axios.delete(endpoint)
        
        console.log(id)
    }

    handleEditUser = id => e => {
        console.log(id)
    }

    handleAddUser = user => {
        const endpoint = `${this.props.apiUrl}/api/users`
        axios.post(endpoint, {newUser: user})
            .then(response => {
                console.log(response.json)
            })
            .catch(err => {
                this.setState({
                    errors: err.response.data
                })
            })
    }

    render () {
        const { users } = this.props.administration

        const userItems = users.map((u,i) => (
            <ListItem key={i}>
                <ListItemAvatar>
                    <Avatar>
                        <Person />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={`${u.name} ${u.lastname}`}
                    secondary={`${u.CC}`}
                />
                <ListItemSecondaryAction>
                    <IconButton 
                        aria-label="Edit"
                        onClick={this.handleEditUser(u._id)}
                        >
                        <Edit/>
                    </IconButton>
                    <IconButton 
                        aria-label="Delete"
                        onClick={this.handleDeleteUser(u._id)}
                        >
                        <Delete/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        ))

        return (
            <div className='content'>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Typography variant='display1'>
                            Administrar Usuarios
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper style={{
                            padding: 20,
                            height: '100%'
                            }}>
                            <Typography
                                variant='headline'
                                align='center'
                                style={{
                                    marginBottom: 10
                                }}
                                >
                                Usuarios Activos
                            </Typography>
                            <List>
                                {userItems}
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper style={{padding: 20}}>
                            <AddUser 
                                handleAddUser={this.handleAddUser}
                                errors={this.state.errors}
                                />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    apiUrl: state.api.apiUrl,
    administration: state.administration
})

const mapDispatchToProps = dispatch => ({
    getAllUsers: () => {
        dispatch(getAllUsers())
    }
})

export default withRouter(withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(UserPage)))