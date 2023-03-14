import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { ChartsHeader } from '../../components';
import { Line } from 'react-chartjs-2';
import LocationsList, { location } from '../../components/SelectMenu';


const AirQuality = () => {

  const [dataAir, setDataAir] = useState({labels: [], datasets: []});
  const [selectedAir, setSelectedAir] = useState({});

useEffect(() => {
  const savedLocation = localStorage.getItem('selectedLocation');
  if (savedLocation) {
    setSelectedAir(JSON.parse(savedLocation));
  } else {
    setSelectedAir(location[0]);
  }
}, []);
  

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(selectedAir.coordinates);
      setDataAir({
        labels: response.data.hourly.time,
        datasets: [
          {
            label: 'PM 10',
            data: response.data.hourly.pm10,
            backgroundColor: 'rgb(255, 148, 0)',
            borderColor: 'rgb(255, 148, 0)',
          },
          {
            label: 'PM 2.5',
            data: response.data.hourly.pm2_5,
            backgroundColor: 'rgba(255, 99, 132, 1)',
            borderColor: 'rgba(255, 99, 132, 1)',
          },
        ],
      });
    };
    fetchData();
  }, [selectedAir]);

  return (
    
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
<ChartsHeader category="Air Quality" title="" />
<LocationsList selectedAir={selectedAir} setSelectedAir={setSelectedAir} />
<div className="w-full">
  <Line data={dataAir} width={300} height={200} options={{ maintainAspectRatio: true }} />
</div>
  </div>
  )};

export default AirQuality