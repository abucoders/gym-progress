import { useAuthState } from "@/stores/auth.store";
import { Input } from "@/components/ui/input";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import type z from "zod";
import { loginSchema } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "@/firebase";
import { useAsync } from "@/hooks/useAsync";
import { Alert, AlertDescription } from "../ui/alert";
import { Terminal } from "lucide-react";
import FillLoading from "../shared/fill-loading";
import { useUserState } from "@/stores/user.store";

// Function to log in a user with email and password
const loginUser = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

const Login = () => {
  // Hooks
  const { execute: login, isLoading, error } = useAsync(loginUser);
  console.log(error);

  const { setAuth } = useAuthState();
  const navigate = useNavigate();
  const { setUser } = useUserState();

  // Initialize the form with the login schema for validation
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    const { email, password } = values;
    const res = await login(email, password);
    if (res?.user) {
      setUser(res.user);
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col">
      {isLoading && <FillLoading />}

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

      {error && (
        <Alert variant="destructive">
          <Terminal />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Separator className="my-4" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@gmail.com"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="*******"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 cursor-pointer"
          >
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Login;
