import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthProvider";

const Profile = () => {
  const { user, token, fetchProfile, updateProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ name: "", email: "", bio: "", avatar: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!token) navigate("/");
    if (user) setProfile({ name: user.name || "", email: user.email || "", bio: user.bio || "", avatar: user.avatar || "" });
  }, [user, token, navigate]);

  const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProfile = await updateProfile({ name: profile.name, email: profile.email, bio: profile.bio });
      await fetchProfile();
      setProfile({ ...updatedProfile, avatar: updatedProfile.avatar || profile.avatar });
      setIsEditing(false);
    } catch (error) {
      console.error("Update profile failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6">
      <div className="w-full max-w-2xl bg-gray-800 rounded-lg p-6 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-700 border-2 border-gray-500">
            {profile.avatar ? (
              <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl font-bold uppercase">
                {profile.name ? profile.name[0] : "?"}
              </div>
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{profile.name}</h2>
          </div>
          <button onClick={() => setIsEditing(true)} className="ml-auto px-4 py-2 bg-indigo-600 rounded text-white hover:bg-indigo-500">
            Edit User Profile
          </button>
        </div>
        <div className="mt-6 bg-gray-700 p-4 rounded-lg">
          <div className="flex justify-between items-center border-b border-gray-600 pb-3">
            <div>
              <p className="text-gray-400 text-sm">Display Name</p>
              <p className="text-white">{profile.name}</p>
            </div>
            <button onClick={() => setIsEditing(true)} className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-500">
              Edit
            </button>
          </div>
          <div className="flex justify-between items-center border-b border-gray-600 py-3">
            <div>
              <p className="text-gray-400 text-sm">Email</p>
              <p className="text-white">{profile.email.replace(/(.{2}).+(@.+)/, "$1******$2")}</p>
            </div>
            <button onClick={() => setIsEditing(true)} className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-500">
              Edit
            </button>
          </div>
          <div className="flex justify-between items-center pt-3">
            <div>
              <p className="text-gray-400 text-sm">Bio</p>
              <p className="text-white">{profile.bio || "No bio available"}</p>
            </div>
            <button onClick={() => setIsEditing(true)} className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-500">
              Edit
            </button>
          </div>
        </div>
      </div>
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Edit Profile</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input type="text" name="name" value={profile.name} onChange={handleChange} placeholder="Name" className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-white" />
              <input type="email" name="email" value={profile.email} onChange={handleChange} placeholder="Email" className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-white" />
              <textarea name="bio" value={profile.bio} onChange={handleChange} placeholder="Bio" className="w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-white"></textarea>
              <div className="flex justify-end gap-4">
                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 bg-red-600 rounded text-white hover:bg-red-500">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-500">
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