import axios from "axios";
import { PARENT_API_URL } from './config';

const API_URL = `${PARENT_API_URL}/api/beehive/api/data/`;

const getAccessToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.access; // or user?.token, depending on your app
};

export const getAllBeehives = async () => {
  const token = getAccessToken();
  if (!token) {
    throw new Error("No access token found. User may not be authenticated.");
  }

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};
