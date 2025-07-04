import { useAuthStore } from "@/store/useAuthStore";
import { Card, CardContent } from "../ui/card";

const ProfileInfo = () => {
  const { user } = useAuthStore((state) => state);
  return (
    <div className="mt-12">
      <Card>
        <CardContent className="space-y-6 ">
          <div className="flex items-center gap-6">
            <div className="size-26 p-1 border rounded-full">
              <img
                className="size-full rounded-full"
                src={user?.profilePic}
                alt="profile-image"
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">{user?.username}</h2>
              <p className="text-base text-muted-foreground/80 font-medium">
                {user?.role}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-base font-medium">Email :</span>
            <p className="font-medium text-muted-foreground">{user?.email}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-base font-medium">Join At:</span>
            <p className="font-medium text-muted-foreground">
              {new Date(user?.createdAt).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "2-digit",
              })}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileInfo;
