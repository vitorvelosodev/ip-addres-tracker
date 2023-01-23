// import fetch from 'node-fetch';
// import axios from "axios";

async function getInfo(apiKey) {
  const ip = '8.8.8.8'
  const URL = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ip}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}

export async function handler(event, context, callback) {
  try {
    const apiKey = process.env.VITE_API_KEY;
    // const ip = event.queryStringParameters.ip
    const data = await getInfo(apiKey);
  
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch(err) {
    return {
      statusCode: 422,
      body: 'There is an error in the function'
    }
  }
}
