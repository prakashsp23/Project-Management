// withAuth.js
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const withAuth = (WrappedComponent: any) => {
  const AuthComponent = (props: any) => {
    const userInfo = useSelector((state: any) => state.auth.userInfo);
    const router = useRouter();

    useEffect(() => {
      if (!userInfo) {
        router.push("/");
      }
    }, [router, userInfo]);

    if (!userInfo) {
      return null; // Render nothing until the authentication state is determined
    }

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
