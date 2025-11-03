import { useState, useEffect, useRef } from 'react';

export default function Search({
  search, 
  setSearch, 
  handleSearch, 
  onKeyPress, 
  suggestions = [], 
  onSuggestionClick,
  placeholder,
  buttonText
}) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    if (search.length > 0 && suggestions.length > 0) {
      const filtered = suggestions.filter(city =>
        city.toLowerCase().startsWith(search.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [search, suggestions]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSuggestionSelect = (city) => {
    setSearch(city);
    setShowSuggestions(false);
    if (onSuggestionClick) {
      onSuggestionClick(city);
    }
  };

  return (
    <div className="search-wrapper" ref={searchRef}>
      <div className="search-engine">
        <input 
          type="text"
          className="city-search"
          placeholder={placeholder || "Enter city name (e.g., London, Tokyo, New York)"}
          name="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          onKeyPress={onKeyPress}
          onFocus={() => search.length > 0 && filteredSuggestions.length > 0 && setShowSuggestions(true)}
          autoComplete="off"
        />
        <button onClick={handleSearch}>{buttonText || '🔍 Search'}</button>
      </div>
      
      {showSuggestions && (
        <div className="suggestions-dropdown">
          {filteredSuggestions.map((city, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionSelect(city)}
            >
              📍 {city}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}