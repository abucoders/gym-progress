import { Button } from "@/components/ui/button";
import { featuredItems, programs } from "@/constants";
import men from "@/assets/men.png";
import type { ProgramsItems } from "@/interface";
import { FaArrowRightLong } from "react-icons/fa6";
import { Card } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useUserState } from "@/stores/user.store";
import { CgGym } from "react-icons/cg";
import { LogOutIcon, UserRoundPlus } from "lucide-react";
import { auth } from "@/firebase";

const Home = () => {
  // Hooks
  const { user, setUser } = useUserState();
  const navigate = useNavigate();

  // onLogout, set user to null
  const onLogout = () => {
    auth.signOut().then(() => {
      setUser(null);
      navigate("/auth");
    });
  };

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center">
        {/* Text section */}
        <div className="max-w-xl flex h-full flex-col justify-center">
          <h1 className="text-9xl font-semibold uppercase">Workout with me</h1>
          <p className="text-muted-foreground">
            Join me in a journey to better health and fitness. Let's work out
            together! A huge selection of health and fitness content, healthy
            recipers and workout plans to help you achieve your goals. Whether
            you're a beginner
          </p>

          {user ? (
            <div className="flex items-center gap-2 w-fit mt-6">
              <Link to={"/dashboard"}>
                <Button
                  size={"lg"}
                  variant={"secondary"}
                  className="cursor-pointer"
                >
                  <CgGym />
                  Go to GYM
                </Button>
              </Link>

              <Button
                size={"lg"}
                variant={"destructive"}
                className="cursor-pointer"
                onClick={() => onLogout()}
              >
                <LogOutIcon />
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Link to={"/auth"} className="w-fit mt-6 font-bold h-12">
                <Button size={"lg"} className="cursor-pointer">
                  <UserRoundPlus />
                  Join club now
                </Button>
              </Link>
            </>
          )}

          <div className="mt-24">
            <p className="text-muted-foreground uppercase">as featured in</p>
            <div className="flex items-center gap-4 mt-2">
              {featuredItems.map((Icon, index) => (
                <Icon key={index} className="size-12" />
              ))}
            </div>
          </div>
        </div>

        {/* Image section */}
        <img src={men} alt="Workout man" className="w-1/4" />
      </div>

      <div className="container max-w-5xl mx-auto">
        <h1 className="text-4xl">Not sure where to start?</h1>
        <p className="mt-2 text-muted-foreground">
          Program offer day-to-day guidance and support to help you achieve your
        </p>

        <div className="grid grid-cols-3 gap-4 my-8">
          {programs.map((item: ProgramsItems) => (
            <Card
              key={item.title}
              className="p-8 relative cursor-pointer group"
            >
              <h3>{item.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{item.descr}</p>
              <Button
                size={"icon"}
                variant={"ghost"}
                className="absolute right-2 top-1/2 group-hover:translate-x-1 transition-transform"
              >
                <FaArrowRightLong />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
