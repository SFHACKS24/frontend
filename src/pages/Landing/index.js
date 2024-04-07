import "./styles.css";
import React from "react";
import { Button } from "@nextui-org/react";
import { getItem, startSession } from "../../helpers/localStorage";
import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    const session = getItem("userId");
    if (!session) {
      startSession();
      navigate("/profile");
    } else {
      navigate("/questions");
    }
  };
  return (
    <div className="landing-container">
      <h1>greenflags</h1>
      <h2>Supercharged roommate vibechecks</h2>
      <Button color="primary" onClick={handleSubmit}>
        Let's start!
      </Button>
    </div>
  );
};
