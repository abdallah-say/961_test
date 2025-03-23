// External library imports
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the TeamMember type with required properties
export interface TeamMember {
  id: number;
  username: string;
  role: string;
  brand: string[];
  status: "Active" | "Inactive";
  dateAdded: string;
}

// Define the shape of the state for team members
interface TeamMemberState {
  members: TeamMember[];
}

// Initial state with an empty members array
const initialState: TeamMemberState = {
  members: [],
};

// Create the slice for team members with reducers
export const teamMembersSlice = createSlice({
  name: "teamMember", // Slice name
  initialState, // Initial state
  reducers: {
    // Add a new user, generate a new ID, and set the dateAdded to today's date
    addUser: (
      state,
      action: PayloadAction<Omit<TeamMember, "id" | "dateAdded">>
    ) => {
      const newID = Date.now(); // Generate a new ID based on the current timestamp
      const newMember: TeamMember = {
        ...action.payload, // Spread the user data from the action payload
        id: newID, // Assign the new ID
        dateAdded: new Date().toISOString().split("T")[0], // Set dateAdded to today's date in YYYY-MM-DD format
      };
      state.members.push(newMember); // Add the new member to the state
    },
    // Edit an existing user by replacing the user at the specified index
    editUser: (state, action: PayloadAction<TeamMember>) => {
      const index = state.members.findIndex(
        (member) => member.id === action.payload.id
      );
      if (index !== -1) {
        state.members[index] = action.payload; // Update the member data
      }
    },
    // Delete a user by filtering out the user with the given ID
    deleteUser: (state, action: PayloadAction<number>) => {
      state.members = state.members.filter(
        (member) => member.id !== action.payload
      ); // Remove the member with the given ID
    },
  },
});

// Export the actions to be dispatched
export const { addUser, editUser, deleteUser } = teamMembersSlice.actions;

// Export the reducer to be added to the store
export default teamMembersSlice.reducer;
