import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../images/logo.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const Sidebar = ({ selected, setSelected }) => {

  const [expanded, setExpaned] = useState(true)

  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-60%'
    }
  }

  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear user authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    // Redirect to login page
    navigate("/login");
  };
  console.log(window.innerWidth)
  return (
    <>
      <div className="bars" style={expanded?{left: '60%'}:{left: '5%'}} onClick={()=>setExpaned(!expanded)}>
        <UilBars />
      </div>
    <motion.div className='sidebar'
    variants={sidebarVariants}
    animate={window.innerWidth<=768?`${expanded}`:''}
    >
      {/* logo */}
      <div className="logo">
        <img src={Logo} alt="logo" />
        <span>
          Gr<span>ee</span>ny
        </span>
      </div>

      <div className="menu">
        {SidebarData.map((item, index) => {
          return (
            <div
              className={selected === index ? "menuItem active" : "menuItem"}
              key={index}
              onClick={() => setSelected(index)}
            >
              <item.icon />
              <span>{item.heading}</span>
            </div>
          );
        })}
        {/* signoutIcon */}
        <div className="menuItem" onClick={handleSignOut}>
          <UilSignOutAlt />
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default Sidebar;
