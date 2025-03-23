"use client";

// External library imports
import { useDispatch, useSelector } from "react-redux";

// Internal imports
import { RootState, AppDispatch } from "@/store/store";
import {
  addUser,
  editUser,
  deleteUser,
  TeamMember,
} from "@/store/features/teamMemberSlice";

// Custom hook to manage team members' state and actions
export default function useTeamMembers() {
  // Initialize dispatch and select team members from the store
  const dispatch = useDispatch<AppDispatch>();
  const teamMembers = useSelector(
    (state: RootState) => state.teamMembers.members
  );

  // Handle adding a new user (excluding id and dateAdded from input)
  function handleAddUser(userData: Omit<TeamMember, "id" | "dateAdded">) {
    dispatch(addUser(userData));
  }

  // Handle editing an existing user
  function handleEditUser(userData: TeamMember) {
    dispatch(editUser(userData));
  }

  // Handle deleting a user by their id
  function handleDeleteUser(id: number) {
    dispatch(deleteUser(id));
  }

  // Return state and actions to be used in components
  return {
    teamMembers,
    handleAddUser,
    handleEditUser,
    handleDeleteUser,
  };
}
