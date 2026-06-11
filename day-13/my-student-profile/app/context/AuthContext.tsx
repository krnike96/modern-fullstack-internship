'use client'

import React, { createContext, useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { logoutAction } from '@/app/actions/auth'

interface AuthContextType {
    logout: () => Promise<void>
    isLoggingOut: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const logout = async () => {
        try {
            setIsLoggingOut(true)
            await logoutAction()
            router.push('/login')
        } catch (error) {
            console.error('Logout error:', error)
        } finally {
            setIsLoggingOut(false)
        }
    }

    return (
        <AuthContext.Provider value={{ logout, isLoggingOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}