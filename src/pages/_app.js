// _app.js
// import React from 'react';
// import { Provider } from 'react-redux';
// import store from '@/Redux/store'; // Import store Redux yang sudah Anda buat
// import TravelLayout from '@/layout/TravelLayout';
// import "@/styles/globals.css";

// export default function App({ Component, pageProps }) {
//   const store = useStore(pageProps.initialReduxState);

//   return (
//     <Provider store={store}>
//       <TravelLayout>
//         <Component {...pageProps} />
//       </TravelLayout>
//     </Provider>
//   );
// }

import "@/styles/globals.css";
import TravelLayout from "@/layout/TravelLayout";
import { Toaster, toast } from "sonner";


import store from "@/Redux/store";
import { Provider } from "react-redux";





export default function App({ Component, pageProps }) {
  return (
   
    <TravelLayout>
      <Provider store={store}>
        
      <Toaster richColors position="bottom-right" />
      
      <Component {...pageProps} />
        
        </Provider>
    </TravelLayout>
    
     
  );
}
