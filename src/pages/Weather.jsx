import React, { useState, useEffect } from 'react'
import axios from "axios";
import BarChart from "./BarChart";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { UserData } from "./UserData";
import { Header } from '../components';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';
import "./weather.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Weather = () => {

  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [threshold, setThreshold] = useState(0);
  const [previousLocation, setPreviousLocation] = useState(location);

  useEffect(() => {
    const storedLocation = localStorage.getItem('location');
    if (storedLocation) {
      setLocation(storedLocation);
      axios.get(url).then((response) => {
        setData(response.data);
      });
    }
  }, []);


  const searchLocation = (event) => {
    if (event.key === "Enter") {
      const newLocation = event.target.value;
      if (newLocation !== previousLocation) {
        setPreviousLocation(newLocation);
      axios.get(url).then((response) => {
        setData(response.data);
        localStorage.setItem('location', location);
      });
        if (data.main && data.main.temp > threshold) {
          notify();
        }
      }
      setLocation("");
    }
  };

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=42ac172854a431b1e8f5ef3944670d1f`;
 


  const [userData, setUserData] = useState({
    labels: UserData.map((userdata) => userdata.time),
    color: "white",
    datasets: [
      {
        label: "Temperature",
        data: UserData.map((userdata) => userdata.temperature),
        backgroundColor: "red",
        borderColor: "red",
      },
    ],
  });


  const notify = () =>
    toast.warn("Temperature above " + threshold + "°C", {
      position: "top-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  
  const notifyThresholdChange = () =>
    toast.success("Threshold changed to " + threshold + "°C", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      reverseOrder:false
    });
  
  const handleThresholdChange = (e) => {
      setThreshold(e.target.value);
      notifyThresholdChange();
    };
  


  return (
    <div className="weather">
      <div className="search">
      </div>
      <Header category="App" title="Weather" />
      <div className="mx-auto">
        <div className="mx-auto">
        <div className="search">
        <input className="bg-gray-200 py-2 px-4 rounded-md" type="text" value={location} onChange={(event) => setLocation(event.target.value)} onKeyPress={searchLocation} placeholder="Enter Location" type="text" />
        <div>
        <input type="range" min="-50" max="50" value={threshold} onChange={handleThresholdChange} />
        <label>Notify above: {threshold}°C</label>
        </div>
      </div>
          <div className="flex justify-center text-3xl font-extrabold flex text-center">
            <p>{data.name}</p>
          </div>
          <div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <ToastContainer />
      </div>
          <div className="flex justify-center text-3xl font-extrabold flex text-center">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="flex justify-center text-xl font-extrabold flex text-center">
          {data.weather ? <p>{data.weather[0].main}</p> : null}</div>
        </div>

        {data.name != undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="flex justify-center text-center bold">{data.main.feels_like.toFixed()}°C</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()}m/s</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;