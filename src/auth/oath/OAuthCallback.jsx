import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const OAuthCallback = () => {
    const navigate = useNavigate()
    const { search } = useLocation()

    useEffect(() => {
        const params = new URLSearchParams(search)
        const token = params.get('token')
        const user = params.get('user')

        if (token && user) {
            localStorage.setItem('token', token)
            localStorage.setItem('user', user)
            navigate('/dashboard')
        } else {
            // show error or redirect to login
        }
    }, [search])

    return <p>Signing you in...</p>
}

export default OAuthCallback
