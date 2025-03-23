import React from "react";
import clsx from "clsx";

// Import component styles
import s from "./SideButton.module.css";

// Define the props for the SideButton component
interface SideButtonProps {
  text: string;
  icon: React.ReactNode;
  active: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function SideButton({
  text,
  icon,
  active,
  onClick,
}: SideButtonProps) {
  // Validate props and log an error if required props are missing
  if (!text || !icon) {
    console.error("SideButton received invalid props:", { text, icon });
    return null;
  }

  return (
    <button
      className={clsx(s.sidebtnContainer, { [s.active]: active })}
      onClick={onClick}
    >
      {/* Icon section */}
      <span className={s.sidebtnLogo}>{icon}</span>
      {/* Text label */}
      <p className={s.sidebtnText}>{text}</p>
    </button>
  );
}
