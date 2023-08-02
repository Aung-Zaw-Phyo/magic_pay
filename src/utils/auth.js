import { redirect } from "react-router-dom"

export const getToken = () => {
    const token = localStorage.getItem('token')
    return token
}

export const authFormMiddleware = () => {
    const token = getToken()
    if(token) {
        return redirect('/')
    }
    return token
}

export const checkToken = () => {
    const token = getToken()
    if(token) {
        return token
    }else {
        return redirect('/login')
    }
}