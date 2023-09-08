import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";

const InvitationsPage = () => {
  const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const existingUserData = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = existingUserData.find(
      (userData) => userData.email === loggedInUserEmail
    );
    setUser(foundUser);
  }, [loggedInUserEmail]);

  const handleAcceptInvitation = (invitationIndex) => {
    if (user && user.projectInvitations) {
      // Create a copy of the user object
      const updatedUser = { ...user };

      // Remove the specific invitation from projectInvitations
      const acceptedInvitation = updatedUser.projectInvitations.splice(
        invitationIndex,
        1
      )[0];

      // Add the accepted invitation to assignedProjects
      if (!updatedUser.assignedProjects) {
        updatedUser.assignedProjects = [];
      }
      updatedUser.assignedProjects.push(acceptedInvitation);

      // Update the user state
      setUser(updatedUser);

      // Update the localStorage with the modified user object
      const existingUserData = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUserData = existingUserData.map((userData) => {
        if (userData.email === loggedInUserEmail) {
          return updatedUser;
        }
        return userData;
      });
      localStorage.setItem("users", JSON.stringify(updatedUserData));

      // Display an alert
      alert("Invitation accepted.");
    }
  };

  const handleRejectInvitation = (invitationIndex) => {
    if (user && user.projectInvitations) {
      // Create a copy of the user object and remove the specific invitation
      const updatedUser = { ...user };
      updatedUser.projectInvitations.splice(invitationIndex, 1);

      // Update the user state
      setUser(updatedUser);

      // Update the localStorage with the modified user object
      const existingUserData = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUserData = existingUserData.map((userData) => {
        if (userData.email === loggedInUserEmail) {
          return updatedUser;
        }
        return userData;
      });
      localStorage.setItem("users", JSON.stringify(updatedUserData));

      // Display an alert
      alert("Invitation rejected.");
    }
  };

  return (
    <div className="flex w-full ">
      <div className="w-[100px] 800px:w-[330px]">
        <Sidebar active={6} />
      </div>
      <div className="flex w-full">
        <div className="w-full m-5 ">
          <div className="flex items-center justify-center">
            <h1 className="text-[40px] my-5">Invitations</h1>
          </div>
          <div className="flex justify-start w-full ">
            {user &&
            user.projectInvitations &&
            user.projectInvitations.length > 0 ? (
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {user.projectInvitations.map((invitation, index) => (
                  <li
                    key={index}
                    style={{ display: "inline-block", margin: "10px" }}
                  >
                    <div className="w-full  h-[300px] bg-white rounded-lg shadow-sm p-3 relative">
                      <div>
                        <h3 className="flex font-bold text-[15px] text-[#333] font-Roboto py-1">
                          Project id: {invitation.projectId}
                        </h3>
                        <h3 className="flex font-bold text-[15px] text-[#333] font-Roboto py-1">
                          Project Description: {invitation.projectDescription}
                        </h3>
                        <h3 className="flex font-bold text-[15px] text-[#333] font-Roboto py-1">
                          Due Date: {invitation.dueDate}
                        </h3>
                        <h3 className="flex font-bold text-[15px] text-[#333] font-Roboto py-1">
                          Priority: {invitation.priority}
                        </h3>
                      </div>
                      <div className="flex items-center justify-around">
                        <button
                          className="w-full p-1 text-[18px] bg-[#008000] mx-2 mt-12 cursor-pointer"
                          onClick={() => handleAcceptInvitation(index)}
                        >
                          Accept
                        </button>
                        <button
                          className="w-full p-1 text-[18px] bg-[#ff0000] mx-2 mt-12 cursor-pointer"
                          onClick={() => handleRejectInvitation(index)}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex items-center justify-center w-full ">
                <h1 className="text-[24px] text-[#333] font-Roboto mt-12">
                  Currently No invitation is available
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationsPage;
