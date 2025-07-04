import { useAuthStore } from "@/store/useAuthStore";
import { LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Button } from "../ui/button";
import { useLogout } from "@/hooks/useAuth";

const Navbar = () => {
  const { user } = useAuthStore((state) => state);
  const { mutate } = useLogout();
  const navigate = useNavigate();
  return (
    <header>
      <nav className="px-12 justify-between flex items-center py-4 border-b">
        <div onClick={() => navigate("/")}>
          <h1 className="text-3xl font-semibold tracking-tight">TaskFlow </h1>
        </div>
        <div className="flex items-center gap-4">
          <Link to={"/user"}>
            <div className="size-12 rounded-full p-1 border">
              <img
                className="size-full rounded-full object-cover"
                src={
                  user?.profilePic ||
                  "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-260nw-1095249842.jpg"
                }
                alt="profile-image"
              />
            </div>
          </Link>
          <Button onClick={() => mutate()} size={"icon"} variant={"outline"}>
            <LogOut className="size-5" />
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
