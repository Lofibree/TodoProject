import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
// import auth from 'firebase/auth'

const useAuth = () => {
    const [authUser, setAuthUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()
    const auth = getAuth()
    const handleLogout = () => {
        signOut(auth).then((res) => {
            console.log('signed out')
            navigate('/')
        })
    }

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