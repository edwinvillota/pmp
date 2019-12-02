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

export const requestVTPReports = (serial, init_date, end_date) => {
    return (dispatch, getState) => {
        dispatch(setVTPRequestStatus(1))
        dispatch(updateVTPReports([]))
        const {apiUrl} = getState().api
        const endpoint = `${apiUrl}/api/vtp_reports`
        return axios.get(endpoint, {
            params: {
                serial: serial,
                init_date: init_date,
                end_date: end_date
            }
        })
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