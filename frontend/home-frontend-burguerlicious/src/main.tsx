import ReactDOM from "react-dom/client";
import AppProvider from "./context/AppContext.tsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <AppProvider>
    <RouterProvider router={router} />
  </AppProvider>
);
