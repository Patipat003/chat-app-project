import { useEffect, useState } from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AuthContext);

  const [previewImg, setPreviewImg] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [name, setName] = useState(authUser.fullName);
  const [bio, setBio] = useState(authUser.bio);
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
    <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center backdrop-blur-2xl  bg-black/60">
      <div className="w-5/6 max-w-3xl bg-black/4 text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg">
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
            className="p-2 border border-gray-500 rounded-md 
          focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            placeholder="Write profile bio"
            className="p-2 border border-gray-500 rounded-md 
          focus:outline-none focus:ring-2 focus:ring-violet-500"
            rows={4}
          ></textarea>
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-400 to-violet-600
            text-white p-2 rounded-full text-lg cursor-pointer"
          >
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
