import { FaGithub, FaGoogle } from "react-icons/fa6";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const Social = () => {
  return (
    <>
      <Separator className="my-2" />

      <div className="grid grid-cols-2 gap-2">
        <Button className="h-12 cursor-pointer" variant={"secondary"}>
          <FaGithub />
          <span>Sign in with GitHub</span>
        </Button>

        <Button className="h-12 cursor-pointer" variant={"destructive"}>
          <FaGoogle />
          <span>Sign in with Google</span>
        </Button>
      </div>
    </>
  );
};

export default Social;
