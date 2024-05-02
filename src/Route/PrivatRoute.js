import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const PrivateRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    const isLoggedIn = accessToken !== null; // Periksa apakah pengguna sudah login

    if (isLoggedIn) {
      // Jika pengguna sudah login, arahkan ke dashboard jika mencoba mengakses halaman login atau register
      const isLoginPage = router.pathname === '/login';
      const isRegisterPage = router.pathname === '/register';
      if (isLoginPage || isRegisterPage) {
        router.push('/dashboard');
      }
    } else {
      // Jika pengguna belum login, arahkan ke halaman login jika mencoba mengakses halaman lain
      const isNotLoginPage = router.pathname !== '/login';
      const isNotRegisterPage = router.pathname !== '/register';
      if (isNotLoginPage && isNotRegisterPage) {
        router.push('/login');
      }
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
