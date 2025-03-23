"use client";

// Stylesheet import
import s from "./Header.module.css";

// Internal component imports
import Button from "../buttons/Button";

// Icon imports
import { RiUserAddLine } from "react-icons/ri";

// Next.js navigation hook
import { useRouter } from "next/navigation";

/**
 * Header Component
 * Displays the team members section title and an "Add User" button.
 */
export default function Header() {
  const router = useRouter();

  // Opens the "Add Member" modal by updating the URL with a query parameter
  const openAddMemberModal = () => {
    router.push("/team?add-member");
  };

  return (
    <div className={s.HeaderContainer}>
      {/* Section Title */}
      <div className={s.HeaderTitle}>
        <h2>Team Members</h2>
      </div>

      {/* Add User Button */}
      <Button className={s.HeaderButton} action={openAddMemberModal}>
        <RiUserAddLine />
        <p style={{ fontSize: "0.75rem" }}>Add User</p>
      </Button>
    </div>
  );
}
