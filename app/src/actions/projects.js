import axios from 'axios'
import store from '../store'
import { GET_ALL_PROJECTS, GET_ERRORS } from './types'

export const getAllProjects = () => dispatch => {
    const state = store.getState()
    const api = state.api.apiUrl
    const url = `${api}/api/projects`

    axios.get(url)
        .then(response => {
            const data = response.data
            dispatch({
                type: GET_ALL_PROJECTS,
                payload: data.projects
            })
        }).catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err
            });
        })
}