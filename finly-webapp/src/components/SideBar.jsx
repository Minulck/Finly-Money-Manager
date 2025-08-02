import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { User } from "lucide-react";
import { SIDE_BAR_DATA } from "../assets/assets";
import { Link } from "react-router-dom";

const SideBar = () => {
  const { user } = useContext(AppContext);


  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-gray-200/50 p-5 sticky top-[61px] z-20">
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        {user?.profileImage ? (
          <img
            src={user.profileImage || ""}
            alt="Profile"
            className="w-30 h-30 rounded-full object-cover object-center bg-slate-400"
          />
        ) : (
          <User className="w-20 h-20 text-xl" />
        )}
        <h5 className="text-gray-950 font-medium capitalize leading-6 ">
          {user.fullName || "Unknown User"}
        </h5>
      </div>

      {SIDE_BAR_DATA.map((item, index) => (
        <Link to={item.path} key={item.id} >
          <button
            key={`menu_${index}`}
            className="w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg cursor-pointer"
          >
            <item.icon className="text-2xl" />
            {item.label}
          </button>
        </Link>
      ))}
    </div>
  );
};

export default SideBar;
