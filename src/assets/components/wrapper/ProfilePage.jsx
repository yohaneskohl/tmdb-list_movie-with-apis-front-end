import React, { useEffect, useState } from "react";
import ProfileMobile from "../Mobile/ProfileMobile";
import Profile from "../Profile";


const ProfilePage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Anggap <=768px adalah mobile
    };

    handleResize(); // cek saat pertama kali render
    window.addEventListener("resize", handleResize); // cek saat window diubah ukurannya

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <ProfileMobile /> : <Profile />;
};

export default ProfilePage;
