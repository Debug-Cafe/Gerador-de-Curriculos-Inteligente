import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import "./index.css";


import router from './routes/index.tsx';


const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  
    <RouterProvider router={router} />
  
);

export default router;
