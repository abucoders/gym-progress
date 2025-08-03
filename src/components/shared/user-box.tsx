import { useUserState } from "@/stores/user.store";
import { LogOut, LucideLoaderPinwheel, LucideMailCheck } from "lucide-react";
import { CgGym } from "react-icons/cg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useNavigate } from "react-router-dom";
import { auth } from "@/firebase";

const UserBox = () => {
  // Hooks
  const { user, setUser } = useUserState();
  const navigate = useNavigate();

  if (!user) {
    return <LucideLoaderPinwheel className="animate-spin" />;
  }

  // onLogout, set user to null
  const onLogout = () => {
    auth.signOut().then(() => {
      setUser(null);
      navigate("/auth");
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user.photoURL!} />
          <AvatarFallback className="uppercase">
            {user.email![0]}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-80"
        align="start"
        alignOffset={11}
        forceMount
      >
        <DropdownMenuLabel className="grid gap-y-1">
          <div className="flex items-center gap-x-2">
            <div className="rounded-full bg-secondary p-1">
              <Avatar>
                <AvatarImage src={user.photoURL!} />
                <AvatarFallback className="uppercase">
                  {user.email![0]}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="space-y-1">
              <p className="line-clamp-1 text-sm">
                {user.displayName ?? user.email}
              </p>
            </div>
          </div>

          <p className="flex items-center gap-2 text-muted-foreground">
            <LucideMailCheck className="size-5" />
            <span className="text-xs font-medium line-clamp-1">
              {user.email}
            </span>
          </p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer" variant="default">
          <CgGym />
          <span>GYM</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer"
          variant="destructive"
          onClick={() => onLogout()}
        >
          <LogOut />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserBox;
