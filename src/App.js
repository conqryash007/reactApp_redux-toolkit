import "./App.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherData } from "./slices/weatherSlices";
function App() {
  const [city, setCity] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWeatherData("Lucknow"));
  }, []);

  const searchCity = () => {
    if (city) dispatch(fetchWeatherData(city));
  };

  const state = useSelector((state) => state);
  const { weather, loading, error } = state;
  console.log(state);
  return (
    <div className="App">
      <header className="App-header">
        {loading ? (
          <h1>LOADING...</h1>
        ) : (
          <>
            <div>
              <input type="text" onChange={(e) => setCity(e.target.value)} />
              <button onClick={searchCity}>Search</button>
            </div>
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
                    <p>{weather.main.temp}</p>
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
                  <p>{Date.now()}</p>
                </div>
              </div>
              <div className="bottom">
                <div className="sum">{weather.sys.sunrise}</div>
                <div className="hum">
                  <p>{weather.main.humidity}</p>
                </div>
                <div className="pressure">
                  <p>{weather.main.pressure}</p>
                </div>
                <div className="wind">
                  <p>{weather.wind.speed}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
