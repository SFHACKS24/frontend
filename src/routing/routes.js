import { createBrowserRouter } from "react-router-dom";
import { Landing } from "../pages/Landing";
import { Profile } from "../pages/Profile";
import { QuestionForm } from "../pages/QuestionForm";
import { Matches } from "../pages/Matches";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/questions",
    element: <QuestionForm />,
  },
  {
    path: "/matches",
    element: <Matches />,
  },
]);

export default router;
