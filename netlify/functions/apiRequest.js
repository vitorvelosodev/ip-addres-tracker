// import axios from "axios";
import fetch from 'node-fetch';

async function getInfo(apiKey, ip) {
  const URL = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ip}`;
  const response = await fetch(URL);
  const data = response.json();
  return data;
}

exports.handler = async (event, context, callback) => {
  try {
    const apiKey = process.env.VITE_API_KEY;
    const ip = event.queryStringParameters.ip
    const data = await getInfo(apiKey, ip); 
  
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
