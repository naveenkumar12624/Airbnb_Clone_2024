import React, { useRef, useState, useEffect } from "react";
import { links } from "../../assets/images-links";
import "./Filter_styles.css";

function Filter({ selectedFilter, setSelectedFilter }) {
  const scrollContainerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const iconWidth = current.firstChild.offsetWidth;
      const scrollAmount = direction === "left" ? -iconWidth * 10 : iconWidth * 10;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      setScrollPosition(current.scrollLeft);
    }
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      current.addEventListener('scroll', checkScrollPosition);
      return () => current.removeEventListener('scroll', checkScrollPosition);
    }
  }, []);

  const isAtStart = scrollPosition === 0;
  const isAtEnd = scrollContainerRef.current && (scrollPosition + scrollContainerRef.current.offsetWidth >= scrollContainerRef.current.scrollWidth);

  return (
    <div className="filter-wrapper">
      {!isAtStart && (
        <button className="scroll-button left" onClick={() => handleScroll("left")}>
          &lt;
        </button>
      )}
      <div className="filter-div" ref={scrollContainerRef}>
        {links.map((item, i) => (
          <div
            key={i}
            className={`links-box ${i === selectedFilter && "selected-box"}`}
            onClick={() => {
              console.log("selecting key", i);
              setSelectedFilter(i);
            }}
          >
            <img src={item.imgSrc} className="links-img" alt={item.label} />
            <p className={`links-label ${i === selectedFilter && "selected-label"}`}>
              {item.label}
            </p>
          </div>
        ))}
      </div>
      {!isAtEnd && (
        <button className="scroll-button right" onClick={() => handleScroll("right")}>
          &gt;
        </button>
      )}
    </div>
  );
}

export default Filter;
