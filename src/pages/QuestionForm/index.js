import "./styles.css";
import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  CircularProgress,
  Select,
  SelectItem,
  Slider,
  Textarea,
} from "@nextui-org/react";
import { Textfit } from "react-textfit";
import { getItem } from "../../helpers/localStorage";
import { API_ENDPOINT } from "../../helpers/api";

const traits = [
  "Communication",
  "Boundaries",
  "Financial Responsibilities",
  "Compromise",
  "Ownership",
  "Cleanliness",
  "Similar Interests",
  "Reliability",
  "Adaptability",
  "Pets",
  "Quiet Hours",
  "Vice Usage",
];

export const QuestionForm = () => {
  const navigate = useNavigate();
  const [questionId, setQuestionId] = React.useState("");
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [questionText, setQuestionText] = React.useState("");
  const [questionType, setQuestionType] = React.useState(0);
  const [binaryAnswer, setBinaryAnswer] = React.useState(true);
  const [sliderAnswer, setSliderAnswer] = React.useState(5);
  const [textAnswer, setTextAnswer] = React.useState("");
  const [choices, setChoices] = React.useState(new Set([]));
  const [targetUser, setTargetUser] = React.useState("");
  const [cookie, setCookie] = React.useState("");
  const [softmatch, setSoftmatch] = React.useState(false);

  const refreshCachedAnswers = () => {
    setBinaryAnswer(true);
    setSliderAnswer(5);
    setTextAnswer("");
    setChoices(new Set([]));
  };

  const uploadAnswer = (data) =>
    axios.post(`${API_ENDPOINT}/submitAnswer`, {
      ...data,
      cookie,
    });

  const handleSubmit = async () => {
    let answer;
    let isPrompt = false;
    let isPromptAns = false;
    let userId;
    switch (questionType) {
      case 0: {
        answer = binaryAnswer;
        break;
      }
      case 1: {
        answer = sliderAnswer;
        break;
      }
      case 2: {
        answer = textAnswer;
        break;
      }
      case 4: {
        answer = textAnswer;
        isPrompt = true;
        userId = targetUser;
        break;
      }
      case 5: {
        answer = textAnswer;
        isPromptAns = true;
        break;
      }
      case 3: {
        answer = choices;
        break;
      }
      default: {
        console.error("Reached invalid state");
        return;
      }
    }
    try {
      const response = await uploadAnswer({
        answer,
        isLeadingPrompt: isPrompt,
        isLeadingPromptAns: isPromptAns,
        cookie,
        userId,
        qnsId: questionId,
      });
      const { status } = response.data;
      console.log(`Received status ${status} ${typeof status}`);
      if (status === 0) {
        fetchQuestion();
      } else if (status === 1) {
        // TODO: Prompt was bad, ask again
        console.log("Prompt was bad, ask again");
        fetchQuestion();
      } else if (status === 2) {
        // Short-circuit
        fetchQuestion();
        setSoftmatch(true);
      }
    } catch (err) {
      console.error("Error uploading answer:", err);
    }
  };

  const handleBinaryTrue = () => setBinaryAnswer(true);
  const handleBinaryFalse = () => setBinaryAnswer(false);

  const fetchQuestion = useCallback(() => {
    setIsLoaded(false);
    refreshCachedAnswers();
    axios
      .post(`${API_ENDPOINT}/getQuestion`, { cookie })
      .then((response) => {
        const data = response.data;
        const { qnsType, content, userId, qnsId } = data;
        setQuestionId(qnsId);
        setQuestionType(qnsType);
        setQuestionText(content);
        setTargetUser(userId);

        if (qnsType === 6) {
          // Redirect to the matches page
          navigate("/matches", { state: { data } });
        }
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching question data:", error);
      });
  }, [navigate, cookie]);

  useEffect(() => {
    // Fetch the question data from the backend
    const storedId = getItem("userId");
    setCookie(storedId);
    if (!storedId) return navigate("/");
    fetchQuestion();
  }, [navigate, isLoaded, cookie, fetchQuestion]);

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
    <>
      {!isLoaded && <CircularProgress label="Loading..." />}
      {isLoaded && (
        <div className="flex flex-col gap-10 align-center justify-center pb-2 w-full h-full">
          {questionText && (
            <Textfit
              mode="multi"
              className="text-[3.2vw] text-center object-contain w-3/4 h-48 self-center text-primary"
            >
              {questionText}
            </Textfit>
          )}
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
            {questionType === 2 ||
              (questionType === 5 && (
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
              ))}
            {questionType === 4 && (
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
            {questionType === 3 && (
              <div className="w-full self-center flex flex-col gap-4 align-center justify-center">
                {/* <span className="w-full text-2xl text-balance text-center">
                  What traits are the most important in a roommate?
                </span>
                <span className="text-xl text-balance text-center">
                  Choose the most important ones!
                </span> */}
                <Select
                  label="Roommate traits"
                  className="w-full"
                  selectedKeys={choices}
                  selectionMode="multiple"
                  onSelectionChange={setChoices}
                >
                  {traits.map((value, idx) => (
                    <SelectItem key={idx} value={idx}>
                      {value}
                    </SelectItem>
                  ))}
                </Select>
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
      )}
    </>
  );
};
