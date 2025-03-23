// Importing CSS module for component styling
import s from "./Button.module.css";

// Type definition for Button component props
interface ButtonProps {
  className?: string; // Optional custom CSS class
  children: React.ReactNode; // Button content (text, icon, etc.)
  type?: "button" | "submit" | "reset"; // Button type attribute
  action?: React.MouseEventHandler<HTMLButtonElement>; // Click event handler
}

// Reusable Button component
export default function Button({
  className, // Custom class name (if available)
  type = "button", // Default button type is "button"
  children, // Button content
  action, // Click handler function (if available)
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${
        className === "closeButton" ? s.closeButton : s.buttonContainer
      } ${className || ""}`}
      onClick={action}
    >
      {children} {/* Render button content */}
    </button>
  );
}
