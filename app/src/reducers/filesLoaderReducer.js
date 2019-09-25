import {
    GET_FILES_TO_UPLOAD,
    ADD_FILE_TO_UPLOAD,
    SET_FILE_STATUS,
    CLEAN_FILES_TO_UPLOAD,
    UPLOAD_FILE,
    SET_LOADER_STATUS
} from '../actions/types'

const initialState = {
    filesToUpload: [],
    status: 'EMPTY'
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_FILES_TO_UPLOAD:
            return {
                ...state,
                filesToUpload: action.payload
            }
        case ADD_FILE_TO_UPLOAD:
            return {
                ...state,
                filesToUpload: [
                    ...state.filesToUpload,
                    {
                        name: action.name,
                        file: action.file,
                        status: action.status
                    }
                ]
            }
        case SET_FILE_STATUS: 
            return Object.assign({}, state, {
                filesToUpload: state.filesToUpload.map((file, index) => {
                    if (index === action.index){
                        return Object.assign({}, file, {
                            status: action.newStatus 
                        })
                    }
                    return file
                })
            })
        case CLEAN_FILES_TO_UPLOAD:
            return {
                ...state,
                filesToUpload: [],
                status: 'EMPTY'
            }
        case UPLOAD_FILE: 
            return Object.assign({}, state, {
                filesToUpload: state.filesToUpload.map((file, index) => {
                    if (index === action.index){
                        return Object.assign({}, file, {
                            status: 'SUCCESS'
                        })
                    }
                    return file
                })
            })
        case SET_LOADER_STATUS: 
            return {
                ...state,
                status: action.newStatus
            }
        default: 
            return state
    }
}