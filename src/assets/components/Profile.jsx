import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import {
  getUserProfileAction,
  updateUserProfileAction,
} from "../../redux/action/authActions";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, token, isLoading } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);

  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      address: "",
      occupation: "",
    },
  });

  // Check token and navigate to login if missing
  useEffect(() => {
    if (!token) {
      navigate("/"); // Redirect to login if token is missing
    }
  }, [token, navigate]);

  // Fetch user profile only if not already fetched
  useEffect(() => {
    if (token) {
      dispatch(getUserProfileAction());
    }
  }, [dispatch, token]);
  

  // Set form values when user data is available
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
      await dispatch(updateUserProfileAction(data));
      setIsEditing(false);
      reset(data);
    } catch (error) {
      console.error("Update profile failed:", error);
    }
  };

  if (!token || isLoading || !user) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl border border-gray-700">
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-indigo-500 shadow-lg">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl font-bold uppercase text-gray-300">
                {user?.name?.[0] || "?"}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-gray-400">{user.email}</p>
          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="ml-auto p-3 bg-indigo-600 rounded-full text-white hover:bg-indigo-500 transition transform hover:scale-105"
          >
            <FaEdit size={20} />
          </button>
        </div>

        <div className="mt-6 bg-white/10 p-5 rounded-lg space-y-4 border border-gray-600">
          {[ 
            { label: "Name", value: user.name },
            { label: "Email", value: user.email ? user.email.replace(/(.{2}).+(@.+)/, "$1******$2") : "No email available" },
            { label: "Bio", value: user.bio || "No bio available" },
            { label: "Address", value: user.address || "No address available" },
            { label: "Occupation", value: user.occupation || "No occupation provided" }
          ].map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b border-gray-600 pb-2"
            >
              <p className="text-gray-400 text-sm">{item.label}</p>
              <p className="text-white">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md transition-opacity duration-300">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-lg border border-gray-600 transition-transform duration-300 scale-95 hover:scale-100">
            <h3 className="text-lg font-semibold text-white mb-4 text-center">
              Edit Profile
            </h3>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <input
                type="text"
                {...register("name")}
                placeholder="Name"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-indigo-400 transition"
              />
              <input
                type="email"
                {...register("email")}
                placeholder="Email"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-indigo-400 transition"
              />
              <textarea
                {...register("bio")}
                placeholder="Bio"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-indigo-400 transition resize-none"
              />
              <input
                type="text"
                {...register("address")}
                placeholder="Address"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-indigo-400 transition"
              />
              <input
                type="text"
                {...register("occupation")}
                placeholder="Occupation"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-indigo-400 transition"
              />
              <div className="flex justify-between gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-3 bg-red-500 rounded-lg text-white hover:bg-red-400 transition transform hover:scale-105"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-3 bg-blue-500 rounded-lg text-white hover:bg-blue-400 transition transform hover:scale-105"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
