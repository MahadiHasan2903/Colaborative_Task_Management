import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import ProfileContent from "../components/ProfileContent/ProfileContent";

const Profile = () => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="w-[100px] 800px:w-[330px]">
        <Sidebar active={2} />
      </div>
      <div className="flex justify-center w-full">
        <ProfileContent />
      </div>
    </div>
  );
};

export default Profile;
