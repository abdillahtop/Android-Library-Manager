import axios from 'axios'

export const postRegister = (data) => {
    return {
        type: 'POST_REGIST',
        payload: axios.post(`https://api-library-abdi.herokuapp.com/user/register`, data)
    }
}

export const postLogin = (data) => {
    return {
        type: 'POST_SIGN',
        payload: axios.post(`http://localhost:2000/user/login`, data)
    }
}

export const Logout = (userId) => {
    console.log("userid:", userId)
    return {
        type: 'LOGOUT_USER',
        payload: axios.post(`http://localhost:2000/user/logout/${userId}`)
    }
}

export const getUser = (Token, UserId) => {
    return {
        type: 'GET_USER',
        payload: axios.get(`http://localhost:2000/user`, {
            headers: {
                'x-access-token': "bearer " + Token,
                'x-control-user': UserId
            }
        })

    }
}

export const delUser = (userId) => {
    console.log("userid:", userId)
    return {
        type: 'DELETE_USER',
        payload: axios.delete(`http://localhost:2000/user/${userId}`)
    }
}
