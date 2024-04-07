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
      // navigate("/profile");
    } else {
      // navigate("/questions");
    }
    navigate("/profile");
  };
  return (
    <div className="landing-container gap-4">
      <img className="size-36" src="/greenflag.png" alt="logo" />
      <h1 className="text-8xl text-primary">greenflags</h1>
      <h2 className="pb-5 subfont">
        Supercharged roommate vibechecks
      </h2>
      <Button color="success" className="custom-width-button" onClick={handleSubmit}>
        Let's start!
      </Button>
    </div>
  );
};
