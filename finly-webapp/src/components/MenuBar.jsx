import React, { useEffect, useState, useRef, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { LogOut, Menu, Settings, User, X } from "lucide-react";
import { assets } from "../assets/assets";
import SideBar from "./SideBar";
import { useNavigate } from "react-router-dom";

const MenuBar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropDownRef = useRef(null);
  const { user, clearUser } = useContext(AppContext);

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const navigator = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setShowDropdown(false);
    clearUser();
    window.location.href = "/login";
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className="flex items-center justify-between gap-5 bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-4 sm:px-7 sticky top-0 z-30">
      {/* left side - menu button and title*/}
      <div className="flex items-center gap-5">
        <button
          className="block lg:hidden text-black hover:bg-gray p-1 rounded transition-colors"
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? (
            <X className="text-2xl" />
          ) : (
            <Menu className="text-2xl" />
          )}
        </button>
        <div className="flex item-center gap-2">
          <img src={assets.finlynobg} alt="Logo" className="h-8 w-08" />
        </div>
      </div>

      {/* right side - avatar photo  */}
      <div className="relative" ref={dropDownRef}>
        <button
          onClick={handleDropdown}
          className="flex  item-center justify-center px-5 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200 focus:outline-none text-black focus:ring-2 focus:ring-emerald-800 focus:ring-offset-2"
        >
          <User className="m-auto text-emerald-500 mr-4  rounded-" size={30} />
          <p className="flex items-center justify-center">
            {(user.fullName || "").split(" ")[0]}
          </p>
        </button>
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-xl z-50">
            <div className="px-4 py-3 border-gray-100">
              <div className="flex item-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                  <User className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {user.fullName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
            </div>
            <div className="py-1">
              <button
                onClick={() => navigator("/settings")}
                className="flex item-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
              >
                <Settings className="w-4 h-4 text-gray-500" />
                <span>Settings</span>
              </button>
            </div>
            <div className="py-1">
              <button
                onClick={handleLogout}
                className="flex item-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-gray-500" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
      {/* mobile view  */}
      {openSideMenu && (
        <div className="fixed left-0 right-0 bg-white border-b border-gray-200 lg:hidden z-20 top-[73px]">
          <SideBar activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default MenuBar;
