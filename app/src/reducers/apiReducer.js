import { GET_API_URL } from '../actions/types'

const initialState = {
    apiUrl: 'http://localhost:5000'
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_API_URL:
            return {
                ...state,
                apiUrl: action.payload
            }
        default:
            return state
    }
}
