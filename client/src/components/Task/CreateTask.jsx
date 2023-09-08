import React, { useState } from "react";

const priorityOptions = ["Lowest", "Medium", "Highest"];

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [team, setTeam] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingTasks = JSON.parse(localStorage.getItem("allTasks")) || [];
    const taskCount = existingTasks.length;
    const taskId = `Project_${taskCount + 1}`;
    const isDuplicateTitle = existingTasks.some((task) => task.title === title);

    if (isDuplicateTitle) {
      alert("A task with the same title already exists.");
      return;
    }

    const currentDate = new Date();
    const selectedDueDate = new Date(dueDate);

    if (selectedDueDate < currentDate) {
      alert("Due date cannot be set to a past date.");
      return;
    }

    const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");

    // Find the user object with the matching email
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const matchedUser = users.find((user) => user.email === loggedInUserEmail);

    if (!matchedUser) {
      alert("Logged-in user not found.");
      return;
    }

    const newTask = {
      id: taskId,
      title,
      description,
      priority,
      dueDate,
      team,
      assignedTo: [],
      status: null,
    };

    existingTasks.push(newTask);

    // Update the assignedProjects array of the matched user
    matchedUser.assignedProjects.push(newTask);

    // Update the users array in local storage
    const updatedUsers = users.map((user) =>
      user.email === loggedInUserEmail ? matchedUser : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    localStorage.setItem("allTasks", JSON.stringify(existingTasks));

    setTitle("");
    setDescription("");
    setPriority("");
    setDueDate("");
    setTeam("");

    alert("Task created successfully!");
  };

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white  shadow h-[90vh] rounded-[4px] p-3 ">
      <h5 className="text-[30px] font-Poppins text-center text-black">
        Create Task
      </h5>
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2 text-black">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={title}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter project title..."
          />
        </div>
        <br />

        <div>
          <label className="pb-2 text-black ">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            required
            rows="8"
            type="text"
            name="description"
            value={description}
            className="mt-2 bg-white text-black resize-none appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter project description..."
          ></textarea>
        </div>
        <br />

        <div>
          <label className="pb-2 text-black">
            Assigned Team Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={team}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setTeam(e.target.value)}
            placeholder="Enter project title..."
          />
        </div>
        <br />

        <div>
          <label className="pb-2 text-black">
            Priority level <span className="text-red-500">*</span>
          </label>
          <select
            name="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="mt-2 cursor-pointer block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="" disabled>
              Select priority level
            </option>
            {priorityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <br />
        <div>
          <label className="pb-2 text-black">
            Due date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="releaseDate"
            id="start-date"
            value={dueDate}
            className="mt-2 text-black appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <br />
        <div>
          <input
            type="submit"
            value="Create"
            className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
