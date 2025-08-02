import { useAuthState } from "@/stores/auth.store";
import { Input } from "@/components/ui/input";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

const Login = () => {
  const { setAuth } = useAuthState();

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-bold">Login</h2>

      <p className="text-muted-foreground">
        Don't have a account?{" "}
        <span
          className="text-blue-500 cursor-pointer hover:underline"
          onClick={() => setAuth("register")}
        >
          Sign up
        </span>
      </p>

      <Separator className="my-4" />

      <div>
        <div className="">
          <span className="font-semibold">Email</span>
          <Input placeholder="example@gmail.com" type="email" />
        </div>

        <div className="mt-3">
          <span className="font-semibold">Password</span>
          <Input placeholder="******" type="password" />
        </div>
      </div>

      <Button className="w-full h-12 mt-3 cursor-pointer">Login</Button>
    </div>
  );
};

export default Login;
