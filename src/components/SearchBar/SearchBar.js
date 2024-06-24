import React, { useState } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import "./SearchBar.css";

function SearchBar({ isScrolled, onSearch }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [openCheckin, setOpenCheckin] = useState(false);
  const [openCheckout, setOpenCheckout] = useState(false);
  const [showRegions, setShowRegions] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [guestCounts, setGuestCounts] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });
  const [openGuests, setOpenGuests] = useState(false);

  const regions = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia",
    "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium",
    "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
    "Burkina Faso", "Burundi", "Côte d'Ivoire", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic",
    "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba",
    "Cyprus", "Czechia (Czech Republic)", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica",
    "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia",
    "Eswatini (fmr. 'Swaziland')", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany",
    "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Holy See", "Honduras",
    "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan",
    "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho",
    "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives",
    "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco",
    "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (formerly Burma)", "Namibia", "Nauru", "Nepal",
    "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman",
    "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland",
    "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
    "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal",
    "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia",
    "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland",
    "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia",
    "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
    "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];

  const handleOpenModal = (modalType) => {
    if (modalType === "checkin") {
      setOpenCheckin(true);
      setStartDate(new Date());
    } else if (modalType === "checkout") {
      setOpenCheckout(true);
    } else if (modalType === "guests") {
      setOpenGuests(true);
    }
  };

  const handleCloseModal = (modalType) => {
    if (modalType === "checkin") {
      setOpenCheckin(false);
    } else if (modalType === "checkout") {
      setOpenCheckout(false);
    } else if (modalType === "guests") {
      setOpenGuests(false);
    }
  };

  const handleDateSelect = (ranges) => {
    const { startDate, endDate } = ranges.selection;

    if (!startDate || !endDate || moment(startDate).isBefore(endDate)) {
      setStartDate(startDate);
      setEndDate(endDate);
      handleCloseModal("checkin");
      handleCloseModal("checkout");
      toast.success("Dates selected successfully!");
    } else {
      toast.error("Invalid date selection. Check-out must be after check-in.");
    }
  };

  const handleGuestCountChange = (type, increment) => {
    setGuestCounts((prevCounts) => ({
      ...prevCounts,
      [type]: Math.max(0, prevCounts[type] + (increment ? 1 : -1)),
    }));
    toast.info(`Guest count for ${type} changed`);
  };

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    setShowRegions(false);
    toast.info(`Region selected: ${region}`);
  };

  const handleSearchClick = () => {
    onSearch(selectedRegion, startDate, endDate, guestCounts);
    toast.success("Search initiated!");
  };

  return (
    <div className={`search-bar ${isScrolled ? "scrolled" : ""}`}>
      <ToastContainer />
      <div
        className="search-bar-line"
        onMouseEnter={() => setShowRegions(true)}
        onMouseLeave={() => setShowRegions(false)}
      >
        <TextField
          className={`search-bar-text ${isScrolled ? "scrolled" : ""}`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={selectedRegion || (isScrolled ? "Anywhere" : "Where")}
          variant="standard" />
        {showRegions && (
          <div className="region-dropdown active">
            {regions
              .filter((region) => region.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((region) => (
                <div
                  key={region}
                  className="region-item"
                  onClick={() => handleRegionSelect(region)}
                >
                  {region}
                </div>
              ))}
          </div>
        )}
      </div>
      <div className="search-bar-line">
        <Button
          className={`search-bar-text ${isScrolled ? "scrolled" : ""}`}
          onClick={() => handleOpenModal("checkin")}
        >
          {startDate
            ? moment(startDate).format("MM/DD/YYYY")
            : isScrolled
              ? "Any Week"
              : "Check-in"}
        </Button>
      </div>
      <div className="search-bar-line">
        <Button
          className={`search-bar-text ${isScrolled ? "scrolled" : ""}`}
          onClick={() => handleOpenModal("checkout")}
        >
          {endDate
            ? moment(endDate).format("MM/DD/YYYY")
            : isScrolled
              ? "Add dates"
              : "Check-out"}
        </Button>
      </div>
      {!isScrolled && (
        <div className="search-bar-line">
          <Button
            className="search-bar-text"
            onClick={() => handleOpenModal("guests")}
          >Who

          </Button>
          <div className="search-bar-text2">{`${guestCounts.adults} Adults, ${guestCounts.children} Children,
                        ${guestCounts.infants} Infants, ${guestCounts.pets} Pets` || "Who"}</div>
        </div>
      )}
      <div className="search-icon-div" onClick={handleSearchClick}>
        <SearchRoundedIcon className="search-icon" />
      </div>
      <Modal open={openCheckin} onClose={() => handleCloseModal("checkin")}>
        <Box className="date-range-modal">
          <DateRangePicker
            onChange={(ranges) => handleDateSelect(ranges)}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={[{ startDate, endDate, key: "selection" }]}
            minDate={new Date()} />
          <Button onClick={() => handleCloseModal("checkin")}>Close</Button>
        </Box>
      </Modal>
      <Modal open={openCheckout} onClose={() => handleCloseModal("checkout")}>
        <Box className="date-range-modal">
          <DateRangePicker
            onChange={(ranges) => handleDateSelect(ranges)}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={3}
            ranges={[{ startDate, endDate, key: "selection" }]}
            minDate={startDate} />
          <Button onClick={() => handleCloseModal("checkout")}>Close</Button>
        </Box>
      </Modal>


      <Modal open={openGuests} onClose={() => handleCloseModal("guests")}>
        <Box className="guest-modal">
          <Typography variant="h6">Guests</Typography>
          {["adults", "children", "infants", "pets"].map((type) => (
            <div key={type} className="guest-control">
              <Typography>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Typography>
              <div className="guest-buttons">
                <Button onClick={() => handleGuestCountChange(type, false)}>
                  -
                </Button>
                <Typography>{guestCounts[type]}</Typography>
                <Button onClick={() => handleGuestCountChange(type, true)}>
                  +
                </Button>
              </div>
            </div>
          ))}
          <Button onClick={() => handleCloseModal("guests")}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default SearchBar;

