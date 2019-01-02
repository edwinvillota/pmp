import { GET_ALL_PROJECTS } from '../actions/types'

const initialState = {
    projects: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_PROJECTS:
            return {
                ...state,
                projects: action.payload
            }
        default:
            return state
    }
}