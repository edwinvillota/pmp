import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
    FormControl,
    TextField,
    Typography,
    Button
} from '@material-ui/core'


const styles = theme => ({
    textField: {
        marginBottom: 10
    }
})

class AddUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cc: '',
            name: '',
            lastname: '',
            appointment: '',
            email: '',
            password: '',
            confirm_password: ''
        }
    }

    handleChangeProp = prop => event => {
        this.setState({
            [prop]: event.target.value
        })
    }

    handleSubmit = event => {
        const {
            cc,
            name,
            lastname,
            appointment,
            email,
            password,
            confirm_password,
        } = this.state

        const newUser = {
            CC: cc,
            name,
            lastname,
            appointment,
            email,
            password,
            password_confirm: confirm_password
        }

        this.props.handleAddUser(newUser)
    }

    render () {
        const { classes, errors } = this.props
        return (
            <form>
                <Typography
                    variant='headline'
                    align='center'
                    style={{
                        marginBottom: 20,
                    }}
                    >
                    Agregar Usuario
                </Typography>
                <FormControl 
                    fullWidth
                    >
                    <TextField
                        variant='outlined'
                        placeholder='Cédula'
                        label='Cédula'
                        className={classes.textField}
                        onChange={this.handleChangeProp('cc')}
                        error={errors.CC ? true : false}
                        />
                    <TextField
                        variant='outlined'
                        placeholder='Nombre'
                        label='Nombre'
                        className={classes.textField}
                        onChange={this.handleChangeProp('name')}
                        error={errors.name ? true : false}
                        />
                    <TextField
                        variant='outlined'
                        placeholder='Lastname'
                        label='Apellido'
                        className={classes.textField}
                        onChange={this.handleChangeProp('lastname')}
                        error={errors.lastname ? true : false}
                        />
                    <TextField
                        variant='outlined'
                        placeholder='Cargo'
                        label='Cargo'
                        className={classes.textField}
                        onChange={this.handleChangeProp('appointment')}
                        error={errors.appointment ? true : false}
                        />
                    <TextField
                        variant='outlined'
                        placeholder='Correo'
                        label='Email'
                        className={classes.textField}
                        onChange={this.handleChangeProp('email')}
                        error={errors.email ? true : false}
                        />
                    <TextField
                        variant='outlined'
                        placeholder='Contraseña'
                        label='Contraseña'
                        type='password'
                        className={classes.textField}
                        onChange={this.handleChangeProp('password')}
                        error={errors.password ? true : false}
                        />
                    <TextField
                        variant='outlined'
                        placeholder='Contraseña'
                        label='Confirmar Contraseña'
                        type='password'
                        className={classes.textField}
                        onChange={this.handleChangeProp('confirm_password')}
                        error={errors.password_confirm ? true : false}
                        />
                </FormControl>
                <FormControl
                    fullWidth
                    >
                    <Button
                        fullWidth
                        variant='contained'
                        color='primary'
                        onClick={this.handleSubmit}
                        >
                        Agregar
                    </Button>
                </FormControl>
            </form>
        )
    }
}

export default withStyles(styles, {withTheme: true})(AddUser)