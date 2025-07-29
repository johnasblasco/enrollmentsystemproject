import { createContext, useState, useEffect } from "react";

export const RegisterContext = createContext();

export const RegisterProvider = ({ children }) => {
    const [registerData, setRegisterData] = useState({});

    // 👇 Hydrate from localStorage on first load
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setRegisterData(JSON.parse(storedUser));
        }
    }, []);

    return (
        <RegisterContext.Provider value={{ registerData, setRegisterData }}>
            {children}
        </RegisterContext.Provider>
    );
};
