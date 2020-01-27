import {
    SET_ALL_ACTIVITIES,
    SET_ALL_USERS
} from '../actions/types'

const initialState = {
    activities: [],
    users: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_ALL_ACTIVITIES:
            return {
                ...state,
                activities: action.activities
            }
        case SET_ALL_USERS:
            return {
                ...state,
                users: action.users
            }
        default:
            return state
    }
}