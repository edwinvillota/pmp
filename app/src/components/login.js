import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginUser } from '../actions/authentication'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Button from '@material-ui/core/Button'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      CC: '',
      password: '',
      showPassword: false,
      errors: {}
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  }

  handleInputChange(e) {
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = {
        CC: this.state.CC,
        password: this.state.password,
    }
    this.props.loginUser(user)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.isAuthenticated) {
      this.props.history.push('/')
    }
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/')
    }
  }

  render() {
    const {errors} = this.state
    return(
      <div className="content">
          <Typography variant="h3" component="h3" align='center'>
            Ingreso a usuarios.
          </Typography>
          <form onSubmit={ this.handleSubmit }>
              <div className="form-group">
                  <TextField
                    required
                    error={errors.CC ? true : false}
                    id="outlined-with-placeholder"
                    label="Identificación"
                    placeholder="Identificación"
                    margin="normal"
                    variant="outlined"
                    style={{width: '100%'}}
                    name="CC"
                    onChange={ this.handleInputChange }
                    value={ this.state.CC }
                  />
                  {errors.CC && (<Typography variant='caption'>{errors.CC}</Typography>)}
              </div>
              <div className="form-group">
                  <TextField
                    required
                    error={errors.password ? true : false}
                    id="outlined-adornment-password"
                    variant="outlined"
                    type={this.state.showPassword ? 'text' : 'password'}
                    label="Password"
                    name="password"
                    style={{width: '100%', marginTop: '10px'}}
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Toggle password visibility"
                            onClick={this.handleClickShowPassword}
                          >
                            {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
              </div>
              <div className="form-group" style={{float: 'none', textAlign: 'center'}}>
                <Button variant="contained" color="primary" type="submit"
                  style={{
                    marginTop: '10px'
                  }}
                  >
                  Acceder
                </Button>
              </div>
          </form>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login)
