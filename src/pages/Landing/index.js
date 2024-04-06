import "./styles.css";
import React from "react";
import { Button } from "@nextui-org/react";
import { getItem, startSession } from "../../helpers/localStorage";

export const Landing = () => {
  const handleSubmit = () => {
    const session = getItem("userId");
    if (!session) {
      startSession();
      window.location.href = "/profile";
    } else {
      window.location.href = "/questions";
    }
  };
  return (
    <div className="landing-container">
      <span>greenflags</span>
      <span>Supercharged roommate vibechecks</span>
      <Button color="primary" onClick={handleSubmit}>
        Let's start!
      </Button>
    </div>
  );
};
