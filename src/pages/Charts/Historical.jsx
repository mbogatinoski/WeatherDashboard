import React, { useState, useEffect } from 'react'
import { ChartsHeader } from '../../components';
import { Line as LineChart } from 'react-chartjs-2';
import axios from 'axios'

const Historical = () => {
  
  const startDate = localStorage.getItem("startDate");
  const endDate = localStorage.getItem("endDate");

  // if( startDate==null && endDate==null) {
  //   const startDate = '2022-11-15';
  //   const endDate = '2022-11-13';
  // }

  const [data, setData] = useState({});
  const [datatemp, setDatatemp] = useState({labels: [], datasets: []});

  const handleStartDateChange = (event) => {
    const startDate = event.target.value;
    localStorage.setItem("startDate", startDate);
}

const handleEndDateChange = (event) => {
    const endDate = event.target.value;
    localStorage.setItem("endDate", endDate);
}


  const url = `https://archive-api.open-meteo.com/v1/archive?latitude=40.64&longitude=22.93&start_date=${encodeURIComponent(startDate)}&end_date=${encodeURIComponent(endDate)}&hourly=temperature_2m`;

  useEffect(() => {
    const url = `https://archive-api.open-meteo.com/v1/archive?latitude=40.64&longitude=22.93&start_date=${startDate}&end_date=${endDate}&hourly=temperature_2m`;
    axios.get(url).then((response) => {
      setData(response.data);
      const { time, temperature_2m } = response.data.hourly;
      setDatatemp({
        labels: time,
        datasets: [
          {
            label: 'Temperature (°C)',
            data: temperature_2m,
            backgroundColor: 'rgb(0, 118, 255)',
            borderColor: 'rgb(0, 118, 255)',
            pointStyle: 'circle',
            pointRadius: 3,
            pointHoverRadius: 10
          },
        ],
      });
    });
  }, [startDate, endDate]);

  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
    <ChartsHeader category="Historical" title="" />
    <div>
      <label htmlFor="start-date"><strong>Start date: </strong></label>
      <input type="date" id="start-date" onChange={handleStartDateChange} />
    </div>
    <div>
      <label htmlFor="end-date"><strong>End date: </strong></label>
      <input type="date" id="end-date" onChange={handleEndDateChange} />
    </div>
    <LineChart data={datatemp} width={300} height={200} options={{ maintainAspectRatio: true }} />
  </div>
  )
}

export default Historical