import React, { useEffect, useState } from 'react';
import { Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { doc } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Spinner } from '@nextui-org/react';

export default function AuthRoute(props) {

    const auth = getAuth();
    console.log(auth);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            setLoading(false);
            if (!user) {
                console.log('Usuario no autenticado:', user);
                return navigate("/iniciar-sesion");
            } 
        });
        
    })

    if (loading) {
        return (
            <>
            <div className="flex justify-center container p-4 mx-auto">
                <Spinner color="success" />
            </div>
            </>
        )
    }

    return props.children;
}