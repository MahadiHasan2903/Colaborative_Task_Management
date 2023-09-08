import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyProjects = () => {
  const [tasks, setTasks] = useState([]);
  const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const matchedUser = users.find((user) => user.email === loggedInUserEmail);

    if (matchedUser) {
      const assignedProjects = matchedUser.assignedProjects || [];
      setTasks(assignedProjects);
    }
  }, [loggedInUserEmail]);

  const chunkTasks = (tasks) => {
    const chunkedTasks = [];
    for (let i = 0; i < tasks.length; i += 4) {
      chunkedTasks.push(tasks.slice(i, i + 4));
    }
    return chunkedTasks;
  };

  return (
    <div className="flex w-full mx-10 mt-5">
      {tasks.length === 0 ? (
        <div className="flex items-center justify-center w-full">
          <h1 className="text-gray-500 text-[30px]">
            You are not currently working in any project
          </h1>
        </div>
      ) : (
        <div className="flex flex-wrap items-start justify-start w-full">
          <div className="flex items-center justify-center w-full">
            <h1 className="text-gray-500 text-[40px] my-5 ">My Projects</h1>
          </div>
          {chunkTasks(tasks).map((rowTasks, rowIndex) => (
            <div key={rowIndex} className="flex w-full ">
              {rowTasks.map((task) => (
                <div key={task.id} className="w-[100%] 800px:w-[25%] p-4">
                  <Link to={`/my-project/${task.id}`}>
                    <MyTaskCard task={task} />
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const MyTaskCard = ({ task }) => {
  return (
    <div className="w-full h-[300px] bg-white rounded-lg shadow-sm p-3 relative mx-5">
      <div>
        <h3 className="flex font-bold text-[15px] text-[#333] font-Roboto py-1">
          Project id: {task.id}
        </h3>
        <h3 className="font-bold text-[15px] text-[#333] font-Roboto py-1">
          Project Title: {task.title}
        </h3>
        <h3 className="flex font-bold text-[15px] text-[#333] font-Roboto py-1">
          Project Description: {task.description}
        </h3>
        <h3 className="font-bold text-[15px] text-[#333] font-Roboto py-1">
          Due Date: {task.dueDate}
        </h3>
        <h3 className="font-bold text-[15px] text-[#333] font-Roboto py-1">
          Priority: {task.priority}
        </h3>
        <h3 className="font-bold text-[15px] text-[#333] font-Roboto py-1">
          Assigned To: {task.team}
        </h3>
      </div>
    </div>
  );
};

export default MyProjects;
