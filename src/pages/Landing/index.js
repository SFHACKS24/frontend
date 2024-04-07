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
      navigate("/questions");
    }
  };
  return (
    <div className="landing-container gap-4">
      <img className="size-48" src="/greenflag.png" alt="logo" />
      <h1 className="text-8xl text-primary">greenflags</h1>
      <h2 className="text-2xl font-bold pb-8">
        Supercharged roommate vibechecks
      </h2>
      <Button color="success" className="w-1/4" onClick={handleSubmit}>
        Let's start!
      </Button>
    </div>
  );
};
