import React from "react";

const TaskCard = ({ task }) => {
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

export default TaskCard;
