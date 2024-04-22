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
import { Toaster } from "sonner";

export default function App({ Component, pageProps }) {
  return (
    <TravelLayout>
      <Toaster richColors position="bottom-right" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      />
      <script src="@/script.js"></script>
      <Component {...pageProps} />
    </TravelLayout>
  );
}
