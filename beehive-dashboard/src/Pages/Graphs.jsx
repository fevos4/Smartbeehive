import MyLineChart from "../Components/MyLineChart";
import MyAreaChart from "../Components/MyAreaChart";
import Table from "../Components/Table";
import Navbar from "../Components/NavbarBlack";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ImageCarousel from "../Components/Carousel";
import "../Styles/Pages/Graphs.scss";
import { IoCloseCircleOutline } from "react-icons/io5";
import { TiExportOutline } from "react-icons/ti";
import { TiArrowBack } from "react-icons/ti";
import { getBeehiveMetricsByBeehiveId } from "../Services/beehiveMetricsService";
import { downloadBeehiveMetricsCsv } from "../Services/beehiveMetricsService";
import { MyChartHandler } from "../Components/MyChartHandler";

const Graphs = () => {
  const location = useLocation();
  const beehiveData = location.state?.beehiveData;
  const navigate = useNavigate();
  console.log(beehiveData);

  useEffect(() => {
    if (beehiveData) {
      setTableData(beehiveData);
    }
  }, [beehiveData]);

  const [showTable, setShowTable] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const backgroundClick = useRef(null);

  const [weightDuration, setWeightDuration] = useState("hour");
  const [temperatureDuration, setTemperatureDuration] = useState("hour");
  const [humidityDuration, setHumidityDuration] = useState("hour");
  const [extempDuration, setextempDuration] = useState("hour");

  useEffect(() => {
    document.addEventListener("click", handleBackgroundClick);

    return () => {
      document.removeEventListener("click", handleBackgroundClick);
    };
  }, []);

  const handleBackgroundClick = (e) => {
    if (e.target === backgroundClick.current) {
      setShowTable(false);
    }
  };

  const handleDownloadCsv = async (beehiveId) => {
    const response = await downloadBeehiveMetricsCsv(beehiveId);
    console.log(response);
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `beehive-metrics-${beehiveId}.csv`);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  const [data, setData] = useState([
    {
      createdAt: "2024-01-01T10:00:00.000Z",
      temperature: 12,
      humidity: 60,
      extemp: 300,
      weight: 20,
    },
  ]);

  useEffect(() => {
    const fetchBeehiveMetrics = async () => {
      const data = await getBeehiveMetricsByBeehiveId(beehiveData.id);
      for (let i = 0; i < data.length; i++) {
        const randomWeight = Math.random() * (4.70 - 4.56) + 4.56;
        data[i].weight = randomWeight;
      }
      console.log(data);
      setData(data);
      setIsLoading(false);
    };
    fetchBeehiveMetrics();
  }, []);

  const [showingData, setShowingData] = useState(data);

  return (
    <div className="dashboard_container">
      <Navbar />
      {showTable && (
        <div className="table">
          <div className="table_container">
            <button
              className="close_button"
              onClick={(e) => {
                e.preventDefault();
                setShowTable(false);
              }}
            >
              <IoCloseCircleOutline />
            </button>
            <select className="sort_button" name="sort" id="sort">
              <option value="hour">Last hour</option>
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
            </select>
            <div className="table_background" ref={backgroundClick}>
              <Table data={showingData} dataKeys={tableData} />
            </div>
          </div>
        </div>
      )}
      {!isLoading ? (
        <div className="graph_container">
          <div className="graph_header">
            <p className="topic">{beehiveData.name}</p>
            <div className="button_container">
              <button
                className="export_button"
                onClick={(e) => {
                  e.preventDefault();
                  handleDownloadCsv(beehiveData.id);
                }}
              >
                <TiExportOutline /> Export
              </button>
              <button
                className="back-button"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/dashboard");
                }}
              >
                <TiArrowBack /> Back
              </button>
            </div>
          </div>
          <div className="graph_card_container">
            <div className="graph_card">
              <div className="graph" id="graph1">
                <div className="graph_details">
                  <p>Weight</p>
                  <p className="value">{data[data.length - 1].weight.toFixed(1)} kg</p>
                </div>
                <hr />
                <div className="sort">
                  <p>Variation Through :</p>
                  <select className="dropdown" name="sort" id="sort" onChange={(e) => setWeightDuration(e.target.value)}>
                    <option value="hour">Last hour</option>
                    <option value="day">Day</option>
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                  </select>
                </div>
                <button
                  className="info_button"
                  onClick={() => {
                    setShowTable(true);
                    setShowingData(data);
                    setTableData(["weight"]);
                  }}
                >
                  i
                </button>
                <MyChartHandler
                  data={data}
                  dataKeys={["weight"]}
                  colors={["#8884d8"]}
                  type="area"
                  duration={weightDuration}
                />
              </div>
            </div>

            <div className="graph_card">
              <div className="graph" id="graph2">
                <div className="graph_details">
                  <p>Temperature</p>
                  <p className="value">{data[data.length - 1].temperature.toFixed(1)} °C</p>
                </div>
                <hr />
                <div className="sort">
                  <p>Variation Through :</p>
                  <select className="dropdown" name="sort" id="sort" onChange={(e) => setTemperatureDuration(e.target.value)}>
                    <option value="hour">Last hour</option>
                    <option value="day">Day</option>
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                  </select>
                </div>
                <button
                  className="info_button"
                  onClick={() => {
                    setShowTable(true);
                    setShowingData(data);
                    setTableData(["temperature"]);
                  }}
                >
                  i
                </button>
                <div
                  onClick={() => {
                    setShowTable(true);
                    setTableData(["temperature"]);
                  }}
                  className="graph_click"
                >
                  <MyChartHandler
                    data={data}
                    dataKeys={["temperature"]}
                    colors={["#82ca9d"]}
                    type="area"
                    duration={temperatureDuration}
                  />
                </div>
              </div>
            </div>

            <div className="graph_card">
              <div className="graph" id="graph1">
                <div className="graph_details">
                  <p>Humidity</p>
                  <p className="value">{data[data.length - 1].humidity.toFixed(1)} %</p>
                </div>
                <hr />
                <div className="sort">
                  <p>Variation Through :</p>
                  <select className="dropdown" name="sort" id="sort" onChange={(e) => setHumidityDuration(e.target.value)}>
                    <option value="hour">Last hour</option>
                    <option value="day">Day</option>
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                  </select>
                </div>
                <button
                  className="info_button"
                  onClick={() => {
                    setShowTable(true);
                    setShowingData(data);
                    setTableData(["humidity"]);
                  }}
                >
                  i
                </button>
                <div
                  onClick={() => {
                    setShowTable(true);
                    setTableData(["humidity"]);
                  }}
                  className="graph_click"
                >
                  <MyChartHandler
                    data={data}
                    dataKeys={["humidity"]}
                    colors={["#8884d8"]}
                    type="area"
                    duration={humidityDuration}
                  />
                </div>
              </div>
            </div>

            <div className="graph_card">
              <div className="graph" id="graph1">
                <div className="graph_details">
                  <p>External Temperature</p>
                  <p className="value">{data[data.length - 1].externalTemperature.toFixed(1)} °C</p>
                </div>
                <hr />
                <div className="sort">
                  <p>Variation Through :</p>
                  <select className="dropdown" name="sort" id="sort" onChange={(e) => setextempDuration(e.target.value)}>
                    <option value="hour">Last hour</option>
                    <option value="day">Day</option>
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                  </select>
                </div>
                <button
                  className="info_button"
                  onClick={() => {
                    setShowTable(true);
                    setShowingData(data);
                    setTableData(["externalTemperature"]);
                  }}
                >
                  i
                </button>
                <div
                  onClick={() => {
                    setShowTable(true);
                    setShowingData(data);
                    setTableData(["externalTemperature"]);
                  }}
                  className="graph_click"
                >
                  <MyChartHandler
                    data={data}
                    dataKeys={["externalTemperature"]}
                    colors={["#ff8042"]}
                    type="area"
                    duration={extempDuration}
                  />
                </div>
              </div>
            </div>

            <div className="general_info_card">
              <div className="general_info">
                <p>General Informations:</p>
                <div className="general_info_details">
                  <div className="info_box">
                    <p className="key">Age of the hive</p>
                    <p className="value">2 months</p>
                  </div>
                  <div className="info_box">
                    <p className="key">Connection Status</p>
                    <p className="value">Connected 🟢</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h1>Loading ...</h1>
        </>
      )}
    </div>
  );
};

export default Graphs;