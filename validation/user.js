import Validator from 'validator'
import isEmpty from './isEmpty'

const ValidateUser = {}

ValidateUser.register = data => {
  let errors = {}
  data.name = !isEmpty(data.name) ? data.name : ''
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''
  data.password_confirm = !isEmpty(data.password_confirm) ? data.password_confirm : ''

  // Identification
  if (!Validator.isLength(data.CC, { min: 7, max: 10 })) {
    errors.CC = 'Identification must be between 7 to 10 digits'
  }

  if (!Validator.isNumeric(data.CC)) {
    errors.CC = 'Identification must be numeric'
  }

  // Name
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 to 30 chars'
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required'
  }

  // Lastname
  if (!Validator.isLength(data.lastname, { min: 2, max: 30 })) {
    errors.lastname = 'Name must be between 2 to 30 chars'
  }

  if (Validator.isEmpty(data.lastname)) {
    errors.lastname = 'Name field is required'
  }

  // Appointment
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required'
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must have 6 chars'
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required'
  }

  if (!Validator.isLength(data.password_confirm, { min: 6, max: 30 })) {
    errors.password_confirm = 'Password and Confirm Password must match'
  }

  if (!Validator.equals(data.password, data.password_confirm)) {
    errors.password_confirm = 'Password must have'
  }

  if (Validator.isEmpty(data.password_confirm)) {
    errors.password_confirm = 'Password is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

ValidateUser.login = data => {
  let errors = {}
  data.CC = !isEmpty(data.CC) ? data.CC : ''
  data.password = !isEmpty(data.password) ? data.password : ''

  // Identification
  if (!Validator.isLength(data.CC, { min: 7, max: 10 })) {
    errors.CC = 'La identificación debe tener entre 7 y 10 digitos.'
  }

  if (!Validator.isNumeric(data.CC)) {
    errors.CC = 'La identificación debe ser numerica.'
  }
  // Password
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Digite su password.'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

export default ValidateUser
