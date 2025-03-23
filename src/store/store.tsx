// External library imports
import { configureStore } from "@reduxjs/toolkit";

// Internal reducer import
import teamMembersReducer from "./features/teamMemberSlice";

// Configure the Redux store with the teamMembers reducer
export const store = configureStore({
  reducer: {
    teamMembers: teamMembersReducer, // Reducer handling the state of team members
  },
});

// Define RootState type for easy access to the state type in the app
export type RootState = ReturnType<typeof store.getState>;

// Define AppDispatch type to ensure correct usage of dispatch within the app
export type AppDispatch = typeof store.dispatch;
