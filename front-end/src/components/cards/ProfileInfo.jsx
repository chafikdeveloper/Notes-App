import React, { useState, useEffect } from "react";
import { getInitials } from "../../utils/helper";
import axios from "../../utils/axios";

const ProfileInfo = ({ onLogout }) => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const response = await axios.get("/auth/protect");
  
      if (response.data.status === "success") {
        setUser(response.data.user.name);
      }
    } catch (error) {
      console.log("Unexpected error happened. Please try again")
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
        {getInitials(user)}
      </div>
      <div>
        <p className="text-sm font-medium">{user}</p>
        <button className="text-sm text-slate-700 underline" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
