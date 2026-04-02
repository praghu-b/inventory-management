import { createContext, useContext, useState, useEffect } from 'react'

const RoleContext = createContext()

const ROLE_STORAGE_KEY = 'inventory_user_role'

export const RoleProvider = ({ children }) => {
    const [role, setRole] = useState(() => {
        if (typeof window === 'undefined') {
            return 'admin'
        }

        const storedRole = window.localStorage.getItem(ROLE_STORAGE_KEY)
        return storedRole === 'user' ? 'user' : 'admin'
    })

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem(ROLE_STORAGE_KEY, role)
        }
    }, [role])

    const toggleRole = () => {
        setRole((prevRole) => (prevRole === 'admin' ? 'user' : 'admin'))
    }

    return (
        <RoleContext.Provider value={{ role, toggleRole }}>
            {children}
        </RoleContext.Provider>
    )
}

export const useRole = () => {
    const context = useContext(RoleContext)
    if (!context) {
        throw new Error('useRole must be used within a RoleProvider')
    }
    return context
}
