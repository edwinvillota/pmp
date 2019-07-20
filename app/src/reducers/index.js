import { combineReducers } from 'redux'
import errorReducer from './errorReducer'
import authReducer from './authReducer'
import projectsReducer from './projectsReducer'
import apiReducer from './apiReducer'
import filesLoaderReducer from './filesLoaderReducer'

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  projects: projectsReducer,
  api: apiReducer,
  filesLoader: filesLoaderReducer
})
