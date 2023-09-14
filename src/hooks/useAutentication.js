import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../FirebaseConfig';

export function useAuthentication() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const unsubscribeFromAuthStateChanged = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
    });
    
    return unsubscribeFromAuthStateChanged;
  }, []);
  

  return user;
}