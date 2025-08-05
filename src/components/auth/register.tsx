import { useAuthState } from "@/stores/auth.store";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { useNavigate } from "react-router-dom";
import { useAsync } from "@/hooks/useAsync";
import { Alert, AlertDescription } from "../ui/alert";
import { Terminal } from "lucide-react";
import FillLoading from "../shared/fill-loading";
import { useUserState } from "@/stores/user.store";

// Function to register a new user with email and password
const registerUser = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

const Register = () => {
  // Hooks
  const { execute: register, isLoading, error } = useAsync(registerUser);

  const { setAuth } = useAuthState();
  const navigate = useNavigate();
  const { setUser } = useUserState();

  // Initialize the form with the register schema for validation
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", password: "", confirm: "" },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    const { email, password } = values;
    const res = await register(email, password);
    if (res?.user) {
      setUser(res.user);
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col">
      {isLoading && <FillLoading />}

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

          <div className="grid grid-cols-2 gap-4 mt-3">
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

            <FormField
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    Confirm password
                  </FormLabel>
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
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 cursor-pointer"
          >
            Register
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Register;
