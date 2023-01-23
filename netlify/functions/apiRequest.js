// import axios from "axios";
const axios = require('axios').default;

async function getInfo(apiKey, ip) {
  const URL = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ip}`;
  const response = await axios.get(URL);
  const data = response.data;
  return data;
}

export const handler = async (event) => {
  const apiKey = process.env.VITE_API_KEY;
  const ip = event.queryStringParameters.ip
  const data = await getInfo(apiKey, ip); 

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
};
