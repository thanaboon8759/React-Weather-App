import { useState, useEffect, useCallback } from "react";
import Search from "../search/index.jsx";
import WeatherSkeleton from "../skeleton/index.jsx";
import EmptyState from "../emptystate/index.jsx";
import Tooltip from "../tooltip/index.jsx";
import { translations, popularCities } from "../../translations.js";

export default function Weather() {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [recentSearches, setRecentSearches] = useState([]);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [language, setLanguage] = useState('en');
    const [initialLoad, setInitialLoad] = useState(true);

    const t = translations[language];

    // Load saved preferences from localStorage on mount
    useEffect(() => {
        const savedSearches = localStorage.getItem('recentSearches');
        const savedLanguage = localStorage.getItem('weatherLanguage');
        
        if (savedSearches) {
            setRecentSearches(JSON.parse(savedSearches));
        }
        if (savedLanguage) {
            setLanguage(savedLanguage);
        }
    }, []);

    // Save recent searches to localStorage whenever they change
    useEffect(() => {
        if (recentSearches.length > 0) {
            localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
        }
    }, [recentSearches]);

    // Save language preference
    useEffect(() => {
        localStorage.setItem('weatherLanguage', language);
    }, [language]);

    // Add city to recent searches
    const addToRecentSearches = useCallback((cityName) => {
        setRecentSearches(prev => {
            const filtered = prev.filter(city => city.toLowerCase() !== cityName.toLowerCase());
            const updated = [cityName, ...filtered].slice(0, 5);
            return updated;
        });
    }, []);
    
    const fetchWeatherData = useCallback(async (query) => {
        try {
            setLoading(true);
            setError(null);
            setCurrentLocation(null); // Clear current location badge when searching manually
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=1125fbaa01a0d96c7be3fe916e881236&units=metric`
            );
            
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('City not found. Please try again.');
                }
                throw new Error(`Failed to fetch weather data`);
            }
            
            const data = await response.json();
            setWeatherData(data);
            addToRecentSearches(data.name);
            setLoading(false);
            setInitialLoad(false);
        } catch (e) {
            setLoading(false);
            setError(e.message);
            setWeatherData(null);
            setInitialLoad(false);
            console.error("Error fetching weather data:", e);
        } 
    }, [addToRecentSearches]);

    const fetchWeatherByCoords = useCallback(async (lat, lon) => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=1125fbaa01a0d96c7be3fe916e881236&units=metric`
            );
            
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            
            const data = await response.json();
            setWeatherData(data);
            setCurrentLocation(data.name);
            setLoading(false);
            setInitialLoad(false);
        } catch (e) {
            setLoading(false);
            setError(e.message);
            setInitialLoad(false);
            console.error("Error fetching weather data:", e);
        }
    }, []);

    // Get user's current location
    const getCurrentLocation = useCallback(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return;
        }

        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
            },
            (err) => {
                setLoading(false);
                setError('Unable to retrieve your location');
                console.error(err);
            }
        );
    }, [fetchWeatherByCoords]);

    const handleSearch = useCallback(() => {
        if (search.trim() === "") {
            setError(t.errorMessage || 'Please enter a city name');
            return;
        }
        fetchWeatherData(search);
    }, [search, fetchWeatherData, t.errorMessage]);

    // Handle Enter key press
    const handleKeyPress = useCallback((e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }, [handleSearch]);

    // Load default city on mount
    useEffect(() => {
        const defaultCity = language === 'th' ? 'Bangkok' : 'London';
        fetchWeatherData(defaultCity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleRecentSearch = (city) => {
        setSearch(city);
        fetchWeatherData(city);
    };

    const handleSuggestionClick = (city) => {
        fetchWeatherData(city);
    };

    const changeLanguage = (lang) => {
        setLanguage(lang);
    };

    const getLocationTime = (timezone) => {
        // timezone is in seconds, convert to milliseconds
        const utcTime = new Date().getTime() + (new Date().getTimezoneOffset() * 60000);
        const locationTime = new Date(utcTime + (timezone * 1000));
        
        return locationTime.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true
        });
    };
    
  return (
    <div className="weather-container">
        <div className="header-section">
            <h1 className="app-title">{t.appTitle}</h1>
            
            <div className="language-selector">
                <button 
                    className={`lang-btn ${language === 'en' ? 'active' : ''}`}
                    onClick={() => changeLanguage('en')}
                >
                     EN
                </button>
                <button 
                    className={`lang-btn ${language === 'th' ? 'active' : ''}`}
                    onClick={() => changeLanguage('th')}
                >
                     TH
                </button>
            </div>
        </div>
        
        <Search 
            search={search}
            setSearch={setSearch}
            handleSearch={handleSearch}
            onKeyPress={handleKeyPress}
            suggestions={popularCities[language]}
            onSuggestionClick={handleSuggestionClick}
            placeholder={t.searchPlaceholder}
            buttonText={t.searchButton}
        />
        
        <button className="location-btn" onClick={getCurrentLocation}>
            {t.useLocation}
        </button>

        {recentSearches.length > 0 && (
            <div className="recent-searches">
                <p>{t.recentSearches}</p>
                <div className="recent-chips">
                    {recentSearches.map((city, index) => (
                        <button 
                            key={index} 
                            className="recent-chip"
                            onClick={() => handleRecentSearch(city)}
                        >
                            {city}
                        </button>
                    ))}
                </div>
            </div>
        )}

        {loading && <WeatherSkeleton />}
        
        {!loading && !weatherData && !error && initialLoad && (
            <EmptyState type="initial" language={language} />
        )}
        
        {error && !loading && (
            <EmptyState type="error" language={language} />
        )}
        
        {weatherData && !loading && !error && (
            <div className="weather-data">
                <div className="weather-header">
                    <h2>{weatherData.name}, {weatherData.sys.country}</h2>
                    {currentLocation && <span className="current-loc-badge">{t.currentLocation}</span>}
                    <p className="date">
                        {new Date().toLocaleDateString('en-EN', { 
                            weekday: 'long',
                            day: 'numeric', 
                            month: 'long',
                            year: 'numeric'
                        })}
                    </p>
                    <p className="time">🕒 {getLocationTime(weatherData.timezone)}</p>
                </div>

                <div className="main-weather">
                    <div className="temperature">
                        <span className="temp-value">{Math.round(weatherData.main.temp)}</span>
                        <span className="temp-unit">°C</span>
                    </div>
                    <div className="weather-icon">
                        <img 
                            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                            alt={weatherData.weather[0].description}
                        />
                    </div>
                    <p className="description">{weatherData.weather[0].description}</p>
                </div>

                <div className="weather-details">
                    <Tooltip text={t.tooltips.feelsLike}>
                        <div className="detail-card">
                            <span className="detail-label">{t.feelsLike} ℹ️</span>
                            <span className="detail-value">{Math.round(weatherData.main.feels_like)}°C</span>
                        </div>
                    </Tooltip>
                    
                    <Tooltip text={t.tooltips.humidity}>
                        <div className="detail-card">
                            <span className="detail-label">{t.humidity} ℹ️</span>
                            <span className="detail-value">{weatherData.main.humidity}%</span>
                        </div>
                    </Tooltip>
                    
                    <Tooltip text={t.tooltips.windSpeed}>
                        <div className="detail-card">
                            <span className="detail-label">{t.windSpeed} ℹ️</span>
                            <span className="detail-value">{weatherData.wind.speed} m/s</span>
                        </div>
                    </Tooltip>
                    
                    <Tooltip text={t.tooltips.pressure}>
                        <div className="detail-card">
                            <span className="detail-label">{t.pressure} ℹ️</span>
                            <span className="detail-value">{weatherData.main.pressure} hPa</span>
                        </div>
                    </Tooltip>
                    
                    <Tooltip text={t.tooltips.minMax}>
                        <div className="detail-card">
                            <span className="detail-label">{t.minMax} ℹ️</span>
                            <span className="detail-value">
                                {Math.round(weatherData.main.temp_min)}° / {Math.round(weatherData.main.temp_max)}°
                            </span>
                        </div>
                    </Tooltip>
                    
                    <Tooltip text={t.tooltips.visibility}>
                        <div className="detail-card">
                            <span className="detail-label">{t.visibility} ℹ️</span>
                            <span className="detail-value">{(weatherData.visibility / 1000).toFixed(1)} km</span>
                        </div>
                    </Tooltip>
                </div>

                <div className="sun-times">
                    <div className="sun-time">
                        <span>{t.sunrise}</span>
                        <span>{new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="sun-time">
                        <span>{t.sunset}</span>
                        <span>{new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
}