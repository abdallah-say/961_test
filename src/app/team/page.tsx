"use client";

// React & Next.js Imports
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// Component Imports
import Header from "@/components/ui/Header/Header";
import SearchBar from "@/components/SearchBar";
import Modal from "@/components/ui/Modal/Modal";
import TeamForm from "@/components/TeamForm";
import Table from "@/components/ui/Table/Table";
import Button from "@/components/ui/buttons/Button";

// Hook Imports
import useTeamMembers from "@/hooks/useTeamMembers";

// Icon Imports
import { RiErrorWarningLine } from "react-icons/ri";

// Style Imports
import s from "@/styles/TeamMembers.module.css";

export default function Team() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Destructure team member handlers from hook
  const { teamMembers, handleAddUser, handleEditUser, handleDeleteUser } =
    useTeamMembers();

  // State to manage search input
  const [searchTerm, setSearchTerm] = useState("");

  // Modal visibility checks based on URL parameters
  const isAddMemberOpen = searchParams.has("add-member");
  const isEditMemberOpen = searchParams.has("edit-member");
  const isDeleteMemberOpen = searchParams.has("delete-member");

  // Retrieve member IDs from URL parameters
  const editMemberId = searchParams.get("edit-member");
  const numericEditMemberId = editMemberId ? Number(editMemberId) : null;

  const deleteMemberId = searchParams.get("delete-member");
  const numericDeleteMemberId = deleteMemberId ? Number(deleteMemberId) : null;

  // Find the corresponding members for edit and delete actions
  const selectedMember = teamMembers.find(
    (member) => member.id === numericEditMemberId
  );
  const memberToDelete = teamMembers.find(
    (member) => member.id === numericDeleteMemberId
  );

  // Close modal and reset URL
  const closeModal = () => {
    router.replace("/team");
  };

  // Log team members for debugging
  useEffect(() => {
    console.log("Team members data:", teamMembers);
  }, [teamMembers]);

  // Filter team members by search term
  const filteredMembers = teamMembers.filter((member) =>
    member.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={s.team__members__container}>
      {/* Page Header */}
      <Header />

      {/* Search Bar */}
      <div className={s.SearchBar}>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {/* Team Members Table */}
      <Table teamMembers={filteredMembers} />

      {/* Add Member Modal */}
      {isAddMemberOpen && (
        <div className="modal-overlay">
          <Modal onClose={closeModal} title="Add Team Member">
            <TeamForm onAddUser={handleAddUser} />
          </Modal>
        </div>
      )}

      {/* Edit Member Modal */}
      {isEditMemberOpen && (
        <div className="modal-overlay">
          <Modal onClose={closeModal} title="Edit Team Member">
            <TeamForm
              onEditUser={handleEditUser}
              initialData={selectedMember}
            />
          </Modal>
        </div>
      )}

      {/* Delete Member Confirmation Modal */}
      {isDeleteMemberOpen && (
        <div className="modal-overlay">
          <Modal
            onClose={closeModal}
            title={
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <span
                  style={{
                    color: "#ff0010",
                    height: "20px",
                    fontSize: "1.2rem",
                  }}
                >
                  <RiErrorWarningLine />
                </span>
                Remove Team Member
              </div>
            }
          >
            <p className={s.modal__message}>
              Are you sure you want to remove{" "}
              <strong>{memberToDelete?.username}</strong> from the team? This
              action cannot be undone.
            </p>

            <div className={s.modal__actions}>
              <Button
                className={s.delete__button}
                action={() => {
                  if (numericDeleteMemberId !== null) {
                    handleDeleteUser(numericDeleteMemberId);
                  }
                  closeModal();
                }}
              >
                Remove
              </Button>

              <Button className="closeButton" action={closeModal}>
                Cancel
              </Button>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
}
