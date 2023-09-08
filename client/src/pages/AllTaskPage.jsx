import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import TaskCard from "../components/Task/TaskCard";

const AllTaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    const allTasks = JSON.parse(localStorage.getItem("allTasks")) || [];
    setTasks(allTasks);
  }, []);

  const chunkTasks = (tasks) => {
    const chunkedTasks = [];
    for (let i = 0; i < tasks.length; i += 4) {
      chunkedTasks.push(tasks.slice(i, i + 4));
    }
    return chunkedTasks;
  };

  const filterTasks = () => {
    switch (filter) {
      case "Completed":
        return tasks.filter((task) => task.status === "Completed");
      case "InProgress":
        return tasks.filter((task) => task.status === "In Progress");
      case "Pending":
        return tasks.filter((task) => task.status === "Pending");
      default:
        return tasks;
    }
  };

  return (
    <div className="flex justify-between w-full">
      <div className="w-[100px] 800px:w-[330px]">
        <Sidebar active={5} />
      </div>

      <div className="flex items-start justify-around w-full mx-10 mt-12">
        <div className="w-full">
          <div className="flex items-center justify-center">
            <h1 className="text-gray-500 text-[40px] my-5">Ongoing Projects</h1>
          </div>

          <div className="flex justify-center space-x-4 ">
            <label className="text-[16px]">
              <input
                type="checkbox"
                checked={filter === "completed"}
                onChange={() => setFilter("completed")}
              />
              Completed
            </label>
            <label className="text-[16px]">
              <input
                type="checkbox"
                checked={filter === "inProgress"}
                onChange={() => setFilter("inProgress")}
              />
              In Progress
            </label>
            <label className="text-[16px]">
              <input
                type="checkbox"
                checked={filter === "pending"}
                onChange={() => setFilter("pending")}
              />
              Pending
            </label>
          </div>

          <div className="flex flex-wrap justify-start w-full">
            {chunkTasks(filterTasks()).map((rowTasks, rowIndex) => (
              <div key={rowIndex} className="flex w-full">
                {rowTasks.map((task) => (
                  <div key={task.id} className="w-[100%] 800px:w-[25%] p-4">
                    <TaskCard task={task} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTaskPage;
