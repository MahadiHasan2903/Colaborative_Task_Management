import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import MyProjects from "../components/Task/MyProjects";

const MyProjectsPage = () => {
  return (
    <div>
      <div className="flex w-full">
        <div className="w-[100px] 800px:w-[330px]">
          <Sidebar active={4} />
        </div>
        <div className="w-full ">
          <MyProjects />
        </div>
      </div>
    </div>
  );
};

export default MyProjectsPage;
