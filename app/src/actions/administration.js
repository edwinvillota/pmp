import axios from 'axios'
import store from '../store'
import {
    GET_ALL_USERS
} from './types'

export const getAllUsers = () => dispatch => {
    const state = store.getState()
    const api = state.api.apiUrl
    const url = `${api}/api/users`

    axios.get(url)
        .then(response => {
            const data = response.data
            dispatch({
                type: GET_ALL_USERS,
                payload: data.users
            })
        })
        .catch(err => {
            console.log(err)
        })

    return {
        type: GET_ALL_USERS
    }
}

export const deleteUser = (id) => dispatch => {

}