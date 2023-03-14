import React, { useState, useEffect } from 'react'
import { ChartsHeader } from '../../components';
import { Line as LineChart } from 'react-chartjs-2';
import LocationsList, {locationTemp} from '../../components/SelectMenuTemperature';
import axios from 'axios'

const Forecast = () => {
  const [data, setData] = useState({});
  const [datatemp, setDatatemp] = useState({labels: [], datasets: []});
  const [selectedTemp, setSelectedTemp] = useState({});

  useEffect(() => {
    const savedLocation = localStorage.getItem('selectedTemperature');
    if (savedLocation) {
      setSelectedTemp(JSON.parse(savedLocation));
    } else {
      setSelectedTemp(locationTemp[0]);
    }
  }, []);


  //const url = '';

  // axios.get(url).then((response) => {
  //   setData(response.data);
  //   const { time, temperature_2m } = response.data.hourly;
  //   setDatatemp({
  //     labels: time,
  //     datasets: [
  //       {
  //         label: 'Temperature (°C)',
  //         data: temperature_2m,
  //         backgroundColor: 'rgba(255, 99, 132)',
  //         borderColor: 'rgba(255, 99, 132)',
  //       },
  //     ],
  //   });
  // });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(selectedTemp.coordinates);
      const { time, temperature_2m } = response.data.hourly;
      setDatatemp({
        labels: time,
        datasets: [
          {
            label: 'Temperature (°C)',
            data: temperature_2m,
            backgroundColor: 'rgba(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132)',
          },
        ],
      });
    };
    fetchData();
  }, [selectedTemp]);

  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
    <ChartsHeader category="Forecast" title="" />
    <LocationsList selectedTemp={selectedTemp} setSelectedTemp={setSelectedTemp} />
    <LineChart data={datatemp} width={300} height={200} options={{ maintainAspectRatio: true }} />
  </div>
  )
}

export default Forecast