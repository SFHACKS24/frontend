import React from "react";
import { useEffect } from "react";
import "./styles.css";
import { Card, CardBody, Avatar, Button, Chip } from "@nextui-org/react";
import axios from 'axios'; 


function ProfileCard({ name, score, blurb }) {
  return (
    <div className="matches-card">
      <div className="profile-card">
        <div className="profile-container">
          <div className="profile-name">{name}</div>
          <div className="profile-image"></div>
          <div className="chip-container">
            {score !== null && <Chip color="success">{score}%</Chip>}
          </div>
        </div>
        <div className="profile-description" >
          {blurb}
        </div>
        <div className="profile-button-container" style={{ position: "absolute", bottom: "16px" }}>
          <Button color="success" >See more</Button>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;

export const Matches = () => {
  const [profileImage, setProfileImage] = React.useState("");
  const [name, setName] = React.useState("");
  const [score, setScore] = React.useState(null); 
  const [blurb, setBlurb] = React.useState("");
  
  const data = [
    { name: 'John', score: 90, blurb: "I'm a software developer with experience in web development and mobile app development. I'm looking for roommates to play music with. " },
    { name: 'Jane', score: 85, blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { name: 'Alice', score: 95, blurb: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' }, 
    { name: 'Bob', score: 80, blurb: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' }
  ];
  
  return (
    <div>
      <div>
        <span class="text-xl pb-4 profile-title">
          Here are your matches!
        </span>
      </div>
      <div>
      <div className="profile-card-layout">
      {data.map((item, index) => (
        <ProfileCard
          key={index}

          name={item.name}
          score={item.score}
          blurb={item.blurb}
        />
      ))}
    </div>

   

    </div>
    </div>
  );
};
