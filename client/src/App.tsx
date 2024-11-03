import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Navbar from "./components/func-components/Navigation";
import Home from "./components/func-components/Home";
// import Medicines from "./components/func-components/Medicines";
import Dashboard from "./components/Dashboard/Dashboard";
import NewAIChat from "./components/Dashboard/AIChat/NewAIChat";
import ContinueAIChat from "./components/Dashboard/AIChat/ContinueAIChat";
import About from "./components/func-components/About";
import Analysis from "./components/Dashboard/Analysis";
import Pricing from "./components/func-components/Pricing";
// import ComingSoon from "./components/func-components/ComingSoon";

const router = createBrowserRouter([
  {
    // Component: Navbar,
    children: [
      {
        path: "/",
        children: [
          {
            index: true,
            Component: Home,
          },
          {
            path: "about",
            Component: About,
          },
          {
            path: "pricing",
            Component: Pricing,
          },
        ],
      },
    ],
  },
  {
    path: "/dashboard/",
    Component: Dashboard,
    children: [
      {
        index: true,
        Component: NewAIChat,
      },
      {
        path: "chat",
        Component: NewAIChat,
      },
      {
        path: "chat/:id",
        Component: ContinueAIChat,
      },
      {
        path: "analysis",
        Component: Analysis,
      },
    ],
  },
]);

export default function App() {
  return (
    <div className="h-auto">
      <RouterProvider router={router} />
    </div>
  );
}
