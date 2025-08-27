import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

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

ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />,
);

export default router;