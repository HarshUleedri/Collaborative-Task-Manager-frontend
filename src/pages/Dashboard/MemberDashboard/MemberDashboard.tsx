import Navbar from "@/components/common/Navbar";
import {
  ChartColumn,
  ClipboardCheck,
  FolderKanban,
  UserPenIcon,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
const navTab = [
  { number: 1, title: "My Tasks", icon: ClipboardCheck },
  { number: 2, title: "Profile", icon: UserPenIcon },
  { number: 3, title: "Projects", icon: FolderKanban },
  { number: 4, title: "Analytics", icon: ChartColumn },
];

const MemberDashboard = ({ children }: { children: React.ReactNode }) => {
  const [isActive, setIsActive] = useState<number>(1);
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />

      <div className="flex">
        <aside className="w-72 border-r h-screen p-4">
          <div className="space-y-2 ">
            {navTab.map((item) => (
              <div
                onClick={() => {
                  setIsActive(item.number);
                  navigate(
                    `${item.title.trim().replace(" ", "-").toLowerCase()}`
                  );
                }}
                key={item.number}
                className={`flex items-center gap-2 py-2 hover:bg-muted rounded-md px-4 group ${
                  isActive === item.number &&
                  "text-accent   bg-accent-foreground"
                } `}
              >
                <span className="group-hover:text-primary  ">
                  <item.icon className="size-5" />
                </span>
                <span className="text-base font-medium  group-hover:text-primary">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </aside>
        <main className="p-8 w-full">{children}</main>
      </div>
    </div>
  );
};

export default MemberDashboard;
