import "@/styles/globals.css";
import TravelLayout from "@/layout/TravelLayout";

export default function App({ Component, pageProps }) {
  return (
    <TravelLayout>
      <Component {...pageProps} />
    </TravelLayout>
  );
}
