import Link from "next/link";
import { useRouter } from "next/router";

const LogInOut = () => {
  const router = useRouter();

  const accessToken = typeof localStorage !== 'undefined' ? localStorage.getItem("access_token") : null;

  // const accessToken = localStorage.getItem("access_token");
  console.log("access_token", accessToken);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    router.push("/login");
  };
  return (
    <div className="loginout">
      {accessToken ? <a onClick={handleLogout}> Logout </a> : <Link href="/login"> Login </Link>}</div>
  );
};

export default LogInOut;
