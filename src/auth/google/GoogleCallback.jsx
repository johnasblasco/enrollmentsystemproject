// src/pages/GoogleCallback.jsx

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

const GoogleCallback = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const token = urlParams.get("token")
        const userParam = urlParams.get("user")

        if (token && userParam) {
            const user = JSON.parse(decodeURIComponent(userParam))

            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))

            Swal.fire({
                title: "Google Login Successful!",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                navigate("/dashboard")
            })
        } else {
            Swal.fire({
                title: "Login failed!",
                icon: "error"
            })
        }
    }, [])

    return <div className="text-center mt-10">Processing login...</div>
}

export default GoogleCallback
