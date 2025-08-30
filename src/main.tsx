import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Home from './pages/Home.tsx';
import Generator from './pages/Generator.tsx';
import Visualizer from './pages/Visualizer.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx'; 

const router = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <div>Erro na Home</div> },
  { path: "generator", element: <Generator />, errorElement: <div>Erro no Generator</div> },
  { path: "visualizer", element: <Visualizer />, errorElement: <div>Erro no Visualizer</div> },
]);

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <ErrorBoundary>
    <RouterProvider router={router} />
  </ErrorBoundary>
);

export default router;
