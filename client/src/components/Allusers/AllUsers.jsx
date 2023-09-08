import React, { useEffect, useState } from "react";
import { FcInvite } from "react-icons/fc";
import { MdDone } from "react-icons/md";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarExport,
} from "@mui/x-data-grid";

const AllUsers = ({ selectedTask }) => {
  const [userArray, setUserArray] = useState([]);

  useEffect(() => {
    const existingUserData = JSON.parse(localStorage.getItem("users")) || [];
    setUserArray(existingUserData);
  }, []);

  const handleInvite = (userEmail) => {
    const updatedUserArray = userArray.map((user) => {
      if (user.email === userEmail) {
        if (!user.projectInvitations) {
          user.projectInvitations = [];
        }
        const isInvited = user.projectInvitations.some(
          (invitation) => invitation.projectId === selectedTask.id
        );
        if (!isInvited) {
          const projectInvitation = {
            projectId: selectedTask.id,
            projectTitle: selectedTask.title,
            projectDescription: selectedTask.description,
            dueDate: selectedTask.dueDate,
            priority: selectedTask.priority,
            AssignedTo: selectedTask.team,
          };
          user.projectInvitations.push(projectInvitation);
        }
      }
      return user;
    });

    localStorage.setItem("users", JSON.stringify(updatedUserArray));

    setUserArray(updatedUserArray);
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      headerClassName: "text-[16px]",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      headerClassName: "text-[16px]",
      flex: 1,
    },
    {
      field: "invite",
      headerName: "Send Invitation",
      headerClassName: "text-[16px]",
      flex: 0.5,
      renderCell: (params) =>
        params.row.projectInvitations &&
        params.row.projectInvitations.some(
          (invitation) => invitation.projectId === selectedTask.id
        ) ? (
          <span>Invitation sent successfully!</span>
        ) : (
          <button onClick={() => handleInvite(params.row.email)}>
            {params.row.invitation ? (
              <MdDone size={20} />
            ) : (
              <FcInvite size={20} />
            )}
          </button>
        ),
    },
  ];

  return (
    <div className="w-full">
      <h1 className="text-[40px] my-3">All Users</h1>

      <DataGrid
        rows={userArray.map((user, index) => ({ ...user, id: index }))}
        columns={columns}
        pageSize={5}
      >
        <GridToolbarContainer>
          <GridToolbarColumnsButton />
          <GridToolbarExport />
        </GridToolbarContainer>
      </DataGrid>
    </div>
  );
};

export default AllUsers;
