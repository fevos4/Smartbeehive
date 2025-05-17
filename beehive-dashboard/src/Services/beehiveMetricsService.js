import axios from 'axios';
import { PARENT_API_URL } from './config';

const API_URL = `${PARENT_API_URL}/api/beehive-metrics/`;


const getAccessToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.access; // or user?.token, depending on your app
};

export const getBeehiveMetrics = async () => {
  const token = getAccessToken();
  if (!token) {
    throw new Error("No access token found. User may not be authenticated.");
  }

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;};


// Get metrics for a specific beehive ID
export const getBeehiveMetricsByBeehiveId = async (beehiveId) => {
  const accessToken = getAccessToken();
  const response = await axios.get(`${API_URL}by-beehive/${beehiveId}/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return response.data;
};

// Download CSV for a specific beehive ID
export const downloadBeehiveMetricsCsv = async (beehiveId) => {
  const accessToken = getAccessToken();
  const response = await axios.get(`${API_URL}export/${beehiveId}/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    responseType: 'blob', // For handling CSV file download
  });

  // Create blob download
  const blob = new Blob([response.data], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `beehive_${beehiveId}_metrics.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();

  return response;
};
