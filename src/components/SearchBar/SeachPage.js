import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { list } from "./assets/cards-list";
import Card from "../Cards/card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SearchPage = () => {
  const [filteredCards, setFilteredCards] = useState(list);

  const handleSearch = (region, startDate, endDate, guestCounts) => {
    const start = startDate ? new Date(startDate).getTime() : null;
    const end = endDate ? new Date(endDate).getTime() : null;

    const filtered = list.filter((card) => {
      const cardDate = new Date(card.date).getTime();
      const inDateRange = (!start || cardDate >= start) && (!end || cardDate <= end);
      const inRegion = region ? card.region === region : true;
      const enoughGuests =
        card.maxGuests >= guestCounts.adults + guestCounts.children + guestCounts.infants;

      return inDateRange && inRegion && enoughGuests;
    });

    setFilteredCards(filtered);
    toast.success("Search results updated!");
  };

  return (
    <div>
      <ToastContainer />
      <SearchBar onSearch={handleSearch} />
      <div className="card-list">
        {filteredCards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
