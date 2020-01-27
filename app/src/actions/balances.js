import axios from 'axios'

import {
    SET_ALL_TRANSFORMERS,
    DELETE_TRANSFORMER
} from './types'

export const getAllTransformers = () => {
    return async (dispatch, getState) => {
        const api = getState().api.apiUrl
        const endpoint = `${api}/api/transformers`

        const data = await axios.get(endpoint)
        dispatch(setAllTransformers(data.data))
    }
}

export const setAllTransformers = (transformers) => {
    return {
        type: SET_ALL_TRANSFORMERS,
        transformers
    }
}

export const deleteTransformerRecord = (t_id) => {
    return async (dispatch, getState) => {
        const api = getState().api.apiUrl
        const endpoint = `${api}/api/transformer/${t_id}`
        const result = await axios.delete(endpoint)
        console.log(result)
        dispatch(deleteTransformer(t_id))
    }
}

export const deleteTransformer = (t_id) => {
    return {
        type: DELETE_TRANSFORMER,
        t_id
    }
}
