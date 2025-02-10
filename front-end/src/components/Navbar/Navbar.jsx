import React, { useState } from "react";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import ProfileInfo from "../cards/ProfileInfo";
import SearchBar from "../searchBar/SearchBar";
import axios from "../../utils/axios";

const Navbar = ({ onSearchNote, handleClearSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");

  const onLogout = async () => {
    try {
      await axios.post("/auth/logout", {}, { withCredentials: true });
      console.log("Logout successful, token removed");
      navigate("/login");
    } catch (error) {
      console.log("Logout failed:", error.response?.data || error.message);
    }
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };
  
  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Notes</h2>

      {location.pathname.startsWith("/dashboard") && (
        <>
          <SearchBar
            value={searchQuery}
            onChange={({ target }) => setSearchQuery(target.value)}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
          />

          <ProfileInfo onLogout={onLogout} />
        </>
      )}
    </div>
  );
};

export default Navbar;
