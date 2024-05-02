import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const PrivateRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    const isLoginPage = router.pathname === '/login';
    const isRegisterPage = router.pathname === '/register';

    if (accessToken && (isLoginPage || isRegisterPage)) {
      router.push('/dashboard'); // Jika pengguna telah memiliki akses token dan mencoba mengakses halaman login atau registrasi, arahkan ke dashboard
    } else if (!accessToken && !(isLoginPage || isRegisterPage)) {
      router.push('/login'); // Jika pengguna tidak memiliki akses token dan mencoba mengakses halaman lain, arahkan ke halaman login
    }
  }, []);

  return children;
};

export default PrivateRoute;


// import { useRouter } from 'next/router';
// import React, { useEffect } from 'react';

// const PrivateRoute = ({ children }) => {
//   const router = useRouter();

//     useEffect(() => {
//         const accessToken = localStorage.getItem('access_token');            
//     if (!accessToken) {
//       router.push('/login'); 
//     }
//     }, []);
    
  

//   return children;
// };

// export default PrivateRoute;
