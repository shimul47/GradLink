import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init'



const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signInUser = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  // google sign in
  const googleSignIn = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }

  const signOutUser = () => {
    setLoading(true)
    return signOut(auth)
  }

  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData)
  }


  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log('Current user inside:', currentUser);
      setUser(currentUser);

      setLoading(false);
    });

    return () => unSubscribe();
  }, []);


  const userInfo = {
    user,
    loading,
    setUser,
    createUser,
    signInUser,
    googleSignIn,
    signOutUser,
    updateUser
  }

  return (

    <AuthContext value={userInfo}>
      {children}
    </AuthContext>
  );
};


export default AuthProvider;