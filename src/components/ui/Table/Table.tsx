// Table.tsx
import React from "react";
import { TeamMember } from "@/store/features/teamMemberSlice";
import s from "./Table.module.css";
import { useRouter } from "next/navigation";

interface TableProps {
  teamMembers: TeamMember[];
}

export default function Table({ teamMembers }: TableProps) {
  const router = useRouter();
  return (
    <div>
      <ul className={s.table}>
        <li className={s.table__header}>
          <p>User</p>
          <p>Role</p>
          <p>Brand</p>
          <p>Status</p>
          <p>Date Added</p>
          <p>Actions</p>
        </li>
        {teamMembers.length === 0 ? (
          <li style={{ padding: "1rem", borderTop: "1px solid #ddd" }}>No team members found</li>
        ) : (
          teamMembers.map((member) => (
            <li className={s.table__body} key={member.id}>
              <p className={s.username}>
                <span className={s.UserIcon}>{member.username.charAt(0)}</span>
                {member.username}
              </p>
              <p>{member.role}</p>
              <p style={{display: "flex", gap: "4px"}}>{member.brand.map((brand) => (
                <span key={brand}>
                  {brand}
                </span>
              ))}</p>
              <p id="userStatus">{member.status}</p>
              <p data-label="Date Added:" id="dateAdded">{member.dateAdded}</p>
              <div>
                <button
                  onClick={() => {
                    router.push(`/team?edit-member=${member.id}`);
                  }}
                >
                  Edit
                </button>
                <span style={{ color: "#ddd" }}>&nbsp;|&nbsp; </span>
                <button
                  onClick={() => {
                    router.push(`/team?delete-member=${member.id}`);
                  }}
                >
                  Remove
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
