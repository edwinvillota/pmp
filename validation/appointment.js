import Validator from 'validator'
import isEmpty from './isEmpty'

const ValidateAppointment = {}

ValidateAppointment.add = data => {
  let errors = {}
  data.name = !isEmpty(data.name) ? data.name : ''
  data.description = !isEmpty(data.description) ? data.description : ''

  // Name
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 to 30 chars'
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required'
  }
  // Description
  if (!Validator.isLength(data.description, { min: 8, max: 100 })) {
    errors.description = 'Name must be between 8 to 100 chars'
  }
  if (Validator.isEmpty(data.description)) {
    errors.description = 'Description field is required'
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}

export default ValidateAppointment
