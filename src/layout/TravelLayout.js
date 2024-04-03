import Navbar from "@/components/Navbar";

export default function TravelLayout({ children }) {
    return (
        <div>
            <Navbar />
            <main>{children}</main>
        </div>
    );
}