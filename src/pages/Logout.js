import { redirect } from "react-router-dom"
import { getToken } from "../utils/auth"

export const loader = async () => {
    await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        }
    })
    localStorage.removeItem('token')
    return redirect('/login')
}