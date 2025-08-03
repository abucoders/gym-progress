import { FaGithub, FaGoogle } from "react-icons/fa6";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/firebase";
import FillLoading from "../shared/fill-loading";

// social authentication providers
const providers = {
  google: new GoogleAuthProvider(),
  github: new GithubAuthProvider(),
};

const Social = () => {
  // Hooks
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Function to handle social sign-in
  const onSocialSignIn = async (provider: "google" | "github") => {
    setIsLoading(true);

    try {
      await signInWithPopup(auth, providers[provider]);
      navigate("/");
    } catch (error) {
      console.error(`${provider} sign-in error:`, error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <FillLoading />}
      <Separator className="my-2" />

      <div className="grid grid-cols-2 gap-2">
        <Button
          className="h-12 cursor-pointer"
          variant={"secondary"}
          onClick={() => onSocialSignIn("github")}
          disabled={isLoading}
        >
          <FaGithub />
          <span>Sign in with GitHub</span>
        </Button>

        <Button
          className="h-12 cursor-pointer"
          variant={"destructive"}
          onClick={() => onSocialSignIn("google")}
          disabled={isLoading}
        >
          <FaGoogle />
          <span>Sign in with Google</span>
        </Button>
      </div>
    </>
  );
};

export default Social;
