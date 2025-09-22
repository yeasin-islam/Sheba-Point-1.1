
import React, { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";


import useUserProfile from "../Hooks/useUserProfile.jsx";
import auth from "../Firebase/Firebase.init.js";
import { AuthContext } from "./AuthContext.jsx";

const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [firebaseLoading, setFirebaseLoading] = useState(true);

  // Listen to Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setFirebaseUser(currentUser);
      setFirebaseLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Load DB Profile only if Firebase User exists
  const {
    data: user,
    isPending: userLoading,
    refetch: refetchUserData,
  } = useUserProfile(firebaseUser?.email);

  /**
   * ✅ Combined loading state:
   * - firebaseLoading covers auth initialization
   * - userLoading runs ONLY if firebaseUser exists
   * - So don't block on DB if not logged in at all
   */
  const loading = firebaseLoading || (!!firebaseUser && userLoading);

  // Auth functions
  const createAccount = (email, password) => {
    setFirebaseLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).finally(() =>
      setFirebaseLoading(false)
    );
  };

  const googleLogin = () => {
    setFirebaseLoading(true);
    return signInWithPopup(auth, googleProvider).finally(() =>
      setFirebaseLoading(false)
    );
  };

  const loginUser = (email, password) => {
    setFirebaseLoading(true);
    return signInWithEmailAndPassword(auth, email, password).finally(() =>
      setFirebaseLoading(false)
    );
  };

  const logoutUser = () => {
    setFirebaseLoading(true);
    return signOut(auth).finally(() => setFirebaseLoading(false));
  };

  const sharedData = {
    firebaseUser, // Firebase Auth user
    user, // DB profile (can be null)
    loading,
    firebaseLoading,
    userLoading,
    createAccount,
    googleLogin,
    loginUser,
    logoutUser,
    refetchUserData,
  };
  return <AuthContext value={sharedData}>{children} </AuthContext>;
};

export default AuthProvider;
