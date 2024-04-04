import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TravelLayout({ children }) {
    return (
        <div>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    );
}