import "./App.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherData } from "./slices/weatherSlices";

import sunset from "./assets/sunset.png";
import press from "./assets/press.png";
import hum from "./assets/hum.png";
import wind from "./assets/wind.png";
function App() {
  const [city, setCity] = useState("Ram");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWeatherData("Ram"));
  }, [dispatch]);

  const searchCity = () => {
    if (city) dispatch(fetchWeatherData(city));
  };

  const getTimeFromUnix = (unix_timestamp = new Date()) => {
    let date = new Date(unix_timestamp * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    let formattedTime =
      hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

    return formattedTime;
  };

  const getDateFromUnix = () => {
    let a = new Date();
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let time = date + " " + month + " " + year;
    return time;
  };

  const state = useSelector((state) => state);
  const { weather, loading, error } = state;

  let eleText;
  if (loading && !error) {
    eleText = (
      <>
        <h1>LOADING...</h1>
      </>
    );
  } else if (error) {
    eleText = <p>{error.message}</p>;
  } else {
    eleText = (
      <>
        <div className="container">
          <div className="top">
            <img
              style={{ color: "black" }}
              src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`}
              alt="/"
            />
          </div>
          <div className="mid">
            <div className="temp">
              <div>
                <p style={{ fontSize: "3vw" }}>{weather.main.temp}</p>
              </div>
              <div>
                <p>{weather.weather[0].main}</p>
                <p>
                  {`${weather.name}, `}
                  {weather.sys.country}
                </p>
              </div>
            </div>
            <div className="date">
              <p>{getDateFromUnix()}</p>
              <p>{getTimeFromUnix()}</p>
            </div>
          </div>
          <div className="bottom">
            <div className="sum">
              <img className="imgH" src={sunset} alt="sunset" />
              <div style={{ flexDirection: "column" }}>
                <p>{getTimeFromUnix(weather.sys.sunrise)}</p>
                <p>Sunset</p>
              </div>
            </div>
            <div className="hum sum">
              <img className="imgH" src={hum} alt="humidity" />
              <div style={{ flexDirection: "column" }}>
                <p>{weather.main.humidity}</p>
                <p>Humudity</p>
              </div>
            </div>
            <div className="pressure sum">
              <img className="imgH" src={press} alt="pressure" />
              <div style={{ flexDirection: "column" }}>
                <p>{weather.main.pressure}</p>
                <p>Pressure</p>
              </div>
            </div>
            <div className="wind sum">
              <img className="imgH" src={wind} alt="wind" />
              <div>
                <p>{weather.wind.speed}</p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <input
            type="text"
            placeholder="Enter a city"
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={searchCity}>Search</button>
        </div>
        {eleText}
      </header>
    </div>
  );
}

export default App;
