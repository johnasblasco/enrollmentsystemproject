import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const OAuthCallback2 = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const token = params.get('token')
        const user = params.get('user')

        if (token && user) {
            try {
                const userData = JSON.parse(decodeURIComponent(user))

                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(userData))

                navigate('/dashboard') // or wherever you want to redirect
            } catch (error) {
                console.error('Failed to parse user', error)
            }
        } else {
            navigate('/') // fallback
        }
    }, [navigate])

    return <div className="p-5 text-center">Logging you in...</div>
}

export default OAuthCallback2
