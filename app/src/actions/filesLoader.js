import {
    GET_FILES_TO_UPLOAD,
    ADD_FILE_TO_UPLOAD,
    SET_FILE_STATUS,
    CLEAN_FILES_TO_UPLOAD,
    UPLOAD_FILE,
    SET_LOADER_STATUS
} from './types'

export const addFileToUpload =  (name, file, status = 'LOADED') => {
    return {
        type: ADD_FILE_TO_UPLOAD,
        name,
        file,
        status
    }
}

export const setFileStatus = (index, newStatus) => {
    return {
        type: SET_FILE_STATUS,
        index,
        newStatus
    }
}

export const cleanFilesToUpload = () => {
    return {
        type: CLEAN_FILES_TO_UPLOAD
    }
}

export const uploadFile = (index) => {
    return {
        type: UPLOAD_FILE,
        index
    }
}

export const setLoaderStatus = (newStatus) => {
    return {
        type: SET_LOADER_STATUS,
        newStatus
    }
}