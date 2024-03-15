import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Loading from './Loading';
import { Spinner } from '@nextui-org/react';

export default function AuthAdminRoute(props) {
  const auth = getAuth();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          const userRole = userData.rol;
          setUserRole(userRole);

          if (userRole === 'admin') {
            setLoading(false);
            return;
          }
        }
      }
      navigate('/perfil');
    });
    return () => unsubscribe();
  }, [auth, navigate]);

  return loading ? (
    <div className="flex justify-center container p-4 mx-auto">
      <Spinner color="success" />
    </div>
  ) : userRole === 'admin' ? (
    props.children
  ) : null;
}