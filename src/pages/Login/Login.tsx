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
import { useLogin } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";
import { Link } from "react-router";

const PatientLogin = () => {
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    {
      email: "",
      password: "",
    }
  );
  const { mutate, error, isPending } = useLogin();
  const { isLoading, isError } = useAuthStore((state) => state);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-screen flex items-center justify-center px-4 "
    >
      <Card className="w-full lg:w-1/3  ">
        <CardHeader className="mb-1">
          <CardTitle>
            <h1 className="text-2xl text-primary font-semibold ">
              {" "}
              Welcome Back
            </h1>
            <p className="text-muted-foreground/60 text-sm ">
              Sign in to your account
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Label className="flex flex-col gap-1 items-start text-lg">
            Email
            <Input
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              value={formData.email}
              type="email"
              placeholder="example@gmail.com"
            />
          </Label>
          <Label className="flex flex-col gap-1 items-start text-lg">
            Password
            <Input
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              value={formData.password}
              type="password"
              placeholder="* * * * * *"
            />
          </Label>
          {error && (
            <p className="text-sm text-destructive font-semibold">
              {
                // Try to get a message from the error response, otherwise fallback to a generic message
                (error as any)?.response?.data?.message ||
                  error.message ||
                  "An error occurred"
              }
            </p>
          )}
          {isError && (
            <p className="text-sm text-destructive font-semibold">{isError}</p>
          )}
        </CardContent>
        <CardFooter className=" flex flex-col">
          <Button
            disabled={isPending || isLoading}
            className="w-full py-4 mb-4"
          >
            {isPending || isLoading ? (
              <div className="size-6 border-3 rounded-full bg-transparent border-muted-foreground border-t-accent animate-spin "></div>
            ) : (
              "Sign In"
            )}
          </Button>
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link className="font-bold" to={"/signup"}>
              Create one
            </Link>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
};

export default PatientLogin;
