import { combineReducers } from 'redux'
import errorReducer from './errorReducer'
import authReducer from './authReducer'
import projectsReducer from './projectsReducer'
import apiReducer from './apiReducer'
import filesLoaderReducer from './filesLoaderReducer'
import vtpReducer from './vtpReducer'
import administrationReducer from './administrationReducer'
import balancesReducer from './balancesReducer'
import transformerActivities from './transformerActivitiesReducer'

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  projects: projectsReducer,
  api: apiReducer,
  filesLoader: filesLoaderReducer,
  vtp: vtpReducer,
  administration: administrationReducer,
  balances: balancesReducer,
  transformerActivities: transformerActivities
})
