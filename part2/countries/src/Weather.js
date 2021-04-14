import axios from "axios";
import React, { useState, useEffect } from "react"

const Weather = ({ city }) => {
    const [weatherData, setWeatherData] = useState({})
    const apiKey = "0ea15957fae956523c5fc7dcb44de6df"
    const baseUrl = "http://api.weatherstack.com/"

    useEffect(() => {
        axios.get(`${baseUrl}current?access_key=${apiKey}&query=${city}`)
        .then(response => setWeatherData({
            temperature: response.data.current.temperature,
            icon: response.data.current.weather_icons[0],
            windSpeed: response.data.current.wind_speed,
            windDirection: response.data.current.wind_dir
        }))
    })

    return(
        <div>
            <p>temperature: { weatherData.temperature } Celcius</p>
            <img src={ weatherData.icon } width={ 100 } alt={ city }></img>
            <p>wind: { weatherData.windSpeed } direction { weatherData.windDirection }</p>
        </div>
    )
}

export default Weather