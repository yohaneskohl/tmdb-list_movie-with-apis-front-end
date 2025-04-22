import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import {
  getUserProfileAction,
  updateUserProfileAction,
} from "../../../redux/action/authActions";

const ProfileMobile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token, isLoading } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      address: "",
      occupation: "",
    },
  });

  useEffect(() => {
    if (!token) navigate("/");
  }, [token, navigate]);

  useEffect(() => {
    if (token) dispatch(getUserProfileAction());
  }, [dispatch, token]);

  useEffect(() => {
    if (user) {
      setValue("name", user.name || "");
      setValue("email", user.email || "");
      setValue("bio", user.bio || "");
      setValue("address", user.address || "");
      setValue("occupation", user.occupation || "");
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("bio", data.bio);
      formData.append("address", data.address);
      formData.append("occupation", data.occupation);
      if (selectedAvatar) {
        formData.append("avatar", selectedAvatar);
      }

      await dispatch(updateUserProfileAction(formData));
      await dispatch(getUserProfileAction());
      setIsEditing(false);
      reset(data);
      setSelectedAvatar(null);
    } catch (error) {
      console.error("Update profile failed:", error);
    }
  };

  if (!token || isLoading || !user) {
    return (
      <div className="flex items-center justify-center h-screen text-white text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans pt-20 pb-10 px-4">
      <div className="bg-[#1a1a1a] p-5 rounded-xl shadow-lg border border-[#292929]">
        <div className="flex-col gap-3 flex justify-center items-center">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#E50914] shadow-md">
            {user?.avatar_url ? (
              <img
                src={user.avatar_url}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl font-bold uppercase text-gray-400">
                {user?.name?.[0] || "?"}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-gray-400 text-sm">{user.email}</p>
          </div>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 bg-[#E50914] hover:bg-red-600 rounded-full text-white shadow-sm transition self-center"
            >
              <FaEdit size={16} />
            </button>
          )}
        </div>

        <div className="mt-6 bg-[#1e1e1e] p-4 rounded-lg space-y-5 border border-[#333]">
          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-sm">
              {[
                { label: "Name", name: "name", type: "text" },
                { label: "Email", name: "email", type: "email" },
                { label: "Bio", name: "bio", type: "text" },
                { label: "Address", name: "address", type: "text" },
                { label: "Occupation", name: "occupation", type: "text" },
              ].map((field, idx) => (
                <div key={idx} className="relative">
                  <input
                    type={field.type}
                    {...register(field.name)}
                    placeholder=" "
                    className="floating-input"
                  />
                  <label className="floating-label">{field.label}</label>
                </div>
              ))}

              <div>
                <label className="block text-xs text-gray-400 mb-1">Avatar</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedAvatar(e.target.files[0])}
                  className="text-xs text-gray-300"
                />
              </div>

              <div className="flex justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="w-full py-2 rounded bg-gray-700 hover:bg-gray-600 text-white font-semibold text-sm transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full py-2 rounded bg-[#E50914] hover:bg-red-600 text-white font-semibold text-sm transition"
                >
                  Save
                </button>
              </div>
            </form>
          ) : (
            <>
              {[
                { label: "Name", value: user.name },
                {
                  label: "Email",
                  value: user.email
                    ? user.email.replace(/(.{2}).+(@.+)/, "$1******$2")
                    : "No email provided",
                },
                { label: "Bio", value: user.bio || "No bio available" },
                { label: "Address", value: user.address || "No address available" },
                {
                  label: "Occupation",
                  value: user.occupation || "No occupation provided",
                },
              ].map((item, index) => (
                <div key={index} className="text-left border-b border-[#2f2f2f] pb-1">
                  <p className="text-gray-400 text-xs">{item.label}</p>
                  <p className="text-white text-sm">{item.value}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileMobile;
