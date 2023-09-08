import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AllUsers from "../components/Allusers/AllUsers";

const ProjectDetailsPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    const taskData = JSON.parse(localStorage.getItem("allTasks")).find(
      (task) => task.id === taskId
    );
    setTask(taskData);

    // Initialize buttonClicked to false whenever taskId changes
    setButtonClicked(false);
  }, [taskId]);

  const handleButtonClick = (status) => {
    const updatedTasks = JSON.parse(localStorage.getItem("allTasks")).map((t) =>
      t.id === taskId ? { ...t, status } : t
    );
    localStorage.setItem("allTasks", JSON.stringify(updatedTasks));

    if (status === "Completed") {
      setButtonClicked(true);
    } else {
      setButtonClicked(false);
    }

    alert("Project Status is updated");
  };

  return (
    <div>
      {task ? (
        <div>
          <div className="flex justify-around m-5">
            <div className=" bg-white w-[40%]  h-[90vh] ">
              <div>
                <div className="flex justify-center my-5">
                  <h1 className="text-[40px]">
                    <u>Project Info</u>
                  </h1>
                </div>
                <h3 className="flex font-bold text-[20px] text-[#333] font-Roboto py-1 my-5 mx-10">
                  Project id: {task.id}
                </h3>
                <h3 className="font-bold text-[20px] text-[#333] font-Roboto py-1 my-5 mx-10">
                  Project Title: {task.title}
                </h3>
                <h3 className="flex font-bold text-[20px] text-[#333] font-Roboto py-1 my-5 mx-10">
                  Project Description: {task.description}
                </h3>
                <h3 className="font-bold text-[20px] text-[#333] font-Roboto py-1 my-5 mx-10">
                  Due Date: {task.dueDate}
                </h3>
                <h3 className="font-bold text-[20px] text-[#333] font-Roboto py-1 my-5 mx-10">
                  Priority: {task.priority}
                </h3>
                <h3 className="font-bold text-[20px] text-[#333] font-Roboto py-1 my-5 mx-10">
                  Assigned To: {task.team}
                </h3>
              </div>

              <div className="flex justify-around mt-10">
                <button
                  className="text-[16px] text-white py-2 px-4 bg-[#008000]"
                  onClick={() => handleButtonClick("Completed")}
                  disabled={buttonClicked}
                >
                  Completed
                </button>
                <button
                  className="text-[18px] text-black py-2 px-4 bg-[#FFFF00]"
                  onClick={() => handleButtonClick("In Progress")}
                >
                  In Progress
                </button>
                <button
                  className="text-[16px] text-white py-2 px-4 bg-[#0000ff]"
                  onClick={() => handleButtonClick("Pending")}
                >
                  Pending
                </button>
              </div>
            </div>
            <div className=" bg-white w-[40%]  h-[90vh] p-5">
              <AllUsers selectedTask={task} />
            </div>
          </div>
        </div>
      ) : (
        <p>No task is Available for you.</p>
      )}
    </div>
  );
};

export default ProjectDetailsPage;
