import { navLinks } from "@/constants";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full h-[10vh] border-b fixed inset-0 z-50 bg-background">
      <div className="container max-w-6xl mx-auto h-full flex justify-between items-center">
        <h1 className="text-2xl font-bold uppercase">
          <Link to={"/"}>workout</Link>
        </h1>
        <div className="flex items-center gap-3">
          {navLinks.map(nav => (
            <Link
              to={nav.path}
              key={nav.path}
              className="font-medium hover:underline"
            >
              {nav.label}
            </Link>
          ))}

          <Link to="/auth">
            <Button variant={"secondary"} className="cursor-pointer">
              Join Free
            </Button>
          </Link>

          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
