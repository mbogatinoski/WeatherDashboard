import React, { Component } from 'react';
import axios from 'axios';
import { Chart } from 'react-chartjs-2';

import {
    WeatherForm,
  } from ".";
  
class DashboardPanel extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            widgets: [],
            weatherData: null,
            weatherTime: null,
            weatherFullCall: null, //pap
            isFormOpen: false,
            error: null,
            isLoading: false,
            retryLoading: false,
        };
    }

    fetchWeatherData = async (latitude, longitude, measurementType) => {
        const widgets = JSON.parse(localStorage.getItem("widgets")) || [];
        this.setState({ isLoading: true, retryLoading: true });
        this.setState({ error: null });
        try {
          const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=${measurementType}`);
          this.setState({ weatherData: response.data.hourly[measurementType] });
          this.setState({ weatherTime: response.data.hourly.time });
          this.setState({ weatherFullCall: response});
          console.log(this.state.weatherFullCall);
          const index = widgets.findIndex((widget) => {
            return widget.latitude === latitude && widget.longitude === longitude && widget.measurementType === measurementType;
          });
          if (index !== -1) {
            widgets[index].apiData = response.data.hourly[measurementType];
            widgets[index].apiTime = response.data.hourly.time;
          }
          localStorage.setItem("widgets", JSON.stringify(widgets));

        } catch (error) {
            this.setState({ error: error.message });
        } finally {
            this.setState({ isLoading: false, retryLoading: false });
        }
    }

    openWeatherForm = () => {
        this.setState({ isFormOpen: true });
    }

    closeWeatherForm = () => {
        this.setState({ isFormOpen: false });
    }

    getWidgets = () => {
        return JSON.parse(localStorage.getItem("widgets")) || []// Retrieve the widgets from local storage and return them
    }

    deleteWidget = (index) => {
        
        let widgets = JSON.parse(localStorage.getItem("widgets")) || [];// Retrieve the widgets from local storage
        widgets.splice(index, 1);// Remove the widget at the specified index
        localStorage.setItem("widgets", JSON.stringify(widgets));// Update the widgets in local storage
        this.setState({widgets});// Update the state so the changes are reflected on the page
    }

    renderChart(weatherData, weatherTime, chartType) {

        <p>{console.log("render chart called")}</p>
        if (weatherData.length === weatherTime.length) {
          const chartData = {
            labels: weatherTime,
            datasets: [{
              label: 'Weather Data',
              data: weatherData,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }]
          };

          
          const chartOptions = {
            responsive: true,
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          };
    
          const chartElement = document.getElementById('myChart');

            //if (chartElement) {
                const chart = new Chart(chartElement, {
                 type: 'line',
                 data: chartData
                });
            //}
        }
    }

    componentDidMount() {
        this.setState({widgets: this.getWidgets()});
        this.state.widgets.forEach(widget => {// loop through the widgets and call the fetchWeatherData function for each widget
            this.fetchWeatherData(widget.latitude, widget.longitude, widget.measurementType);
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.widgets !== this.state.widgets) {
            this.state.widgets.forEach(widget => {// loop through the widgets and call the fetchWeatherData function for each widget
                this.fetchWeatherData(widget.latitude, widget.longitude, widget.measurementType);
            });
        }
    }

    getWidgets = () => {
        return JSON.parse(localStorage.getItem("widgets")) || []// Retrieve the widgets from local storage and return them
    }

    renderWidgets = () => {
        const widgets = JSON.parse(localStorage.getItem('widgets'));
        let gridTemplateColumns;
        if(widgets && widgets.length <= 4){
            gridTemplateColumns = 'repeat(4, 1fr)';
        } else if(widgets && widgets.length <= 8){
            gridTemplateColumns = 'repeat(4, 1fr)';
        } else if(widgets && widgets.length > 8){
            gridTemplateColumns = 'repeat(6, 1fr)';
        } 
        return (
          <div className="dashboard-panel" style={{display: 'grid', gridTemplateColumns: gridTemplateColumns, gridGap: '10px'}}>
            {this.state.widgets.map((widget, index) => (
              <div key={widget.index}>
                <div className="widget" style={{backgroundColor: 'yellow', padding: '10px', borderRadius: '25px', border: '1px solid black'}}>
                    <h2 className='text-2xl font-bold'>{widget.name}</h2>
                    {widget.apiData && (
                        <Chart
                            type={widget.chartType}
                            data={{
                            labels: widget.apiTime,
                            datasets: [
                                {
                                label: widget.measurementType,
                                data: widget.apiData,
                                backgroundColor: "rgba(75,192,192,0.4)",
                                borderColor: "rgba(75,192,192,1)",
                                borderWidth: 1,
                                },
                            ],
                            }}
                            
                        />
                    )}
        
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => this.deleteWidget(index)}><strong>Delete</strong></button>
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={() => this.editWidget(index)}><strong>Edit</strong></button>
        </div>
                </div>
              </div>
            ))}
          </div>
        );
    }

    render() {
        return (
          <div>
            {this.renderWidgets()}
            
            {this.state.isFormOpen && <WeatherForm closeForm={this.closeWeatherForm} onSubmit={this.submitWeatherData} />}
            <button className="fixed bottom-10 z-10 right-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={this.openWeatherForm}>
    Add Widget
  </button>
          </div>
        );
      }

    

}

export default DashboardPanel;
