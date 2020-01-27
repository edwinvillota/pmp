import {
    SET_ALL_TRANSFORMERS,
    DELETE_TRANSFORMER
} from '../actions/types'

const initialState = {
    transformers: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_ALL_TRANSFORMERS:
            return {
                ...state,
                transformers: action.transformers
            }
        case DELETE_TRANSFORMER:
            return {
                ...state,
                transformers: state.transformers.filter(t => t._id !== action.t_id)
            }
        default:
            return state
    }
}