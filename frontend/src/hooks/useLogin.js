import { useState } from "react";
import { useAuthContext } from './useAuthContext.js';

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // save user in local storage to persist login status if user closes browser without logging out
            localStorage.setItem('user', JSON.stringify(json))

            //update auth context & loading state
            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false);
        }
    }

    return {login, isLoading, error}
}