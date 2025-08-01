import { useEffect, useState } from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ClipLoader } from "react-spinners";

const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AuthContext);

  const [previewImg, setPreviewImg] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [name, setName] = useState(authUser.fullName);
  const [bio, setBio] = useState(authUser.bio);
  const [isloading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setPreviewImg(authUser.profilePic);
  }, [authUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImg) {
      await updateProfile({
        fullName: name,
        bio,
      });
      navigate("/");
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedImg);
    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({
        profilePic: base64Image,
        fullName: name,
        bio,
      });
      navigate("/");
    };
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-5/6 max-w-3xl text-gray-300 border-1 border-violet-800 bg-black/10 px-4 py-2 transition-all duration-300 flex items-center justify-between max-sm:flex-col-reverse rounded-lg">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 p-10 flex-1"
        >
          <h3 className="text-lg">Profile details</h3>
          <label
            htmlFor="avatar"
            className="flex items-center gap-3 cursor-pointer"
          >
            <input
              onChange={(e) => setSelectedImg(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpeg"
              hidden
            />
            <img
              src={
                selectedImg
                  ? URL.createObjectURL(selectedImg)
                  : previewImg || assets.avatar_icon
              }
              alt=""
              className={`w-12 h-12 ${
                (previewImg || selectedImg) && "rounded-full object-cover"
              }`}
            />
            <span className="hover:text-violet-400 hover:underline">
              upload profile image
            </span>
          </label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
            placeholder="Your name"
            className="p-2 border border-violet-500 rounded-md 
          focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            placeholder="Write profile bio"
            className="p-2 border border-violet-500 rounded-md 
          focus:outline-none focus:ring-2 focus:ring-violet-500"
            rows={4}
          ></textarea>
          <button
            type="submit"
            onClick={() => setIsLoading(true)}
            className="flex items-center justify-center gap-2 py-2 rounded-full text-lg bg-violet-800 hover:scale-105 transition-all duration-300 text-white cursor-pointer"
          >
            <ClipLoader loading={isloading} size={16} color="#ffffff" />
            Save
          </button>
        </form>
        <img
          className="max-w-46 aspect-square mx-16 max-sm:mt-10 rounded-full object-cover"
          src={
            selectedImg
              ? URL.createObjectURL(selectedImg)
              : previewImg || assets.avatar_icon
          }
          alt="profile preview"
        />
      </div>
    </div>
  );
};
export default ProfilePage;
