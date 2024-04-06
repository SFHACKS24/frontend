import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Slider, Textarea } from "@nextui-org/react";

export const QuestionForm = () => {
  const navigate = useNavigate();
  const [questionId, setQuestionId] = React.useState("");
  const [questionText, setQuestionText] = React.useState("");
  const [questionType, setQuestionType] = React.useState(3);
  const [binaryAnswer, setBinaryAnswer] = React.useState(true);
  const [sliderAnswer, setSliderAnswer] = React.useState(5);
  const [textAnswer, setTextAnswer] = React.useState("");

  const uploadAnswer = (data) => {
    // Code to upload data to the backend
  };

  const handleSubmit = () => {
    // Redirect to the next page
    navigate("/questions");
  };

  const handleBinaryTrue = () => setBinaryAnswer(true);
  const handleBinaryFalse = () => setBinaryAnswer(false);

  useEffect(() => {
    // Fetch the question data from the backend
    axios
      .post("/getQuestion")
      .then((response) => {
        const data = response.data;
        setQuestionId(data.id);
        setQuestionText(data.text);
        setQuestionType(data.type);

        if (data.type === 6) {
          // Redirect to the matches page
          navigate("/matches", { state: { data } });
        }
      })
      .catch((error) => {
        console.error("Error fetching question data:", error);
      });
  }, [navigate]);

  /* getQuestion
    0 -> Binary
    1 -> Scale
    2 -> Text
    3 -> Weightage
    4 -> Enter leading prompt
    5 -> Answer a leading prompt
    6 -> Question bank depleted. Recommendations
  */

  /* submitAnswer
    0 -> Success with no short-circuit
    1 -> Failure (my answer sucks, give another prompt)
    2 -> Success with short-circuit (notification should appear)
  */
  return (
    <div className="flex flex-col gap-10 align-center justify-center pb-2 w-full h-full">
      <span className="text-[3.2vw] text-center">{questionText}</span>
      <div className="w-1/2 self-center flex flex-col gap-10 align-center justify-center">
        {questionType === 0 && (
          <div className="w-full self-center flex flex-row gap-10 align-center justify-center">
            <Button
              color="primary"
              variant={binaryAnswer ? "solid" : "bordered"}
              onClick={handleBinaryTrue}
              className="w-1/2 h-16 text-xl"
            >
              True
            </Button>
            <Button
              color="secondary"
              variant={!binaryAnswer ? "solid" : "bordered"}
              onClick={handleBinaryFalse}
              className="w-1/2 h-16 text-xl"
            >
              False
            </Button>
          </div>
        )}
        {questionType === 1 && (
          <div>
            <Slider
              label="Enter your response"
              className="w-full h-16 text-primary"
              step={1}
              maxValue={10}
              minValue={0}
              defaultValue={5}
              value={sliderAnswer}
              onChange={setSliderAnswer}
            ></Slider>
          </div>
        )}
        {questionType === 2 && (
          <div className="h-64">
            <Textarea
              className="w-full mix-blend-multiply"
              minRows={64}
              placeholder="I think that..."
              value={textAnswer}
              onValueChange={setTextAnswer}
              size="lg"
            />
          </div>
        )}
        {questionType === 3 && (
          <div className="w-full self-center flex flex-col gap-4 align-center justify-center">
            <span className="w-full text-2xl text-balance text-center">
              Now it's your turn. What question would you ask your roommate?
            </span>
            <span className="text-xl text-balance text-center">
              Make it count!
            </span>
            <Textarea
              minRows={12}
              className="w-full mix-blend-multiply"
              placeholder="For e.g. If I were trapped in a fire, would you save me or my dog first?"
              value={textAnswer}
              onValueChange={setTextAnswer}
            ></Textarea>
          </div>
        )}
        {questionType === 4 && (
          <div>
            <Textarea
              className="w-full h-8"
              placeholder="Berkeley, CA..."
              value={textAnswer}
              onValueChange={setTextAnswer}
            ></Textarea>
          </div>
        )}
        {questionType === 5 && (
          <div>
            <Textarea
              className="w-full h-8"
              placeholder="Berkeley, CA..."
              value={textAnswer}
              onValueChange={setTextAnswer}
            ></Textarea>
          </div>
        )}
        <Button
          color="primary"
          onClick={handleSubmit}
          className="self-center w-1/4"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
