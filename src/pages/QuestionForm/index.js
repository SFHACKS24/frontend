import React from "react";
import {
  Card,
  CardBody,
  Avatar,
  Textarea,
  Checkbox,
  Select,
  SelectItem,
  Button,
  CardFooter,
  Slider,
} from "@nextui-org/react";

export const QuestionForm = () => {
  const [questionId, setQuestionId] = React.useState("");
  const [questionText, setQuestionText] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const [questionType, setQuestionType] = React.useState(0);

  const uploadDataToBackend = (data) => {
    // Code to upload data to the backend
  };

  const handleUpload = () => {
    // Save the user's profile data to localStorage
    // localStorage.setItem("profileData", JSON.stringify(profileData));

    // // Upload the data to the backend
    // uploadDataToBackend(profileData);

    // Redirect to the next page
    window.location.href = "/questions";
  };

  const handleSubmit = () => {
    handleUpload();
  };

  return (
    <div>
      <span className="text-xl pb-4 profile-title">
        Let's start this journey. Tell us about yourself!
      </span>
    </div>
  );
};
