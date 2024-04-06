// import Image from "next/image";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <h1>Hello</h1>
      <button>
        <a href="/authentication/login">Login</a>
      </button>
      <button>
        <a href="/authentication/register">Register</a>
      </button>
    </div>
  );
}
