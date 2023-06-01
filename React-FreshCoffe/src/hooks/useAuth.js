import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import clientAxios from '../config/axios'



export const useAuth = ({ middleware, url }) => {

    const token = localStorage.getItem('AUTH_TOKEN')
    const navigate = useNavigate()
    
    const {data: user, error, mutate} = useSWR('/api/user', () => 
        clientAxios('/api/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.data)
        .catch(error => {
            throw Error(error?.response?.data?.errors)
        })
    )

    const login = async (datas, setErrors) => {
        try {
            const { data } = await clientAxios.post('/api/login', datas)
            localStorage.setItem('AUTH_TOKEN', data.token)
            setErrors([])
            await mutate()
        } catch (error) {
            setErrors(Object.values(error.response.data.errors))
        }
    }
    const register = async (datas, setErrors) => {
        try{
            const {data} = await clientAxios.post('/api/register', datas)
            localStorage.setItem('AUTH_TOKEN', data.token)
            setErrors([])
            await mutate()
        } catch (error) {
            setErrors(Object.values(error.response.data.errors))
        }
    }

    const logout = async () => {
        try {
            await clientAxios.post('/api/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            localStorage.removeItem('AUTH_TOKEN')
            await mutate(undefined)
        } catch (error) {
            throw Error(error?.response?.data?.errors)
        }
    }

    useEffect(() => {
        if(middleware === 'guest' && url && user){
            navigate(url)
        }
        if(middleware === 'auth' && error){
            navigate('/auth/login')
        }
    }, [user, error])

    
    return {
        login,
        register,
        logout,
        user,
        error
    }
}