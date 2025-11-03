export default function WeatherSkeleton() {
  return (
    <div className="weather-data skeleton-loading">
      <div className="weather-header">
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text-small"></div>
      </div>

      <div className="main-weather">
        <div className="skeleton skeleton-temperature"></div>
        <div className="skeleton skeleton-icon"></div>
        <div className="skeleton skeleton-description"></div>
      </div>

      <div className="weather-details">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="detail-card skeleton-card">
            <div className="skeleton skeleton-detail-label"></div>
            <div className="skeleton skeleton-detail-value"></div>
          </div>
        ))}
      </div>

      <div className="sun-times">
        <div className="sun-time">
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
        </div>
        <div className="sun-time">
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
        </div>
      </div>
    </div>
  );
}
