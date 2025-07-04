import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignup, useUploadImage } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/useAuthStore";
import type { UserSignupDataType } from "@/types/usertypes";

import { User2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const Signup = () => {
  const [formData, setFormData] = useState<UserSignupDataType>({
    username: "",
    profilePic: "",
    email: "",
    password: "",
  });

  // hook
  const { mutate, isPending, error } = useSignup();
  const { isLoading, isError } = useAuthStore((state) => state);

  const { mutateAsync: uploadMutate, isPending: uploadIsPending } =
    useUploadImage();

  //helper function
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      const data = await uploadMutate(formData);
      setFormData((prev) => ({ ...prev, profilePic: data?.url }));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center  justify-center min-h-screen"
    >
      <Card className="w-full lg:w-1/3">
        <CardHeader>
          <CardTitle>
            <h1 className="text-2xl font-semibold ">Create A User Account</h1>
            <p className=" font-normal text-sm text-muted-foreground">
              Get Your Consultancy Fast
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* image upload */}
          <div>
            <span className="font-semibold ">Profile Picture</span>
            <Label
              id="upload"
              className=" size-32 border-2 border-dashed border-muted-foreground/50 rounded p-1 mt-2 flex items-center justify-center"
            >
              <input
                id="upload"
                onChange={(e) => handleUpload(e)}
                type="file"
                className="hidden"
              />
              {formData.profilePic ? (
                <img
                  className="w-full h-full object-cover"
                  src={formData.profilePic}
                  alt="profile-image"
                />
              ) : uploadIsPending ? (
                <div className="size-8 rounded-full border-4 border-muted-foreground/50 border-t-primary animate-spin bg-transparent"></div>
              ) : (
                <div className="size-20 rounded-md hover:bg-accent flex items-center justify-center">
                  <User2 className="text-muted-foreground/50 " />
                </div>
              )}
            </Label>
          </div>
          {/*  username */}
          <Label className="flex flex-col items-start ">
            <span className=" font-semibold text-sm mb-1">Full Name</span>
            <Input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, username: e.target.value }))
              }
              placeholder="Enter your full name"
              required
            />
          </Label>
          {/* email */}
          <Label className="flex flex-col items-start ">
            <span className=" font-semibold text-sm mb-1">Email</span>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="doctor@example.com"
              required
            />
          </Label>

          <Label className="flex flex-col items-start ">
            <span className=" font-semibold text-sm mb-1">Password</span>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              placeholder="* * * * * *"
              required
            />
          </Label>
          {(error || isError) && (
            <p className="text-sm text-destructive font-medium">
              {(error && (error as any)?.response?.data?.message) ||
                error?.message ||
                isError}
            </p>
          )}
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button disabled={isPending || isLoading} className="w-full mb-4 ">
            {isPending || isLoading ? (
              <div className="size-6 rounded-full border-3 border-muted-foreground/50 border-t-primary animate-spin bg-transparent"></div>
            ) : (
              "Create Account"
            )}
          </Button>
          <p className="text-sm ">
            Already Have an account ?{" "}
            <Link className="font-semibold" to={"/login"}>
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </form>
  );
};

export default Signup;
