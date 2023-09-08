import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiTask } from "react-icons/bi";
import { MdExitToApp, MdNotificationsActive } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { ImHome } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { RiProjectorFill } from "react-icons/ri";
import { useUser } from "../../UserContext/UserContext";

const SidebarItems = [
  {
    id: 1,
    title: "Home",
    path: "/",
    icon: ImHome,
  },
  {
    id: 2,
    title: "Profile",
    path: "/profile",
    icon: CgProfile,
  },
  {
    id: 3,
    title: "Create project",
    path: "/create-project",
    icon: BiTask,
  },
  {
    id: 4,
    title: "My Projects",
    path: "/my-projects",
    icon: RiProjectorFill,
  },
  {
    id: 5,
    title: "All Projects Summary",
    path: "/projects",
    icon: FaTasks,
  },
  {
    id: 6,
    title: "Invitations",
    path: "/invitations",
    icon: MdNotificationsActive,
  },
];

const Sidebar = ({ active }) => {
  const navigate = useNavigate();
  const { logoutUser } = useUser();

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("loggedInUserEmail");

    logoutUser();

    navigate("/login");
  };

  return (
    <>
      <div className="w-full h-[100vh] bg-black shadow-sm  sticky top-0 left-0 z-10 800px:pl-3 800px:pt-4">
        {SidebarItems.map((item) => (
          <div className="flex items-center w-full p-4" key={item.id}>
            <Link to={item.path} className="flex items-center w-full">
              {React.createElement(item.icon, {
                size: 30,
                color: active === item.id ? "#b64050" : "#fff",
              })}
              <h5
                className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
                  active === item.id ? "text-[#f05167]" : "text-[#fff]"
                }`}
              >
                {item.title}
              </h5>
            </Link>
          </div>
        ))}
        <div
          className="flex items-center w-full p-4 cursor-pointer"
          onClick={handleLogout}
        >
          <MdExitToApp size={30} color="#fff" />{" "}
          {/* You can use an appropriate logout icon */}
          <h5 className="hidden 800px:block pl-2 text-[18px] font-[400] text-[#fff]">
            Logout
          </h5>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
