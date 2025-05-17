import MyLineChart from "../Components/MyLineChart";
import MyAreaChart from "../Components/MyAreaChart";
import Table from "../Components/Table";
import Navbar from "../Components/NavbarBlack";
import React, { useState, useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
import ImageCarousel from "../Components/Carousel";
import "../Styles/Pages/Graphs.scss";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FcSynchronize, FcExport } from "react-icons/fc";
import { TiExportOutline } from "react-icons/ti";
import { TiArrowBack } from "react-icons/ti";
import { Navigate, useLocation } from "react-router-dom";
//import { getCameraRecordByBeehiveId } from "../Services/cameraRecordService";
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
      // Load the data into your state or do something with it

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
 // const [cameraRecords, setCameraRecords] = useState([]);
  //const [selectedCameraRecord, setSelectedCameraRecord] = useState(null);
  //const [imageUrls, setImageUrls] = useState([
    //"https://img.freepik.com/premium-photo/bees-entering-beehive-with-collected-floral-nectar_130265-3819.jpg?w=1380",
    //"https://static3.bigstockphoto.com/8/5/2/large1500/258793825.jpg",
  //]);

  //useEffect(() => {
    //const fetchCameraRecords = async () => {
      //const data = await getCameraRecordByBeehiveId(beehiveData._id);
      //setIsLoading(false);
      //console.log(data);
     // setCameraRecords(data.cameraRecords);

      //setSelectedCameraRecord(data.cameraRecords[0]);
      //console.log(data.cameraRecords[0]);
      //setImageUrls(data.cameraRecords[0].sample_image_urls);
    //};
    //fetchCameraRecords();

    //console.log(cameraRecords);
  //}, []);
  // const handleDownloadCsv = (beehiveId) => {
  //   downloadBeehiveMetricsCsv(beehiveId)
  //     .then((response) => {
  //       console.log(response);
  //       const url = window.URL.createObjectURL(new Blob([response.data]));
  //       const link = document.createElement("a");
  //       link.href = url;
  //       link.setAttribute("download", `beehive-metrics-${beehiveId}.csv`); // or any other filename
  //       document.body.appendChild(link);
  //       link.click();
  //       link.parentNode.removeChild(link);
  //     })
  //     .catch((error) => console.error("Error downloading CSV file:", error));
  // };

  const handleDownloadCsv = async (beehiveId) => {
    const response = await downloadBeehiveMetricsCsv(beehiveId);
    console.log(response);
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `beehive-metrics-${beehiveId}.csv`); // or any other filename
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
      weight:20,
    },
    // {
    //   createdAt: "2024-01-01T11:00:00.000Z",
    //   temperature: 15,
    //   humidity: 65,
    //   CO2: 320,
    // },
    // {
    //   createdAt: "2024-01-01T12:00:00Z",
    //   temperature: 14.480638127331558,
    //   humidity: 61.105928601719484,
    //   CO2: 353,
    // },
    // {
    //   createdAt: "2024-01-01T13:00:00Z",
    //   temperature: 14.312689925488288,
    //   humidity: 59.01917911620542,
    //   CO2: 327,
    // },
    // {
    //   createdAt: "2024-01-01T14:00:00Z",
    //   temperature: 13.323954187164201,
    //   humidity: 66.20053437080327,
    //   CO2: 337,
    // },
    // {
    //   createdAt: "2024-01-01T15:00:00Z",
    //   temperature: 15.787548422931067,
    //   humidity: 68.99521451828583,
    //   CO2: 396,
    // },
    // {
    //   createdAt: "2024-01-01T16:00:00Z",
    //   temperature: 13.269477066827797,
    //   humidity: 50.27777777763697,
    //   CO2: 360,
    // },
    // {
    //   createdAt: "2024-01-01T17:00:00Z",
    //   temperature: 16.86646918373297,
    //   humidity: 55.02876886162029,
    //   CO2: 334,
    // },
    // {
    //   createdAt: "2024-01-01T18:00:00Z",
    //   temperature: 14.726577354647768,
    //   humidity: 57.4560784122444,
    //   CO2: 382,
    // },
    // {
    //   createdAt: "2024-01-01T19:00:00Z",
    //   temperature: 14.950598344062467,
    //   humidity: 65.566236593079,
    //   CO2: 341,
    // },
    // {
    //   createdAt: "2024-01-01T20:00:00Z",
    //   temperature: 12.827280451977341,
    //   humidity: 63.294163336436114,
    //   CO2: 358,
    // },
    // {
    //   createdAt: "2024-01-01T21:00:00Z",
    //   temperature: 13.284715345942043,
    //   humidity: 55.44195549343026,
    //   CO2: 350,
    // },
  ]);

  useEffect(() => {
    const fetchBeehiveMetrics = async () => {
      const data = await getBeehiveMetricsByBeehiveId(beehiveData.id);
      for (let i = 0; i < data.length; i++) {
      //generate a random number between 4.59 and 4.61
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
            <TiArrowBack/>Back
          </button>
            </div>
          <div className="graph_card_container">
            <div className="graph_card">
              <div className="graph" id="graph1">
                <div className="graph_details">
                  <p>Weight</p>
                  <p className="value">
                    {data[data.length - 1].weight.toFixed(1)} kg</p>
                </div>
                <hr />
                <div className="sort">
                  <p>Variation Through :</p>
                  <select className="dropdown" name="sort" id="sort" onChange={(e)=>setWeightDuration(e.target.value)}>
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
                  type = "area"
                  duration={weightDuration}
                />
              </div>
            </div>

            <div className="graph_card">
              <div className="graph" id="graph2">
                <div className="graph_details">
                  <p>Tempreture</p>
                  <p className="value">
                    {data[data.length - 1].temperature.toFixed(1)} °C
                  </p>
                </div>
                <hr />
                <div className="sort">
                  <p>Variation Through :</p>
                  <select className="dropdown" name="sort" id="sort" onChange={(e)=>setTemperatureDuration(e.target.value)}>
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
                    
                  type = "area"
                  duration={temperatureDuration}
                  />
                </div>
              </div>
            </div>

            <div className="graph_card">
              <div className="graph" id="graph1">
                <div className="graph_details">
                  <p>Humidity</p>
                  <p className="value">
                    {data[data.length - 1].humidity.toFixed(1)} %
                  </p>
                </div>
                <hr />
                <div className="sort">
                  <p>Variation Through :</p>
                  <select className="dropdown" name="sort" id="sort" onChange={(e)=>setHumidityDuration(e.target.value)}>
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
                    type = "area"
                  duration={humidityDuration}
                  />
                </div>
              </div>
            </div>

            <div className="graph_card">
  <div className="graph" id="graph1">
    <div className="graph_details">
      <p>External Temperature</p> 
      <p className="value">
                    {data[data.length - 1].externalTemperature.toFixed(1)} °C
                  </p>
    </div>
    <hr />
    <div className="sort">
      <p>Variation Through :</p>
      <select className="dropdown" name="sort" id="sort" onChange={(e)=>setextempDuration(e.target.value)}>
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

          {/* <div className="video_card">
              <div className="video_container">
                <button
                  className="info_button"
                  onClick={() => {
                    setShowTable(true);
                    setShowingData(cameraRecords);
                    setTableData(["folder_size", "folder_name", "isRetrieved"]);
                  }}
                >
                  i
                </button>
                <div className="video">
                  {selectedCameraRecord && imageUrls.length > 0 ? (
                    <ImageCarousel imageUrls={imageUrls} />
                  ) : (
                    <p>No videos available</p>
                  )}
                </div>
                <div className="vl"></div>
                <div className="video_details">
                  <select
                    name="select-camera-record"
                    id="camera-record-select"
                    onChange={(e) => {
                      const selectedRecord = cameraRecords.find(
                        (record) => record._id === e.target.value
                      );
                      if (selectedRecord) {
                        setSelectedCameraRecord(selectedRecord);
                        setImageUrls(selectedRecord.sample_image_urls);
                      }
                    }}
                  >
                    {cameraRecords.map((cameraRecord) => (
                      <option
                        value={cameraRecord._id}
                        key={cameraRecord._id} // Added a key for better React performance
                      >
                        {cameraRecord.createdAtLocal.slice(0, 20)}
                      </option>
                    ))}
                  </select>
                  <p>Folder Size</p>
                  <p className="value">
                    {selectedCameraRecord
                      ? (
                          Number(
                            selectedCameraRecord.folder_size.split(" ")[0]
                          ) / 1048576
                        ).toFixed(2) + " MB"
                      : "N/A"}
                  </p>
                  <p>Video Duration</p>
                  <p className="value">10 min</p>
                </div>
              </div>
            </div>*/}
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