import axios from 'axios'
import {
    SET_ALL_ACTIVITIES,
    SET_ALL_USERS
} from './types'


export const addTransformerActivity = newActivity => {
    return (dispatch, getState) => {
        const api = getState().api.apiUrl
        const endpoint = `${api}/api/transformer/${newActivity.t_id}/activity`

        axios.post(endpoint, {
            newActivity
        })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
    }
}

export const delTransformerActivity = activity_id => {
    return (dispatch, getState) => {
        const api = getState().api.apiUrl
        const endpoint = `${api}/api/transformer/activity/${activity_id}`

        axios.delete(endpoint)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const assignTransformerActivity = (activity_id, user_id) => {
    return (dispatch, getState) => {
        const api = getState().api.apiUrl
        const endpoint = `${api}/api/transformer/activity/${activity_id}/assign`

        axios.put(endpoint, {
            user_id: user_id
        })
            .then(response => {
                window.location.reload()
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const breakfreeTransformerActivity = (activity_id) => {
    return (dispatch, getState) => {
        const api = getState().api.apiUrl
        const endpoint = `${api}/api/transformer/activity/${activity_id}/breakfree`

        axios.put(endpoint)
            .then(response => {
                window.location.reload()
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const getAllTransformersActivities = () => {
    return (dispatch, getState) => {
        const api = getState().api.apiUrl
        const endpoint = `${api}/api/transformers/activities`

        axios.get(endpoint)
            .then(response => {
                const activities = response.data
                dispatch(setAllTransformersActivities(activities))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const setAllTransformersActivities = (activities) => {
    return {
        type: SET_ALL_ACTIVITIES,
        activities
    }   
}

export const getAllUsers = () => {
    return (dispatch, getState) => {
        const api = getState().api.apiUrl
        const endpoint = `${api}/api/users`

        axios.get(endpoint)
            .then(response => {
                const users = response.data.users
                dispatch(setAllUsers(users))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const setAllUsers = (users) => {
    return {
        type: SET_ALL_USERS,
        users
    }
}