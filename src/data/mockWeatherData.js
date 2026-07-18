const mockWeatherData = {
  current: {
    name: "Dhaka",
    sys: { country: "BD", sunrise: 1680130800, sunset: 1680174000 },
    main: {
      temp: 32,
      feels_like: 35,
      temp_min: 30,
      temp_max: 34,
      humidity: 65,
      pressure: 1012,
    },
    weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
    wind: { speed: 3.6, deg: 180 },
    visibility: 10000,
    timezone: 21600,
  },
  forecast: {
    list: [
      {
        dt: 1680134400,
        main: { temp: 32, feels_like: 35, temp_min: 28, temp_max: 34 },
        weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
      },
      {
        dt: 1680220800,
        main: { temp: 30, feels_like: 33, temp_min: 26, temp_max: 32 },
        weather: [{ id: 802, main: "Clouds", description: "scattered clouds", icon: "02d" }],
      },
      {
        dt: 1680307200,
        main: { temp: 28, feels_like: 31, temp_min: 24, temp_max: 30 },
        weather: [{ id: 500, main: "Rain", description: "light rain", icon: "10d" }],
      },
      {
        dt: 1680393600,
        main: { temp: 29, feels_like: 32, temp_min: 25, temp_max: 31 },
        weather: [{ id: 801, main: "Clouds", description: "few clouds", icon: "02d" }],
      },
      {
        dt: 1680480000,
        main: { temp: 31, feels_like: 34, temp_min: 27, temp_max: 33 },
        weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
      },
    ],
  },
  airQuality: {
    list: [{
      main: { aqi: 2 },
      components: {
        co: 220.5,
        no: 0.5,
        no2: 15.2,
        o3: 45.8,
        so2: 8.3,
        pm2_5: 12.3,
        pm10: 25.6,
      },
    }],
  },
}

export default mockWeatherData
