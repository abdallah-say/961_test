"use client";
import React, { ChangeEvent, KeyboardEvent, use, useState } from "react";
import { TeamMember } from "@/store/features/teamMemberSlice";
import { IoMdCheckmark } from "react-icons/io";
import { useSearchParams, useRouter } from "next/navigation";

import s from "@/styles/TeamForm.module.css";
import Button from "./ui/buttons/Button";

interface TeamFormProps {
  onAddUser?: (userData: Omit<TeamMember, "id" | "dateAdded">) => void;
  onEditUser?: (userData: TeamMember) => void;
  // Optionally, add a prop for initial data when editing:
  initialData?: TeamMember;
}

export default function TeamForm({
  onAddUser,
  onEditUser,
  initialData,
}: TeamFormProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [data, setData] = useState({
    username: initialData?.username || "",
    role: initialData?.role || "",
    brand: initialData?.brand || ([] as string[]),
    status: initialData?.status || ("Active" as "Active" | "Inactive"),

    // In editing mode
    id: initialData?.id,
    dateAdded: initialData?.dateAdded || "",
  });

  const adminFeatures = ["General", "Studio", "Wallet", "Advertising"]
  const financeFeatures = ["Wallet"]
  const staffFeatures = ["General", "Studio", "Advertising"]

  const [brandInput, setBrandInput] = useState("");

  const isAddMemberOpen = searchParams.has("add-member");
  const isEditMemberOpen = searchParams.has("edit-member");

  const handleDataChange = (
    eventOrCustom:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { name: string; value: string } }
  ) => {
    const { name, value } =
      "target" in eventOrCustom ? eventOrCustom.target : eventOrCustom;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle new brand input changes
  function handleBrandInputChange(e: ChangeEvent<HTMLInputElement>) {
    setBrandInput(e.target.value);
  }

  // Add a brand from the brandInput field
  function addBrand() {
    const trimmed = brandInput.trim();
    if (trimmed && !data.brand.includes(trimmed)) {
      setData((prev) => ({ ...prev, brand: [...prev.brand, trimmed] }));
    }
    setBrandInput("");
  }

  // Allow adding brand on Enter key
  function handleBrandKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      addBrand();
    }
  }

  // Remove a brand from the selected list
  function removeBrand(brandToRemove: string) {
    setData((prev) => ({
      ...prev,
      brand: prev.brand.filter((b) => b !== brandToRemove),
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!data.username || !data.role || !data.brand) {
      alert("Please fill all fields");
      return;
    }
    // If adding a new user
    if (onAddUser) {
      onAddUser({
        username: data.username,
        role: data.role,
        brand: data.brand,
        status: data.status,
      });
    }
    setData({
      username: "",
      role: "",
      brand: [],
      status: "Active",
      id: undefined,
      dateAdded: "",
    });

    router.replace("/team");
  }

  function handleEdits(e: React.FormEvent) {
    e.preventDefault();
    if (!data.username || !data.role || !data.brand) {
      alert("Please fill all fields");
      return;
    }
    // If editing, call onEditUser (expecting a full TeamMember)
    if (onEditUser && data.id && data.dateAdded) {
      onEditUser({
        id: data.id,
        username: data.username,
        role: data.role,
        brand: data.brand,
        status: data.status,
        dateAdded: data.dateAdded,
      });
    }
    setData({
      username: "",
      role: "",
      brand: [],
      status: "Active",
      id: undefined,
      dateAdded: "",
    });
    router.replace("/team");
  }

  return (
    <div className={s.form__container}>
      <form
        className={s.form}
        onSubmit={isAddMemberOpen ? handleSubmit : handleEdits}
      >
        {/* Username Input */}
        <div className={s.form__group}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="e.g.john doe"
            value={data.username}
            onChange={handleDataChange}
          />
        </div>

        <div className={s.form__group}>
          <label className={s.label}>Role</label>
          <div
            className={`${s.role__option} ${
              data.role === "Admin" ? s.selected : ""
            }`}
            onClick={() =>
              handleDataChange({ target: { name: "role", value: "Admin" } })
            }
          >
            <input
              type="radio"
              id="admin"
              name="role"
              value="Admin"
              checked={data.role === "Admin"}
              onChange={handleDataChange}
            />
            <label htmlFor="admin" className={s.radioLabel}>
              <strong>Admin</strong>
              <span>Full control over all features and settings</span>
            </label>
            <span className={s.checkIcon}>
              <IoMdCheckmark />
            </span>
          </div>

          <div
            className={`${s.role__option} ${
              data.role === "Finance" ? s.selected : ""
            }`}
            onClick={() =>
              handleDataChange({ target: { name: "role", value: "Finance" } })
            }
          >
            <input
              type="radio"
              id="finance"
              name="role"
              value="Finance"
              checked={data.role === "Finance"}
              onChange={handleDataChange}
            />
            <label htmlFor="finance" className={s.radioLabel}>
              <strong>Finance</strong>
              <span>Manage wallet and finances</span>
            </label>
            <span className={s.checkIcon}>
              <IoMdCheckmark />
            </span>
          </div>

          <div
            className={`${s.role__option} ${
              data.role === "Staff" ? s.selected : ""
            }`}
            onClick={() =>
              handleDataChange({ target: { name: "role", value: "Staff" } })
            }
          >
            <input
              type="radio"
              id="staff"
              name="role"
              value="Staff"
              checked={data.role === "Staff"}
              onChange={handleDataChange}
            />
            <label htmlFor="staff" className={s.radioLabel}>
              <strong>Staff</strong>
              <span>All tasks except wallet management</span>
            </label>
            <span className={s.checkIcon}>
              <IoMdCheckmark />
            </span>
          </div>
          <div className={s.selectedFeatures}>
            {data.role === "Admin" && 
              adminFeatures.map((feature,index)=>(
                <div className={s.Feature} key={index}>{feature}</div>
              ))
            }
            {data.role === "Finance" && 
              financeFeatures.map((feature,index)=>(
                <div className={s.Feature} key={index}>{feature}</div>
              ))
            }
            {data.role === "Staff" && 
              staffFeatures.map((feature,index)=>(
                <div className={s.Feature} key={index}>{feature}</div>
              ))
            }
          </div>
        </div>

        {/* Brand selection */}
        <div className={s.form__group}>
          <label htmlFor="brand-input">Assign To Brand:</label>
          <div className={s.brand__inputWrapper}>
            <input
              type="text"
              id="brand-input"
              name="brandInput"
              placeholder="Type to add brand"
              list="brand-suggestions"
              value={brandInput}
              onChange={handleBrandInputChange}
              onKeyDown={handleBrandKeyDown}
            />
            <datalist id="brand-suggestions">
              <option value="Coffee House" />
              <option value="Urban Wear" />
              <option value="Tech dddsf" />
            </datalist>
            <button type="button" onClick={addBrand}>
              Add
            </button>
          </div>

          {/* Display selected brands as chips */}
          {data.brand.length > 0 && (
            <div className={s.brand__chips}>
              {data.brand.map((b) => (
                <div key={b} className={s.brand__chip}>
                  {b}
                  <button
                    type="button"
                    onClick={() => removeBrand(b)}
                    aria-label={`Remove ${b}`}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={s.form__buttons}>
          <Button
            className="closeButton"
            type="button"
            action={() => {
              router.replace("/team");
            }}
          >
            Cancel
          </Button>
          {isAddMemberOpen && <Button type="submit">Add Team Member</Button>}
          {isEditMemberOpen && <Button type="submit">Save Changes</Button>}
        </div>
      </form>
    </div>
  );
}
