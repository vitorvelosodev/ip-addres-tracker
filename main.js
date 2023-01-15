import './style.css';
import Swal from 'sweetalert2';
// import * as dotenv from 'dotenv'
// dotenv.config()
// import express from 'express'

const btnSearch = document.querySelector('#btn-search');
btnSearch.addEventListener('click', (event) => {
  event.preventDefault();
  const ip = document.querySelector('#search-input').value;
  fetchIPLocation(ip);
});

// Map

var map = L.map('map').setView([51.505, -0.09], 15);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attributionControl: false,
    zoomControl: false,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
map.boxZoom.disable();
document.querySelector(".leaflet-top").style.visibility = 'hidden';

// API Call

async function fetchIPLocation(ip) {
  try {
    if (ip.length <= 1) throw new Error('You should type a valid IP');
    const URL = `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.VITE_API_KEY}&ipAddress=${ip}`;
    const response = await fetch(URL);
    const data = await response.json();
    if (data.code) throw new Error(data.messages)
    updateMap(data.location.lat, data.location.lng);
    document.querySelector('#ip-searched').innerHTML = data.ip;
    document.querySelector('#result-address').innerHTML = `${data.location.city}, ${data.location.country} ${data.location.postalCode}`;
    document.querySelector('#result-timezone').innerHTML = `UTC ${data.location.timezone}`;
    document.querySelector('#result-name').innerHTML = data.isp;
  } catch(error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.message,
    })
  }
}

function updateMap(lat, lng) {
  map.setView([lat, lng], 15);
  var marker = L.marker([lat, lng]).addTo(map);
}
