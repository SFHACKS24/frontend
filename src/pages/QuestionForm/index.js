import React, { useEffect } from "react";

export const QuestionForm = () => {
  const [questionId, setQuestionId] = React.useState("");
  const [questionText, setQuestionText] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const [questionType, setQuestionType] = React.useState(0);

  const uploadAnswer = (data) => {
    // Code to upload data to the backend
  };

  const handleSubmit = () => {
    // Redirect to the next page
    window.location.href = "/questions";
  };

  useEffect(() => {
    // Fetch the question data from the backend
    fetch("/getQuestion")
      .then((response) => response.json())
      .then((data) => {
        setQuestionId(data.id);
        setQuestionText(data.text);
        setQuestionType(data.type);
      })
      .catch((error) => {
        console.error("Error fetching question data:", error);
      });
  }, []);

  return (
    <div>
      <span className="text-xl pb-4 profile-title">
        Let's start this journey. Tell us about yourself!
      </span>
    </div>
  );
};
