import React, { useEffect } from "react";
import "./styles.css";
import {
  Card,
  CardBody,
  Avatar,
  Button,
  Chip,
  Tooltip,
} from "@nextui-org/react";
import axios from "axios";
import { API_ENDPOINT } from "../../helpers/api";
import { useLocation, useNavigate } from "react-router-dom";

function ProfileCard({
  key,
  name,
  score,
  blurb,
  profileImage,
  showModal,
  setShowModal,
  setUserID,
}) {
  return (
    <div>
      <div className="matches-card">
        <div className="profile-card">
          <div className="profile-container">
            <div className="profile-name">{name}</div>
            <div className="profile-image"></div>
            <div className="chip-container">
              {score !== null && <Chip color="success">{score}%</Chip>}
            </div>
          </div>
          <div className="profile-description">{blurb}</div>
          <div
            className="profile-button-container"
            style={{ position: "absolute", bottom: "16px" }}
          >
            <Button
              color="success"
              onClick={() => {
                setShowModal(!showModal);
                setUserID(key);
              }}
            >
              See more
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;

export const Matches = () => {
  const [profileImage, setProfileImage] = React.useState("");
  const [name, setName] = React.useState("");
  const [score, setScore] = React.useState(90);
  const [blurb, setBlurb] = React.useState("");

  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [occupation, setOccupation] = React.useState("");
  const [hasRoom, setHasRoom] = React.useState(true);
  const [location, setLocation] = React.useState("Berkeley");
  const [budget, setBudget] = React.useState(0);
  const [question, setQuestion] = React.useState("question placeholder");
  const [answer, setAnswer] = React.useState("answer placeholder");
  const [chart, setChart] = React.useState("src/images/chart.png");

  const data = [
    {
      name: "John",
      score: 90,
      blurb:
        "I'm a software developer with experience in web development and mobile app development. I'm looking for roommates to play music with. ",
      profileImage: "src/images/profile-img1.jpg",
    },
    {
      name: "Jane",
      score: 85,
      blurb:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      profileImage: "src/images/profile-img1.jpg",
    },
    {
      name: "Alice",
      score: 95,
      blurb:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      profileImage: "src/images/profile-img1.jpg",
    },
  ];

  const navigation = useNavigate();
  const { state } = useLocation();
  const { userIdList } = state;
  const [userInformation, setUserInformation] = React.useState({});

  axios
    .post(`${API_ENDPOINT}/getUserInformation`, { userIdList })
    .then((response) => {
      const data = response.data;
      setUserInformation(data);
    })
    .catch((error) => {
      console.error("Error fetching question data:", error);
    });

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const [showModal, setShowModal] = React.useState(false);

  const [userID, setUserID] = React.useState({});

  return (
    <>
      {!showModal && (
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <span className="text-xl pb-4 matches-title">
              We found some potential matches for you!
            </span>
          </div>
          <div>
            <div className="profile-card-layout">
              {Object.values(userInformation).map((user, index) => (
                <ProfileCard
                  key={index}
                  name={user["profile"]["name"]}
                  score={user["compatibilityScore"]}
                  blurb={"hello"}
                  showModal={showModal}
                  setShowModal={setShowModal}
                  setUserID={setUserID}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal-card">
          <div className="profile-container">
            <div className="profile-name-modal">Jason</div>
            <div className="profile-image-modal">
              {/*             
          <Avatar
              isBordered
              radius="full"
              className="w-20 h-20 text-large"
              src="/favicon.ico"
              showFallback
            /> */}
            </div>

            <div className="chip-container-modal">
              <Chip color="success" style={{ scale: "150%" }}>
                {score}
              </Chip>
            </div>
          </div>
          <Chip
            onClose={toggleModal}
            color="success"
            style={{ position: "absolute", scale: "120%", right: "3%" }}
          ></Chip>

          <div className="user-description">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
              }}
            >
              <div className="info-card">
                <div className="card-header">Basic Info</div>

                <div>
                  <div className="info-title">
                    Age: {userInformation[userID]["profile"]["age"]}
                  </div>
                  <div className="info-title">
                    Gender: {userInformation[userID]["profile"]["gender"]}
                  </div>
                  <div className="info-title">
                    Occupation:{" "}
                    {userInformation[userID]["profile"]["occupation"]}
                  </div>
                  <div className="info-title">
                    Has room: {userInformation[userID]["profile"]["room"]}{" "}
                  </div>
                  <div className="info-title">Preferred Location:</div>
                  <Chip color="success">
                    {userInformation[userID]["profile"]["location"]}
                  </Chip>
                  <div className="info-title">Budget: </div>
                  <Chip color="success">
                    {userInformation[userID]["profile"]["budget"]}
                  </Chip>
                </div>
              </div>
              <div style={{ position: "absolute", scale: "120%", left: "55%" }}>
                <span className="chart-title">Here's how you match</span>

                <img src={chart} alt="chart" />
              </div>
            </div>
            <div style={{ marginTop: "4%", flexDirection: "column" }}>
              <span className="text-xl pb-4 profile-title">
                Answers to your questions
              </span>

              <div style={{ marginTop: "3%" }}>
                <span className="chart-title">
                  {userInformation[userID]["leadingPrompt"]}
                </span>
              </div>
              <div style={{ marginTop: "3%" }}>
                <span className="chart-title">
                  {userInformation[userID]["answer"]}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
