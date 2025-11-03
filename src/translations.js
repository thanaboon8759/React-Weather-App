export const translations = {
  en: {
    appTitle: 'Weather App',
    searchPlaceholder: 'Enter city name (e.g., London, Tokyo, New York)',
    searchButton: '🔍 Search',
    useLocation: '📍 Use Current Location',
    recentSearches: 'Recent Searches:',
    loading: 'Loading weather data...',
    feelsLike: 'Feels Like',
    humidity: 'Humidity',
    windSpeed: 'Wind Speed',
    pressure: 'Pressure',
    minMax: 'Min/Max',
    visibility: 'Visibility',
    sunrise: '🌅 Sunrise',
    sunset: '🌇 Sunset',
    currentLocation: '📍 Current Location',
    
    // Tooltips
    tooltips: {
      feelsLike: 'The temperature it feels like accounting for wind and humidity',
      humidity: 'Amount of moisture in the air (higher = more humid)',
      windSpeed: 'Speed of wind movement in meters per second',
      pressure: 'Atmospheric pressure in hectopascals',
      visibility: 'Maximum distance at which objects can be clearly seen',
      minMax: 'Minimum and maximum temperatures expected today'
    },
    
    // Empty states
    welcomeTitle: 'Welcome to Weather App',
    welcomeMessage: 'Search for a city to see the weather forecast',
    welcomeTip: 'Try searching for "London", "Tokyo", or use your current location!',
    noResultsTitle: 'No Results Found',
    noResultsMessage: "We couldn't find weather data for that location",
    noResultsTip: 'Please check the spelling or try a different city name',
    errorTitle: 'Something Went Wrong',
    errorMessage: 'Unable to fetch weather data at the moment',
    errorTip: 'Please try again or check your internet connection',
    
    // Popular cities
    popularCities: 'Popular Cities:'
  },
  
  th: {
    appTitle: 'แอปแสดงสภาพอากาศ',
    searchPlaceholder: 'ป้อนชื่อเมือง (เช่น กรุงเทพฯ, เชียงใหม่, ภูเก็ต)',
    searchButton: '🔍 ค้นหา',
    useLocation: '📍 ใช้ตำแหน่งปัจจุบัน',
    recentSearches: 'การค้นหาล่าสุด:',
    loading: 'กำลังโหลดข้อมูลสภาพอากาศ...',
    feelsLike: 'รู้สึกเหมือน',
    humidity: 'ความชื้น',
    windSpeed: 'ความเร็วลม',
    pressure: 'ความกดอากาศ',
    minMax: 'ต่ำสุด/สูงสุด',
    visibility: 'ทัศนวิสัย',
    sunrise: '🌅 พระอาทิตย์ขึ้น',
    sunset: '🌇 พระอาทิตย์ตก',
    currentLocation: '📍 ตำแหน่งปัจจุบัน',
    
    tooltips: {
      feelsLike: 'อุณหภูมิที่รู้สึกได้โดยคำนึงถึงลมและความชื้น',
      humidity: 'ปริมาณความชื้นในอากาศ (สูงขึ้น = ชื้นมากขึ้น)',
      windSpeed: 'ความเร็วของลมเป็นเมตรต่อวินาที',
      pressure: 'ความกดอากาศเป็นเฮกโตปาสคาล',
      visibility: 'ระยะทางสูงสุดที่สามารถมองเห็นวัตถุได้อย่างชัดเจน',
      minMax: 'อุณหภูมิต่ำสุดและสูงสุดที่คาดว่าจะเป็นในวันนี้'
    },
    
    welcomeTitle: 'ยินดีต้อนรับสู่แอปพยากรณ์อากาศ',
    welcomeMessage: 'ค้นหาเมืองเพื่อดูการพยากรณ์อากาศ',
    welcomeTip: 'ลองค้นหา "กรุงเทพฯ", "เชียงใหม่", หรือใช้ตำแหน่งปัจจุบันของคุณ!',
    noResultsTitle: 'ไม่พบผลลัพธ์',
    noResultsMessage: 'เราไม่พบข้อมูลสภาพอากาศสำหรับตำแหน่งนั้น',
    noResultsTip: 'โปรดตรวจสอบการสะกดหรือลองชื่อเมืองอื่น',
    errorTitle: 'มีบางอย่างผิดพลาด',
    errorMessage: 'ไม่สามารถดึงข้อมูลสภาพอากาศได้ในขณะนี้',
    errorTip: 'โปรดลองอีกครั้งหรือตรวจสอบการเชื่อมต่ออินเทอร์เน็ตของคุณ',
    
    popularCities: 'เมืองยอดนิยม:'
  }
};

export const popularCities = {
  en: ['London', 'New York', 'Tokyo', 'Paris', 'Sydney', 'Dubai', 'Singapore', 'Los Angeles', 'Berlin', 'Moscow', 'Rome', 'Madrid'],
  th: ['กรุงเทพฯ', 'เชียงใหม่', 'ภูเก็ต', 'พัทยา', 'หัวหิน', 'เชียงราย', 'นครราชสีมา', 'ขอนแก่น', 'อุดรธานี', 'สงขลา']
};
