<template>
  <header id="nav">
    <div class="container">
      <router-link to="/"><img src="./assets/logo.png" alt="DB WORLD logo" /></router-link>
      <div class="container-fluid fh5co-home-banner">
        <div class="card">
          <div class="center-text">
            <router-link to="/film" class="btn">
              <svg width="201" height="51" viewBox="0 0 201 51">
                <defs>
                  <linearGradient id="linear-gradient" x1="140.508" y1="50.5" x2="60.492" y2="0.5"
                    gradientUnits="userSpaceOnUse">
                    <stop offset="0" stop-color="#e90e65" />
                    <stop offset="1" stop-color="#fff" />
                  </linearGradient>
                </defs>
                <rect id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="cls-1" x="0.5" y="0.5" width="200"
                  height="50" rx="25" ry="25" />
              </svg>
              <span>Film</span>
              </router-link>

            <router-link to="/login" class="btn">
              <svg width="201" height="51" viewBox="0 0 201 51">
                <defs>
                  <linearGradient id="linear-gradient" x1="140.508" y1="50.5" x2="60.492" y2="0.5"
                    gradientUnits="userSpaceOnUse">
                    <stop offset="0" stop-color="#e90e65" />
                    <stop offset="1" stop-color="#fff" />
                  </linearGradient>
                </defs>
                <rect id="Rounded_Rectangle_1" data-name="Rounded Rectangle 1" class="cls-1" x="0.5" y="0.5" width="200"
                  height="50" rx="25" ry="25" />
              </svg>
              <span>Staff / Customer</span>
              </router-link>
          </div>
          <h2 class="white">{{timestamp}}</h2>
          <p class="white">Hong Kong Weather: Temp {{weather.temp}}°C | Feels Like {{weather.feels_like}}°C | Temp Min {{weather.temp_min}}°C | Temp Max {{weather.temp_max}}°C | Pressure {{weather.pressure}} | Humidity {{weather.humidity}}%</p>
        </div>
      </div>
    </div>
  </header>
  <router-view/>
</template>

<script>
// import axios from 'axios'

export default {
  data () {
    return {
      timestamp: '',
      api_key: '1fb6931acd1b21a56fe9045b24068c6e',
      base_url: 'https://api.openweathermap.org/data/2.5/',
      weather: {},
      query: 'Hong Kong'  
    }
  },
  created() {
      setInterval(this.getNow, 1000)
  },
  beforeMount(){
      this.weatherlist()
  },
  methods: {
    getNow: function() {
        const today = new Date()
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
        const time = ("0" + today.getHours()).slice(-2) + ":" + ("0" + today.getMinutes()).slice(-2) + ":" + ("0" + today.getSeconds()).slice(-2)
        const dateTime = date +' '+ time
        this.timestamp = dateTime
    },
    async weatherlist(){
        const res = await fetch(`${this.base_url}weather?q=${this.query}&units=metric&appid=${this.api_key}`)
        const data = await res.json();
        this.weather = data.main
    }
  }
} 
</script>

<style>
@import './assets/css/bootstrap.min.css';
@import './assets/css/style.css';

.cls-1 {
  fill: none;
  stroke-width: 1px;
  stroke: url(#linear-gradient);
}

p.white{
  color: #fff;
}
</style>
