import React, { useState, useEffect } from "react";
import logo from "../../assets/logo/long-logo.png";
import "./header_styles.css";
import LanguageIcon from "@mui/icons-material/Language";
import ProfileMenu from "./ProfileMenu"; 
import MobileSearchBar from "../MobileSearchBar/MobileSearchBar_index";
import SimpleBottomNavigation from "./BottomNav";
import SearchBar from "../SearchBar/SearchBar"; // Import the new SearchBar component

function Header({ toggleSearch, onDateChange }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="first-row">
        <div className="column1">
          <img src={logo} alt="logo" className="navbar-logo" />
        </div>
        {!isScrolled && (
          <div className="column2">
            <div className="stays-experiences">
              <div className="tab active">Stay</div>
              <div className="tab">Experience</div>
            </div>
          </div>
        )}
        <div className="column3">
          <div className="profile-container">
            <div className="airbnb-your-home">Airbnb your home</div>
            <div className="airbnb-your-home">
              <LanguageIcon sx={{ fontSize: "1.3rem" }} />
            </div>
            <div className="profile-div">
              <ProfileMenu />
            </div>
          </div>
        </div>
      </div>
      <div className="second-row">
        <SearchBar
          isScrolled={isScrolled}
          toggleSearch={toggleSearch}
          onDateChange={onDateChange}
        />
      </div>
      {/* Remove the rendering of ProfileMenu from here */}
      <MobileSearchBar />
      <SimpleBottomNavigation />
    </div>
  );
}

export default Header;
