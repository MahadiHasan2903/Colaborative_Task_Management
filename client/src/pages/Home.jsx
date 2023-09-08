import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";

const Home = () => {
  return (
    <div>
      <div className="flex items-center justify-between w-full">
        <div className="w-[100px] 800px:w-[330px]">
          <Sidebar active={1} />
        </div>
        <div className="flex items-center justify-center w-full m-10">
          <h1 className="text-[54px]">
            Welcome to the Colaborative Task Management App
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
