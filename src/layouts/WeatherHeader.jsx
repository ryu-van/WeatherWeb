import React, { useEffect, useRef, useState } from "react";
import menuIcon from "../assets/icons8-menu.svg";
import locationIcon from "../assets/icons8-location-48.png";
import closeIcon from "../assets/icons8-close-50.png";
import searchIcon from "../assets/icons8-search.svg";
import { searchCities } from "../services/weatherApi";

const WeatherHeader = ({
  openSettings,
  setOpenSettings,
  onSearch,
  onLocationSearch,
  loading,
}) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchRef = useRef();

  useEffect(()=>{
    const handleClickOutSide = (event)=>{
      if(searchRef.current && !searchRef.current.contains(event.target)){
        setShowSuggestion(false);
      }


    };
    document.addEventListener("mousedown",handleClickOutSide);
    return ()=> document.removeEventListener("mousedown",handleClickOutSide);

  },[])

  useEffect(()=>{
    const searchTimeOut = setTimeout(async()=>{
      if(query.length>2){
        setSearchLoading(true);
        try{
          const result = await searchCities(query);
          setSuggestions(result);
          setShowSuggestion(true);
        }catch(err){
          console.log("searchFailed",err);
        }finally{
          setSearchLoading(false)
        }
      }
      else{
        setSuggestions([]);
        setShowSuggestion(false);
      }
    },300);
    return ()=> clearTimeout(searchTimeOut);
  },[query])
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery("");
      setShowSuggestion(false);
    }
  };
  const clearSearch = () => {
    setQuery("");
    setSuggestions([]);
    setShowSuggestion(false);
  };
  const handleSuggestionsClick = (city) => {
    const cityName =
      city && city.name
        ? `${city.name}${city.state ? "," + city.state : ""}`
        : "";
    onSearch(cityName);
    setQuery("");
    setShowSuggestion(false);
  };

  return (
    <header className="weather-header relative">
      <h4 className="weather-title">Ryu Weather</h4>
      <div ref={searchRef}>
        <form onSubmit={handleSubmit}>
          <div className="search-box">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
              placeholder="Search city..."
              disabled={loading}
              onFocus={() => setShowSuggestion(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit(e);
              }}
            />
            <button
              type="button"
              className="btn-location"
              aria-label="Use current location"
              onClick={onLocationSearch}
              disabled={loading}
            >
              <img src={locationIcon} alt="" className="locationIcon" />
            </button>
            {query && (
              <button
                type="button"
                className="btn-clear"
                aria-label="Clear search"
                onClick={clearSearch}
              >
                <img src={closeIcon} alt="" className="closeIcon" />
              </button>
            )}
            {showSuggestion && (suggestions.length > 0 || searchLoading) && (
              <div className="search-dropdown">
               {searchLoading ?  (<div className="search-loading">
                  <div className="spinner"></div>
                  <p>Search Cities.....</p>
                </div>) : (suggestions.map((city,index)=>{
                  return(
                    <button
                  className="search-item"
                  type="button"
                  key={`${city.name}-${city.country}-${city.index}`}
                  onClick={() => handleSuggestionsClick(city)}
                >
                  <div className="search-info">
                    <strong>{city.name}</strong>, {city.state && <span>,{city.state}</span>}
                  </div>
                  <div className="search-extra">{city.country}</div>
                  <img src={searchIcon} alt="search" className="search-icon" />
                </button>
                  )
                })
              )}
                
              </div>
            )}
          </div>
        </form>
      </div>
      <button
        className={`menu ${openSettings ? "is-open" : ""}`}
        aria-haspopup="dialog"
        aria-expanded={openSettings}
        onClick={() => setOpenSettings((v) => !v)}
      >
        <img src={menuIcon} className="menu-icon" alt="" aria-hidden="true" />
      </button>
    </header>
  );
};
export default WeatherHeader;
