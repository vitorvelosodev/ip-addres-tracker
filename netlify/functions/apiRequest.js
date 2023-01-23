// import axios from "axios";

export const handler = async (event) => {
  const apiKey = process.env.VITE_API_KEY;
  const ip = event.queryStringParameters.ip
  const URL = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ip}`;
  const response = await fetch(URL);
  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
}
