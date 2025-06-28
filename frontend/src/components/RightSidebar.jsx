import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import assets from "../assets/assets";
import { useContext, useEffect, useState } from "react";

const RightSidebar = () => {
  const { selectedUser, messages } = useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);
  const [msgImages, setMsgImages] = useState([]);

  // get all the images from the messages and set them to state
  useEffect(() => {
    setMsgImages(messages.filter((msg) => msg.image).map((msg) => msg.image));
  }, [messages]);

  return (
    selectedUser && (
      <div
        className={`bg-[#8185B2]/10 text-white w-full relative overflow-y-scroll
          ${selectedUser ? "max-md:hidden" : ""}`}
      >
        <div className="pt-10 flex flex-col items-center gap-2 text-xs font-light mx-auto">
          <img
            src={selectedUser?.profilePic || assets.avatar_icon}
            alt=""
            className="w-20 aspect-[1/1] rounded-full"
          />
          <h1 className="px-10 text-xl font-medium mx-auto flex items-center gap-2">
            {onlineUsers.includes(selectedUser._id) && (
              <span className="relative flex w-2 h-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            )}
            {selectedUser.fullName}
          </h1>
          <p className="px-10 mx-auto">{selectedUser.bio}</p>
        </div>

        <hr className="my-4 text-gray-500" />

        <div className="px-5 text-xs">
          <p>Media</p>
          <div className="mt-2 max-h-[280px] overflow-y-scroll grid grid-cols-3 gap-2 opactity-80">
            {msgImages.map((url, index) => (
              <div
                key={index}
                onClick={() => window.open(url)}
                className="cursor-pointer rounded"
              >
                <img
                  src={url}
                  alt=""
                  className="h-full rounded-md object-cover object-center"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={logout}
          className="absolute bottom-5 left-1/2 transform -translate-x-1/2 
        bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none 
        text-sm font-light py-2 px-20 rounded-full cursor-pointer"
        >
          Logout
        </button>
      </div>
    )
  );
};
export default RightSidebar;
