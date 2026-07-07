import { hydrateRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter } from "./router";

const router = createRouter();
import "./styles.css";

const queryClient = new QueryClient();

hydrateRoot(
  document.getElementById("root")!,
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>,
);
