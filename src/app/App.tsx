import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./Layout";
import { MotionProvider } from "./MotionProvider";
import { HomePage } from "@/pages/HomePage";
import { SearchPage } from "@/pages/SearchPage";
import { MapsPage } from "@/pages/MapsPage";
import { TheoryPage } from "@/pages/TheoryPage";

// Normalize Vite's BASE_URL (e.g. "/ipatlas/") into a router basename ("/ipatlas").
const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "search", element: <SearchPage /> },
        { path: "maps", element: <MapsPage /> },
        { path: "theory", element: <TheoryPage /> },
      ],
    },
  ],
  { basename },
);

export function App() {
  return (
    <MotionProvider>
      <RouterProvider router={router} />
    </MotionProvider>
  );
}
