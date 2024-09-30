import React, { useState } from "react";
import axios from "axios";

const WeatherApp = () => {
  const API_KEY = "272530a913bf7147a4f752f19c8cdd6b";
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState("");

  const fetchWeather = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setCity("");
    } catch (error) {
      setError("City not found");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-500 to-red-500 p-4">
      <h1 className="text-4xl text-white mb-6 font-thin">Weather App</h1>

      <form
        onSubmit={fetchWeather}
        className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6"
      >
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="px-4 py-2 border border-gray-300 rounded-md shadow focus:outline-none focus:ring focus:ring-blue-300 w-64 md:w-80"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 shadow-xl border-none text-white rounded-md hover:bg-blue-700 transition duration-200 ease-in-out"
        >
          Search
        </button>
      </form>

      {error && (
        <p className="text-yellow-500 text-xl font-semibold mb-4">{error}</p>
      )}

      {weather.main && (
        <div className="bg-white p-6 rounded-xl shadow-lg w-80 md:w-96 text-left">
          <h2 className="text-2xl font-bold mb-4">{weather.name}</h2>
          <p className="text-lg font-semibold capitalize">
            {weather.weather[0].description}
          </p>
          <p className="text-xl mt-2">Temperature: {weather.main.temp}°C</p>
          <p className="text-lg mt-2">Humidity: {weather.main.humidity}%</p>
          <p className="text-lg mt-2">Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
