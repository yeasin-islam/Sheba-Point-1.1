import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';



const useAuth = () => {
 const sharedData=useContext(AuthContext)
 return sharedData
};

export default useAuth;