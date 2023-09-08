import React, { useState, useEffect } from "react";
import {
  AiOutlineCamera,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";

const ProfileContent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");

    if (loggedInUserEmail) {
      const existingUserData = JSON.parse(localStorage.getItem("users")) || [];

      const loggedInUser = existingUserData.find(
        (userData) => userData.email === loggedInUserEmail
      );

      if (loggedInUser) {
        const { name, email, bio, password, avatar } = loggedInUser;
        setName(name);
        setEmail(email);
        setBio(bio);
        setPassword(password);
        setAvatar(avatar);
      }
    }
  }, []);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageDataUrl = event.target.result;
        setAvatar(imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingUserData = JSON.parse(localStorage.getItem("users")) || [];

    const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");

    if (loggedInUserEmail) {
      const userIndex = existingUserData.findIndex(
        (userData) => userData.email === loggedInUserEmail
      );

      if (userIndex !== -1) {
        existingUserData[userIndex] = {
          ...existingUserData[userIndex],
          name,
          bio,
          password,
          avatar,
        };

        localStorage.setItem("users", JSON.stringify(existingUserData));
        alert("Profile updated successfully!");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col w-full mx-12">
        <div className="flex justify-center w-full">
          <div className="relative">
            {avatar ? (
              <img
                src={avatar}
                alt="avatar"
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
              />
            ) : (
              <RxAvatar className="w-8 h-8" />
            )}
            <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImage}
              />
              <label htmlFor="image">
                <AiOutlineCamera />
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-center text-[20px] my-3">{bio}</div>

        <br />
        <br />
        <div className="w-full px-5">
          <form onSubmit={handleSubmit} aria-required={true}>
            <div className="block w-full pb-3 800px:flex">
              <div className=" w-[100%] 800px:w-[50%]">
                <label className="block pb-2">Full Name</label>
                <input
                  type="text"
                  className={`border p-1 rounded-[5px] !w-[95%] mb-4 800px:mb-0`}
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className=" w-[100%] 800px:w-[50%]">
                <label className="block pb-2">Email Address</label>
                <input
                  type="text"
                  className={`border p-1 rounded-[5px] !w-[95%] mb-1 800px:mb-0`}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="block w-full pb-3 ">
              <div className="w-[100%] ">
                <label className="block pb-2">Bio</label>
                <textarea
                  className={`border p-1 rounded-[5px] !w-[97.5%] mb-4 800px:mb-0 resize-none`}
                  required
                  placeholder="Add your bio...."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>

              <div className="w-[100%] 800px:w-[50%]">
                <label className="block pb-2">Enter your password</label>
                <div className="relative">
                  <input
                    type={visible ? "text" : "password"}
                    className={`border p-1 rounded-[5px] !w-[95%] pr-10 mb-4 800px:mb-0`}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {visible ? (
                    <AiOutlineEye
                      className="absolute cursor-pointer right-10 top-2"
                      size={20}
                      onClick={() => setVisible(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute cursor-pointer right-10 top-2"
                      size={20}
                      onClick={() => setVisible(true)}
                    />
                  )}
                </div>
              </div>
            </div>
            <input
              className={`w-[50%] h-[40px]  hover:bg-[#56D2C4] border border-[#3a24db] text-center text-[#3a24db] hover:text-[#ffffff] rounded-[3px] mt-8 cursor-pointer`}
              required
              value="Update"
              type="submit"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileContent;
