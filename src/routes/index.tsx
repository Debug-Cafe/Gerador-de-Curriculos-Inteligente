import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home.tsx";
import Generator from "../pages/Generator.tsx";
import Visualizer from "../pages/Visualizer.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "generator",
    element: <Generator />,
  },
  {
    path: "visualizer",
    element: <Visualizer />,
  },
]);

export default router;
