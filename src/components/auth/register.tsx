import { useAuthState } from "@/stores/auth.store";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Register = () => {
  const { setAuth } = useAuthState();

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-bold">Register</h2>

      <p className="text-muted-foreground">
        Already have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer hover:underline"
          onClick={() => setAuth("login")}
        >
          Sign in
        </span>
      </p>

      <Separator className="my-4" />

      <div>
        <div className="">
          <span className="font-semibold">Email</span>
          <Input placeholder="example@gmail.com" type="email" />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-3">
          <div>
            <span className="font-semibold">Password</span>
            <Input placeholder="******" type="password" />
          </div>

          <div>
            <span className="font-semibold">Confirm password</span>
            <Input placeholder="******" type="password" />
          </div>
        </div>
      </div>

      <Button className="w-full h-12 mt-3 cursor-pointer">Register</Button>
    </div>
  );
};

export default Register;
