// Component: SearchBar

// Imports
import s from "@/styles/SearchBar.module.css";
import { CiSearch } from "react-icons/ci";

// Props Interface
interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

// SearchBar Component
export default function SearchBar({
  searchTerm,
  setSearchTerm,
}: SearchBarProps) {
  return (
    <div className={s.SearchBarContainer}>
      {/* Search Icon */}
      <div className={s.SearchIcon}>
        <CiSearch />
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search users..."
        className={s.SearchInput}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
