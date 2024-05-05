import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" /> */}
      <link rel="icon" type="image/svg+xml" href="https://travel-journal-api-bootcamp.do.dibimbing.id/images/1714881692957-luxury-travel-ico.png" />
      <Head />
      <body>
        <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
        {/* bootstrap saya gunakan untuk ICON (syarat bootstrap) */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" />
       
        <Main />
        <NextScript />
               
      </body>
    </Html>
  );
}
