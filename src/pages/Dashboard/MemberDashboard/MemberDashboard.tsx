import Navbar from "@/components/common/Navbar";
import { useModal } from "@/hooks/useModal";
import {
  ChartColumn,
  ClipboardCheck,
  FolderKanban,
  SidebarClose,
  SidebarOpen,
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

  const { isOpen, openModal, modalRef, closeModal } = useModal();

  const navigate = useNavigate();
  return (
    <div>
      <Navbar />

      <div className="flex">
        <aside className="w-72 hidden lg:block border-r h-screen p-4">
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
        {isOpen && (
          <div className="h-screen bg-black/60 fixed inset-0  ">
            <div ref={modalRef} className="h-screen w-4/5 bg-background  p-4">
              <button
                className="lg:hidden cursor-pointer mb-4"
                onClick={closeModal}
              >
                <SidebarClose className="size-6" />
              </button>
              <div className="space-y-2 ">
                {navTab.map((item) => (
                  <div
                    onClick={() => {
                      setIsActive(item.number);
                      navigate(
                        `${item.title.trim().replace(" ", "-").toLowerCase()}`
                      );
                      closeModal();
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
            </div>
          </div>
        )}
        <main className="p-4 lg:p-8 w-full">
          <div>
            <button
              className="lg:hidden cursor-pointer mb-4"
              onClick={openModal}
            >
              <SidebarOpen className="size-6" />
            </button>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};

export default MemberDashboard;
