import "./styles.css";
import React, { useEffect } from "react";
import axios from "axios";
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
  CardHeader,
} from "@nextui-org/react";
import { getItem } from "../../helpers/localStorage";

const genders = [
  ["M", "Male"],
  ["F", "Female"],
  ["NB", "Non-binary"],
  ["PNTS", "Prefer not to say"],
];

export const Profile = () => {
  const [hasRoom, setHasRoom] = React.useState(true);
  const [name, setName] = React.useState("");
  const [occupation, setOccupation] = React.useState("");
  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState("M");
  const [location, setLocation] = React.useState("");
  const [budget, setBudget] = React.useState(5000);
  const [userId, setUserId] = React.useState("");

  const uploadDataToBackend = (data) => {
    axios.post("/profile", data);
  };

  const handleSubmit = () => {
    const profileData = {
      hasRoom,
      name,
      occupation,
      age,
      gender,
      location,
      budget,
    };

    // Save the user's profile data to localStorage
    localStorage.setItem("profileData", JSON.stringify(profileData));

    // Upload the data to the backend
    uploadDataToBackend(profileData);

    // Redirect to the next page
    window.location.href = "/questions";
  };

  const handleSelectionChange = (e) => {
    setGender(e.target.key);
  };

  useEffect(() => {
    const storedId = getItem("userId");
    if (!storedId) {
      window.location.href = "/";
    }
    // TODO: Check if the user has already filled out their profile
    setUserId(storedId);
  }, []);

  return (
    <div className="profile-container">
      <span className="text-xl pb-4 profile-title">
        Let's start this journey. Tell us about yourself!
      </span>
      <Card
        className="border-none bg-background/20 dark:bg-default-100/5 px-12 pb-4"
        shadow="sm"
        isBlurred
      >
        {/* <CardHeader className="text-xl text-primary pt-4">
          Basic Profile
        </CardHeader> */}
        <CardBody className="justify-between">
          <div className="flex flex-row gap-4 items-start justify-left pt-8 pb-8">
            <Avatar
              isBordered
              radius="full"
              className="w-20 h-20 text-large"
              src="/favicon.ico"
              showFallback
            />
            <div className="flex flex-col gap-8 items-start justify-center">
              <div className="flex flex-row gap-4 items-start justify-center w-full">
                <Textarea
                  placeholder="Name"
                  className="w-1/3 h-4"
                  value={name}
                  onValueChange={setName}
                ></Textarea>
                <Textarea
                  placeholder="Occupation"
                  className="w-2/3 h-4"
                  value={occupation}
                  onValueChange={setOccupation}
                ></Textarea>
              </div>
              <div className="flex flex-row gap-4 items-start justify-center w-full">
                <Textarea
                  placeholder="Age"
                  className="w-1/3 h-4"
                  value={age}
                  onValueChange={setAge}
                ></Textarea>
                <div className="w-2/3 h-4">
                  <Select
                    placeholder="What's your gender?"
                    className="w-full"
                    selectedKeys={[gender]}
                    onChange={handleSelectionChange}
                  >
                    {genders.map((gender) => (
                      <SelectItem key={gender[0]} value={gender[1]}>
                        {gender[1]}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 items-start justify-center">
            <div className="flex flex-row gap-1 items-start">
              <span className="pr-4 text-primary">
                Do you currently have a room?
              </span>
              <Checkbox
                isSelected={hasRoom}
                onValueChange={setHasRoom}
                className="border-transparent"
              >
                <span className="text-primary">{hasRoom ? "Yes" : "No"}</span>
              </Checkbox>
            </div>
            <div className="flex flex-col gap-2 items-start justify-center pb-2 w-full">
              <span className="text-primary">
                What's your preferred location? Please be as specific as you
                can!
              </span>
              <Textarea
                className="w-full h-8"
                placeholder="Berkeley, CA..."
                value={location}
                onValueChange={setLocation}
              ></Textarea>
            </div>
            <div className="flex flex-col gap-2 items-start justify-center w-full">
              <Slider
                label="What is your maximum budget?"
                className="w-full h-16 text-primary"
                step={100}
                maxValue={10000}
                minValue={0}
                defaultValue={5000}
                value={budget}
                formatOptions={{ style: "currency", currency: "USD" }}
                onChange={setBudget}
              ></Slider>
            </div>
          </div>
        </CardBody>
        <CardFooter className="flex flex-row justify-end">
          <Button color="primary" onClick={handleSubmit}>
            Next
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
