import { useState, useEffect } from 'react'
import weatherService from '../services/weather'

const Weather = ({ country }) => {
    const [capitalWeather, setCapitalWeather] = useState(null)

    useEffect(() => {
        weatherService.getWeatherData(country)
        .then(response => {
            setCapitalWeather(response)
        })
        .catch(error => "Something went wrong..")
    }, [country])

    if (capitalWeather === null) {
        return null
    }

    return (
        <>
            <p>Temperature in C°: {capitalWeather.main.temp}</p>
            <img src={`https://openweathermap.org/img/wn/${capitalWeather.weather[0].icon}@2x.png`} alt={capitalWeather.weather[0].description} />
            <p>Wind : {capitalWeather.wind.speed}</p>
        </>    
    )
}

export default Weather