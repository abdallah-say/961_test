"use client";

// External library imports
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MdOutlineDashboard } from "react-icons/md";
import { TbWallet } from "react-icons/tb";
import { FiUsers } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { GoOrganization } from "react-icons/go";

// Internal component imports
import SideButton from "./ui/Sidebar-btn/SideButton";
import Button from "./ui/buttons/Button";

// Stylesheet import
import s from "../styles/Sidebar.module.css";

export default function Sidebar() {
  // Get current pathname and router for navigation
  const pathname = usePathname();
  const router = useRouter();

  // Initialize sidebar buttons with active state based on pathname
  const initialSidebarBtns = [
    {
      name: "Dashboard",
      icon: <MdOutlineDashboard />,
      active: pathname.toLowerCase() === "/dashboard",
    },
    {
      name: "Wallet",
      icon: <TbWallet />,
      active: pathname.toLowerCase() === "/wallet",
    },
    {
      name: "Team",
      icon: <FiUsers />,
      active: pathname.toLowerCase() === "/team",
    },
    {
      name: "Settings",
      icon: <IoSettingsOutline />,
      active: pathname.toLowerCase() === "/settings",
    },
  ];

  const [sidebar_btns, setSidebarBtns] = useState(initialSidebarBtns);

  // Update active button if pathname changes (e.g., via browser navigation)
  useEffect(() => {
    setSidebarBtns((prevBtns) =>
      prevBtns.map((btn) => ({
        ...btn,
        active: pathname.toLowerCase().includes(`/${btn.name.toLowerCase()}`),
      }))
    );
  }, [pathname]);

  return (
    <div className={s.sidebar__container}>
      {/* Company/Organization Button */}
      <SideButton
        text="Tech Innovation Ltd."
        icon={<GoOrganization />}
        active={false}
      />

      {/* Create Button Section */}
      <div className={s.sidebarCreate}>
        <Button action={() => router.push("/team?add-member")}>Create</Button>
      </div>

      {/* Sidebar Navigation Buttons */}
      <div className={s.sidebarButtonsList}>
        {sidebar_btns.map((btn, index) => (
          <SideButton
            key={index}
            text={btn.name}
            icon={btn.icon}
            active={btn.active}
            onClick={() => router.push(`/${btn.name.toLowerCase()}`)}
          />
        ))}
      </div>
    </div>
  );
}
