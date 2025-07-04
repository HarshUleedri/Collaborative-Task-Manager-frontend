import { Card, CardContent } from "@/components/ui/card";
import { useAllUser } from "@/hooks/useUser";
import type { UserData } from "@/types/usertypes";

const MembersList = () => {
  const { data } = useAllUser();

  const userArr: UserData[] = data?.users;
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 ">
      {userArr?.map((user) => (
        <Card key={user._id}>
          <CardContent className="space-y-4 ">
            <div className="flex items-center gap-6">
              <div className="size-26 p-1 border rounded-full">
                <img
                  className="size-full rounded-full"
                  src={
                    user?.profilePic ||
                    "https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-260nw-1095249842.jpg"
                  }
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
      ))}
    </div>
  );
};

export default MembersList;
