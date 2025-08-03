import { auth } from "@/firebase";
import { useUserState } from "@/stores/user.store";
import { useEffect, useState, type ReactNode } from "react";
import FillLoading from "../shared/fill-loading";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { setUser } = useUserState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) setUser(user);
      setIsLoading(false);
    });
  }, [setUser]);

  return isLoading ? <FillLoading /> : <>{children}</>;
};

export default AuthProvider;
