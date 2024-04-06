import "./App.css";
import { RouterProvider } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/700.css";

import router from "./routing/routes";

function App() {
  return (
    <NextUIProvider>
      <main className="light text-foreground bg-background">
        <RouterProvider router={router} />
      </main>
    </NextUIProvider>
  );
}

export default App;
