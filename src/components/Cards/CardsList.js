import React, { useState } from "react";
import Card from "./Cards/Card"; // Assuming Card component is in Card.js
import { list } from "./cards-list"; // Assuming list is defined in cards-list.js

const CardsList = () => {
  const [filteredCards, setFilteredCards] = useState(list);

  const handleSearch = (searchParams) => {
    const { region, startDate, endDate, guests } = searchParams;

    const filtered = list.filter((card) => {
      const isInDateRange =
        (!startDate || new Date(card.date) >= startDate) &&
        (!endDate || new Date(card.date) <= endDate);
      const matchesRegion = !region || card.region.toLowerCase().includes(region.toLowerCase());
      const matchesGuests =
        card.guests.adults >= guests.adults &&
        card.guests.children >= guests.children &&
        card.guests.infants >= guests.infants &&
        card.guests.pets >= guests.pets;

      return isInDateRange && matchesRegion && matchesGuests;
    });

    setFilteredCards(filtered);
  };

  return (
    <div>
      <CardFilters onSearch={handleSearch} />
      {filteredCards.map((card, index) => (
        <Card key={index} card={card} />
      ))}
    </div>
  );
};

const CardFilters = ({ onSearch }) => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [region, setRegion] = useState("");
  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const handleSearchClick = () => {
    onSearch({
      region,
      startDate: checkInDate,
      endDate: checkOutDate,
      guests,
    });
  };

  return (
    <div>
      <input
        type="date"
        placeholder="Check-in"
        value={checkInDate}
        onChange={(e) => setCheckInDate(e.target.value)}
      />
      <input
        type="date"
        placeholder="Check-out"
        value={checkOutDate}
        onChange={(e) => setCheckOutDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Region"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
      />
      <input
        type="number"
        placeholder="Guests"
        value={guests.adults}
        onChange={(e) =>
          setGuests({ ...guests, adults: parseInt(e.target.value) || 0 })
        }
      />
      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
};

export default CardsList;
