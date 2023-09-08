import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import CreateTask from "../components/Task/CreateTask";

const CreateTaskPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between w-full">
        <div className="w-[100px] 800px:w-[330px]">
          <Sidebar active={3} />
        </div>
        <div className="flex justify-center w-full">
          <CreateTask />
        </div>
      </div>
    </div>
  );
};

export default CreateTaskPage;
