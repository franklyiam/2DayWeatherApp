export interface WeatherForecast {
  coord: {
    lon: number; // Longitude (float)
    lat: number; // Latitude (float)
  };
  weather: [
    {
      id: number; // Weather condition ID (integer)
      main: string; // Main weather description (string)
      description: string; // Detailed weather description (string)
      icon: string; // Weather icon code (string)
    }
  ];
  base: string; // Data source for weather information (string)
  main: {
    temp: number; // Temperature in Kelvin (float)
    feels_like: number; // Temperature feels-like in Kelvin (float)
    temp_min: number; // Minimum temperature in Kelvin (float)
    temp_max: number; // Maximum temperature in Kelvin (float)
    pressure: number; // Atmospheric pressure in hPa (integer)
    humidity: number; // Humidity percentage (integer)
    sea_level: number; // Sea-level atmospheric pressure in hPa (integer)
    grnd_level: number; // Ground-level atmospheric pressure in hPa (integer)
  };
  visibility: number; // Visibility in meters (integer)
  wind: {
    speed: number; // Wind speed in meters per second (float)
    deg: number; // Wind direction in degrees (integer)
    gust: number; // Wind gust speed in meters per second (float)
  };
  rain: {
    oneHour: number; // Rainfall in the last 1 hour in millimeters (float)
  };
  clouds: {
    all: number; // Cloudiness percentage (integer)
  };
  dt: number; // Time of data calculation in Unix timestamp (integer)
  sys: {
    type: number; // System type (integer)
    id: number; // System ID (integer)
    country: string; // Country code (string)
    sunrise: number; // Sunrise time in Unix timestamp (integer)
    sunset: number; // Sunset time in Unix timestamp (integer)
  };
  timezone: number; // Timezone offset in seconds (integer)
  id: number; // City ID (integer)
  name: string; // City name (string)
  cod: number; // HTTP status code (integer)
}
