import {
    UPDATE_VTP_REPORTS,
    SET_VTP_REQUEST_STATUS
} from '../actions/types'

// VTP Request status 
// 0 -> WAITING
// 1 -> REQUESTING
// 2 -> SUCCESS
// 3 -> ERROR

const initialState = {
    request_status: 0,
    vtp_reports: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_VTP_REPORTS:
            return {
                ...state,
                vtp_reports: action.payload
            }
        case SET_VTP_REQUEST_STATUS: 
            return {
                ...state,
                request_status: action.payload
            }
        default:
            return state
    }
}