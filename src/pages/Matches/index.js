import "./styles.css";
import React, { useEffect, useCallback } from "react";
import {
  Card,
  CardBody,
  Avatar,
  Button,
  Chip,
  Tooltip,
  user,
  CardHeader,
  CardFooter,
  CircularProgress,
  Divider,
  Slider,
  Progress,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { XCircleIcon } from "@heroicons/react/16/solid";
import { API_ENDPOINT } from "../../helpers/api";
import { getItem } from "../../helpers/localStorage";

const userData = [
  {
    name: "John",
    score: 90,
    blurb:
      "I'm a software developer with experience in web development and mobile app development. I'm looking for roommates to play music with. ",
    profileImage: "/profile-img1.jpg",
  },
  {
    name: "Jane",
    score: 85,
    blurb:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    profileImage: "/profile-img1.jpg",
  },
  {
    name: "Alice",
    score: 95,
    blurb:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    profileImage: "/profile-img1.jpg",
  },
];

function ProfileCard({
  dataKey,
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
                console.log(dataKey);
                setUserID(dataKey);
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

export const Matches = () => {
  const navigate = useNavigate();
  const [chart, setChart] = React.useState(null);
  const [userInformation, setUserInformation] = React.useState({});

  const [cookie, setCookie] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [activeUser, setActiveUser] = React.useState(-1);

  const fetchRanking = useCallback(async () => {
    const { content } = (
      await axios.post(`${API_ENDPOINT}/getRanking`, { cookie })
    ).data;
    const data = (
      await axios.post(`${API_ENDPOINT}/getprofile`, {
        cookie,
        userIds: content,
      })
    ).data;
    setIsLoading(false);
    setUserInformation(data);
  }, [cookie]);

  const getChart = useCallback(
    async (id) => {
      // const binaryData = (
      //   await axios.post(`${API_ENDPOINT}/getPentagon`, {
      //     individualRanking: userInformation[id]["qnsRanking"],
      //   })
      // ).data;
      // const b64 = Buffer.from(binaryData, "binary").toString("base64");
      // setChart(`data:image/png;base64,${b64}`);
      setChart("/chart.png");
    },
    // [userInformation]
    []
  );

  useEffect(() => {
    const storedId = getItem("userId");
    setCookie(storedId);
    if (!storedId) return navigate("/");
    fetchRanking();
  }, [navigate, cookie, fetchRanking]);

  const toggleModal = (bool) => {
    setShowModal(bool);
  };

  const openModal = (id) => {
    toggleModal(true);
    setActiveUser(id);
    getChart(id);
  };

  const closeModal = () => {
    toggleModal(false);
    setActiveUser(-1);
    setChart(null);
  };

  return (
    <>
      {!showModal && (
        <div>
          <div className="flex flex-col justify-center align-center">
            <span className="text-xl pb-8 matches-title self-center">
              We found some potential matches for you!
            </span>
            {isLoading && (
              <CircularProgress className="self-center" label="Loading..." />
            )}
          </div>
          <div>
            <div className="profile-card-layout">
              {Object.values(userInformation)
                .filter((v, idx) => idx <= 2)
                .map((user, index) => (
                  <Card key={index} className="max-w-[340px]">
                    <CardHeader className="justify-between">
                      <div className="flex gap-5">
                        <Avatar
                          isBordered
                          radius="full"
                          size="md"
                          src="/avatars/avatar-1.png"
                          showFallback
                        />
                        <div className="flex flex-col gap-1 items-start justify-center">
                          <h4 className="text-small font-semibold leading-none text-default-600">
                            {user["profile"]["name"]}
                          </h4>
                          <h5 className="text-small tracking-tight text-default-400">
                            {user["profile"]["occupation"]}
                          </h5>
                        </div>
                      </div>
                      <Chip color="default">
                        Compatibility: {user["compatibilityScore"]}%
                      </Chip>
                    </CardHeader>
                    <CardBody className="px-3 py-0 text-small text-default-400">
                      <span className="pt-2 text-gray-600">
                        {user["summary"]}
                      </span>
                    </CardBody>
                    <CardFooter className="gap-3 flex flex-row justify-center align-center">
                      <div>
                        <Button
                          color="success"
                          radius="full"
                          size="md"
                          variant={true ? "bordered" : "solid"}
                          onPress={() => openModal(index)}
                        >
                          Learn more!
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                  // <ProfileCard
                  //   dataKey={index}
                  //   name={user["profile"]["name"]}
                  //   score={user["compatibilityScore"]}
                  //   blurb={"hello"}
                  //   showModal={showModal}
                  //   setShowModal={setShowModal}
                  //   setUserID={setSingleUser}
                  // />
                ))}
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="custom-card">
        <Card className="w-3/4 p-8">
          <CardHeader className="justify-between">
            <div className="flex gap-5">
              <Avatar
                isBordered
                radius="full"
                className="w-20 h-20 text-large"
                src="/profile-img1.png"
                showFallback
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-lg font-semibold leading-none text-default-600">
                  {userInformation[activeUser]["profile"]["name"]}
                </h4>
                <h5 className="text-lg tracking-tight text-default-400">
                  {userInformation[activeUser]["profile"]["occupation"]}
                </h5>
              </div>
            </div>
            <Chip color="success" className="ml-auto text-md">
              Compatibility: {userInformation[activeUser]["compatibilityScore"]}
              %
            </Chip>
            <Button
              isIconOnly
              className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-12 translate-x-4"
              radius="full"
              variant="light"
              onPress={closeModal}
            >
              <XCircleIcon />
            </Button>
          </CardHeader>
          <CardBody className="px-3 py-0 text-small text-default-400 w-full h-full flex flex-row">
            <div className="flex flex-col w-1/2 h-full">
              <span className="pt-2 pb-2 text-primary text-lg">Summary</span>
              <span className="pt-2 text-gray-600 text-balance pb-4">
                {userInformation[activeUser]["summary"]}
              </span>
              <span className="pt-2 pb-2 text-primary text-lg">Budget</span>
              <Progress
                label="Monthly limit"
                size="sm"
                value={
                  parseInt(
                    userInformation[activeUser]["profile"]["budget"],
                    10
                  ) || 0
                }
                maxValue={10000}
                color="warning"
                formatOptions={{ style: "currency", currency: "USD" }}
                showValueLabel={true}
                className="max-w-md pb-4"
              />
              <span className="pt-2 pb-2 text-primary text-lg">Location</span>
              <span className="pt-2 text-gray-600 text-balance pb-4">
                {userInformation[activeUser]["profile"]["location"]}
              </span>
              {userInformation[activeUser]["answer"] && (
                <>
                  <span className="pt-2 pb-2 text-primary text-lg">
                    Answered Prompt
                  </span>
                  <span className="pt-2 pb-2 text-gray-400 text-md">
                    {userInformation[activeUser]["leadingPrompt"]}
                  </span>
                  <span className="pt-2 text-gray-600 text-balance pb-4 text-sm">
                    {userInformation[activeUser]["answer"]}
                  </span>
                </>
              )}
            </div>
            <Divider orientation="vertical" className="m-4" />
            <div className="flex flex-col w-1/2 h-full">
              <span className="pt-2 pb-2 text-primary text-lg">
                Compatibility
              </span>
              <img
                src={chart || "/chart.png"}
                alt="Pentagon chart"
                className="h-3/4 w-auto self-center"
              />
            </div>
          </CardBody>
        </Card>
      </div>
        // <div className="modal-card">
        //   <div className="profile-container">
        //     <div className="profile-name-modal">Jason</div>
        //     <div className="profile-image-modal">
        //       {/*
        //   <Avatar
        //       isBordered
        //       radius="full"
        //       className="w-20 h-20 text-large"
        //       src="/favicon.ico"
        //       showFallback
        //     />
        //     </div>

        //     <div className="chip-container-modal">
        //       <Chip color="success" style={{ scale: "150%" }}>
        //         {userInformation[activeUser]["compatibilityScore"]}
        //       </Chip>
        //     </div>
        //   </div>
        //   <Chip
        //     onClose={closeModal}
        //     color="success"
        //     style={{ position: "absolute", scale: "120%", right: "3%" }}
        //   ></Chip>

        //   <div className="user-description">
        //     <div
        //       style={{
        //         display: "flex",
        //         flexDirection: "row",
        //         alignItems: "flex-start",
        //       }}
        //     >
        //       <div className="info-card">
        //         <div className="card-header">Basic Info</div>

        //         <div>
        //           <div className="info-title">
        //             Age: {userInformation[activeUser]["profile"]["age"]}
        //           </div>
        //           <div className="info-title">
        //             Gender: {userInformation[activeUser]["profile"]["gender"]}
        //           </div>
        //           <div className="info-title">
        //             Occupation:{" "}
        //             {userInformation[activeUser]["profile"]["occupation"]}
        //           </div>
        //           <div className="info-title">
        //             Has room: {userInformation[activeUser]["profile"]["room"]}{" "}
        //           </div>
        //           <div className="info-title">Preferred Location:</div>
        //           <Chip color="success">
        //             {userInformation[activeUser]["profile"]["location"]}
        //           </Chip>
        //           <div className="info-title">Budget: </div>
        //           <Chip color="success">
        //             {userInformation[activeUser]["profile"]["budget"]}
        //           </Chip>
        //         </div>
        //       </div>
        //       <div style={{ position: "absolute", scale: "120%", left: "55%" }}>
        //         <span className="chart-title">Here's how you match</span>

        //         <img src={chart} alt="chart" />
        //       </div>
        //     </div>
        //     <div style={{ marginTop: "4%", flexDirection: "column" }}>
        //       <span className="text-xl pb-4 profile-title">
        //         Answers to your questions
        //       </span>

        //       <div style={{ marginTop: "3%" }}>
        //         <span className="chart-title">
        //           {userInformation[activeUser]["leadingPrompt"]}
        //         </span>
        //       </div>
        //       <div style={{ marginTop: "3%" }}>
        //         <span className="chart-title">
        //           {userInformation[activeUser]["answer"]}
        //         </span>
        //       </div>
        //     </div>
        //   </div>
        // </div> */}
      )}
    </>
  );
};