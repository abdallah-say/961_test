// app/ClientProviders.tsx
"use client";

// Redux Imports
import { Provider } from "react-redux";
import { store } from "@/store/store";

// ClientProviders Component - Wraps application with Redux store provider
export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
