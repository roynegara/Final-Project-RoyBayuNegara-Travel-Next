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
