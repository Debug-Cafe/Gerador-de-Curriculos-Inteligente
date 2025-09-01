import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home.tsx";
import Generator from "../pages/Generator.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "generator",
    element: <Generator />,
  },
]);

export default router;
