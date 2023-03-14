import React, { Component } from 'react';

class WeatherForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            latitude: "",
            longitude: "",
            measurementType: "temperature_2m",
            chartType: "line",
            notificationValue: '',
            apiData:"",
            apiTime:""
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleLatitudeChange = this.handleLatitudeChange.bind(this);
        this.handleLongitudeChange = this.handleLongitudeChange.bind(this);
        this.handleMeasurementTypeChange = this.handleMeasurementTypeChange.bind(this);
        this.handleChartTypeChange = this.handleChartTypeChange.bind(this);
        this.handleApiDataChange = this.handleApiDataChange.bind(this);
        this.handleApiTimeChange = this.handleApiTimeChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    handleLatitudeChange(event) {
        this.setState({ latitude: event.target.value });
    }

    handleLongitudeChange(event) {
        this.setState({ longitude: event.target.value });
    }

    handleMeasurementTypeChange(event) {
        this.setState({ measurementType: event.target.value });
    }

    handleChartTypeChange(event) {
        this.setState({ chartType: event.target.value });
    }

    handleApiDataChange(event) {
      this.setState({ apiData: event.target.value });
    }

    handleApiTimeChange(event) {
      this.setState({ apiTime: event.target.value });
    }

    handleNotificationChange = (event) => {
      this.setState({ notificationValue: event.target.value });
    }

    handleFormChange(event) {
      this.setState({ [event.target.name]: event.target.value });
    }
  
    handleFormSubmit(event) {
      event.preventDefault();
      const { name, latitude, longitude, measurementType, chartType, notification } = this.state;
      this.submitWeatherData({ name, latitude, longitude, measurementType, chartType, notification });
      this.setState({ name: "", latitude: "", longitude: "", measurementType: "temperature_2m", chartType: "line", notification: "", apiData:"", apiTime:"" });
    }
  
    submitWeatherData = (data) => {
      const widget = {
        name: data.name,
        latitude: data.latitude,
        longitude: data.longitude,
        measurementType: data.measurementType,
        chartType: data.chartType,
        notification: data.notification, // include notification in widget object
        apiData: data.apiData,
        apiTime: data.apiTime
      };
  
      
      let widgets = JSON.parse(localStorage.getItem("widgets")) || [];// Get any existing widgets from local storage
      
      widgets.push(widget);// Add the new widget
      
      localStorage.setItem("widgets", JSON.stringify(widgets));// Save the updated widgets array to local storage
  
      // Clear the form
      this.setState({
          name: "",
          latitude: "",
          longitude: "",
          measurementType: "temperature_2m",
          chartType: "line",
          apiData:"",
          apiTime:""
      });
  }


  render() {
    return (
      <form onSubmit={this.handleFormSubmit} className="static object-top z-10 max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4 font-bold text-gray-800">Weather Form</h2>
        <div className="mb-4">
          <label className="block font-bold text-gray-700">Name:</label>
          <input 
            type="text" 
            name="name" 
            value={this.state.name} 
            onChange={this.handleNameChange} 
            placeholder="Name" 
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold text-gray-700">Latitude:</label>
          <input 
            type="number" 
            name="latitude" 
            value={this.state.latitude} 
            onChange={this.handleLatitudeChange} 
            placeholder="Latitude" 
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold text-gray-700">Longitude:</label>
          <input 
            type="number" 
            name="longitude" 
            value={this.state.longitude} 
            onChange={this.handleLongitudeChange} 
            placeholder="Longitude" 
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold text-gray-700">Measurement Type:</label>
          <select 
            name="measurementType" 
            value={this.state.measurementType} 
            onChange={this.handleMeasurementTypeChange} 
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="temperature_2m">Temperature</option>
            <option value="relativehumidity_2m">Humidity</option>
            <option value="pressure_msl">Air Pressure</option>
            <option value="cloudcover">Cloud Cover</option>
            
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-bold text-gray-700">Notify above:</label>
          <input type="text" name="notification" value={this.state.notification} onChange={this.handleNotificationChange} placeholder="Threshold"
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold text-gray-700">Chart Type:</label>
          <select 
            name="chartType" 
            value={this.state.chartType} 
            onChange={this.handleChartTypeChange} 
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="line">Line</option>
            <option value="bar">Bar</option>
            <option value="pie">Pie</option>
            <option value="doughnut">Doughnut</option>
          <option value="polarArea">PolarArea</option>
          <option value="radar">Radar</option>
          <option value="scatter">Scatter</option>
          <option value="bubble">Bubble</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">Save</button>
          <button onClick={this.props.closeForm} className="ml-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 focus:outline-none focus:bg-red-500">Cancel</button>
        </div>
      </form>
    );
  }
  
}
export default WeatherForm;
