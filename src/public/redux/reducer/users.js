import { AsyncStorage } from 'react-native';

const initialState = {
    userList: [],
    isLoading: false,
    isFulfilled: false,
    isRejected: false,
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case 'POST_REGIST_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            }
        case 'POST_REGIST_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'POST_REGIST_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                userList: action.payload.data.result,
            }
        case 'POST_SIGN_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            }
        case 'POST_SIGN_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'POST_SIGN_FULFILLED':
            AsyncStorage.setItem('data', action.payload.data.result)
            AsyncStorage.setItem('Userid', action.payload.data.result.id_user.toString())
            AsyncStorage.setItem('Cardid', action.payload.data.result.id_card.toString())
            AsyncStorage.setItem('Token', action.payload.data.result.token)
            AsyncStorage.setItem('Name', action.payload.data.result.fullname)
            AsyncStorage.setItem('Verified', action.payload.data.result.is_verified.toString())
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                userList: action.payload.data.result,
            }
        case 'LOGOUT_USER_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            }
        case 'LOGOUT_USER_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'LOGOUT_USER_FULFILLED':
            AsyncStorage.clear()
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                userList: action.payload.data.result,
            }
        case 'GET_USER_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            }
        case 'GET_USER_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'GET_USER_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                userList: action.payload.data.result,
            }
        case 'DELETE_USER_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulfilled: false,
                isRejected: false,
            }
        case 'DELETE_USER_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'DELETE_USER_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                userList: action.payload.data.result,
            }
        default:
            return state
    }
};

export default user