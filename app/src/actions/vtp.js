import axios from 'axios'
import {
    SET_VTP_REQUEST_STATUS,
    UPDATE_VTP_REPORTS
} from './types'

export const setVTPRequestStatus = (newStatus) => {
    return {
        type: SET_VTP_REQUEST_STATUS,
        payload: newStatus
    }
}

export const requestVTPReports = (serial) => {
    return (dispatch, getState) => {
        dispatch(setVTPRequestStatus(1))
        const {apiUrl} = getState().api
        const endpoint = `${apiUrl}/api/vtp_reports`
        axios.get(endpoint)
        return axios.get(endpoint)
            .then(response => {
                const data = response.data
                dispatch(setVTPRequestStatus(2))
                dispatch(updateVTPReports(data))
            })
            .catch(err => {
                console.log(err)
                dispatch(setVTPRequestStatus(3))
            })
    }
}

export const updateVTPReports = (reports) => {
    return {
        type: UPDATE_VTP_REPORTS,
        payload: reports
    }
}