import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const PrivateRoute = ({ children }) => {
  const router = useRouter();

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        

    
    if (!accessToken) {
      router.push('/login'); 
    }
  }, []);

  return children;
};

export default PrivateRoute;
