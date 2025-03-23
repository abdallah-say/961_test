"use client";

// React & Next.js Imports
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

// Style Imports
import styles from "@/styles/Navbar.module.css";

// Icon Imports
import { FiMenu, FiX } from "react-icons/fi";

// Component Imports
import Button from "./ui/buttons/Button";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  // Sidebar navigation buttons
  const sidebarBtns = [
    { name: "Dashboard", active: pathname.toLowerCase() === "/dashboard" },
    { name: "Wallet", active: pathname.toLowerCase() === "/wallet" },
    { name: "Team", active: pathname.toLowerCase() === "/team" },
    { name: "Settings", active: pathname.toLowerCase() === "/settings" },
  ];

  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <div className={styles.logo}>
        <span className={styles.red}>961</span> workspace
      </div>

      {/* Burger Menu */}
      <div className={styles.nav__menu}>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      {menuOpen && (
        <div className={styles.overlay} onClick={() => setMenuOpen(false)}>
          <div className={styles.sidebar} onClick={(e) => e.stopPropagation()}>
            {sidebarBtns.map((btn, index) => (
              <button
                key={index}
                className={btn.active ? styles.active : styles.button}
                onClick={() => {
                  router.push(`/${btn.name.toLowerCase()}`);
                  setMenuOpen(false);
                }}
              >
                {btn.name}
              </button>
            ))}

            {/* Create Button */}
            <div
              style={{
                padding: ".5rem 0",
                borderTop: "1px solid #ddd",
                borderBottom: "1px solid #ddd",
              }}
            >
              <Button>Create</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
