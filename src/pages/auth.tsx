import { Login, Register, Social } from "@/components/auth/router";
import { Card } from "@/components/ui/card";
import { useAuthState } from "@/stores/auth.store";

const Auth = () => {
  const { authState } = useAuthState();

  return (
    <div className="w-full h-screen bg-gradient-to-t from-foreground to-background flex items-center justify-center max-md:px-2">
      <Card className="p-8 lg:w-1/3 relative">
        {authState === "login" && <Login />}
        {authState === "register" && <Register />}

        <Social />
      </Card>
    </div>
  );
};

export default Auth;
