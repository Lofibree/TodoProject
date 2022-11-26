import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

/**
 * hook для авторизации, login, logout и редиректов
 * @returns {object} user, loading, logout
 */
const useAuth = () => {
    const [authUser, setAuthUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()
    const auth = getAuth()

    /**
     * logout и редирект
     */
    const handleLogout = () => {
        signOut(auth).then(() => {
            console.log('signed out')
            navigate('/')
        })
    }

    /**
     * Проверка на авторизацию
     * @param {object} authState 
     */
    const authStateChangedHandler = (authState) => {
        if (!authState) {
            console.log('user is not logged in')
            navigate('/')
            setAuthUser(null)
            setLoading(false)
        } else {
            console.log('welcome back')
            setAuthUser(authState)
            setLoading(false)
        }
    }
    useEffect(() => {
        const unSubscribe = auth.onAuthStateChanged(authStateChangedHandler)
        return () => {
            unSubscribe()
        }
    }, [])
    return {
        user: authUser,
        loading: loading,
        logout: handleLogout
    };
};

export default useAuth;