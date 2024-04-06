import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routing/routes";

function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
