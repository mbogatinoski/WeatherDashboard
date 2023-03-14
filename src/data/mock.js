import React from "react";
import { AiOutlineStock } from "react-icons/ai";
import { WiCloud } from "react-icons/wi";
import { MdSensors } from "react-icons/md";
import { GoDashboard } from "react-icons/go";
import { BsSpeedometer } from "react-icons/bs";
import { FaHistory } from "react-icons/fa";
import { MdSensorsOff } from "react-icons/md";
import { AiFillWarning } from "react-icons/ai";
import { GrLocation } from "react-icons/gr";
import autonomousSmoke from "./autonomous-smoke.png";
import conventionalSmoke from "./conventional-smoke.png";
import addressableSmoke from "./addressable-smoke.png";
import gasDetector from "./gas-detector.png";
import autonomousGas from "./autonomous-gas.png";
import powerSupply from "./power-supply.png";

export const gridOrderImage = (props) => (
  <div>
    <img
      className="rounded-xl h-20 md:ml-3"
      src={props.ProductImage}
      alt="order-item"
    />
  </div>
);

export const sensorsData = [
  {
    SensorID: 1,
    Name: "Autonomous Smoke Alarm",
    Title: "Smoke",
    Country: "Athens",
    Status: "Active",
    SensorImage: autonomousSmoke,
  },
  {
    SensorID: 2,
    Name: "Autonomous Gas Detector",
    Title: "Gas",
    Country: "Athens",
    Status: "Inactive",
    SensorImage: autonomousGas,
  },
  {
    SensorID: 3,
    Name: "Conventional Smoke Detector",
    Title: "Smoke",
    Country: "Thessaloniki",
    Status: "Active",
    SensorImage: conventionalSmoke,
  },
  {
    SensorID: 4,
    Name: "Addressable Smoke Detector",
    Title: "Smoke",
    Country: "Thessaloniki",
    Status: "Active",
    SensorImage: addressableSmoke,
  },
  {
    SensorID: 5,
    Name: "Power Supply",
    Title: "Power/Electricity",
    Country: "Thessaloniki",
    Status: "Active",
    SensorImage: powerSupply,
  },
];

export const gridOrderStatus = (props) => (
  <button
    type="button"
    style={{ background: props.StatusBg }}
    className="text-white py-1 px-2 capitalize rounded-2xl text-md"
  >
    {props.Status}
  </button>
);

const gridSensorProfile = (props) => (
  <div className="flex items-center gap-2">
    <img
      className="rounded-full w-10 h-10"
      src={props.SensorImage}
      alt="employee"
    />
    <p>{props.Name}</p>
  </div>
);

const gridSensorCountry = (props) => (
  <div className="flex items-center justify-center gap-2">
    <GrLocation />
    <span>{props.Country}</span>
  </div>
);

export const sensorsGrid = [
  {
    headerText: "Title",
    width: "150",
    template: gridSensorProfile,
    textAlign: "Center",
  },
  { field: "Name", headerText: "", width: "0", textAlign: "Center" },
  {
    field: "Title",
    headerText: "Category",
    width: "170",
    textAlign: "Center",
  },
  {
    headerText: "Location",
    width: "120",
    textAlign: "Center",
    template: gridSensorCountry,
  },

  {
    field: "Status",
    headerText: "Status",
    width: "120",
    textAlign: "Center",
  },
  {
    field: "SensorID",
    headerText: "Sensor ID",
    width: "125",
    textAlign: "Center",
  },
];

export const links = [
  {
    title: "Panel",
    links: [
      {
        name: "panel",
        icon: <GoDashboard />,
      },
    ],
  },
  {
    title: "Apps",
    links: [
      {
        name: "weather",
        icon: <WiCloud />,
      },
    ],
  },
  {
    title: "Charts",
    links: [
      {
        name: "Forecast",
        icon: <AiOutlineStock />,
      },

      {
        name: "Historical",
        icon: <FaHistory />,
      },
      {
        name: "AirQuality",
        icon: <BsSpeedometer />,
      },
    ],
  },
];

export const earningData = [
  {
    icon: <MdSensors />,
    amount: "17",
    title: "Sensors",
    iconColor: "black",
    iconBg: "lightgrey",
    pcColor: "red-600",
  },
  {
    icon: <MdSensors />,
    amount: "14",
    title: "Active",
    iconColor: "#03C9D7",
    iconBg: "#E5FAFB",
    pcColor: "green-600",
  },
  {
    icon: <MdSensorsOff />,
    amount: "3",
    title: "Inactive",
    iconColor: "rgb(228, 106, 118)",
    iconBg: "rgb(255, 244, 229)",

    pcColor: "green-600",
  },
  {
    icon: <AiFillWarning />,
    amount: "39",
    title: "Warnings",
    iconColor: "rgb(255, 244, 229)",
    iconBg: "rgb(254, 201, 15)",
    pcColor: "red-600",
  },
];
