import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const createBaseUrl = (country) => {
    console.log(api_key)
    const capitalLat = country.capitalInfo.latlng[0]
    const capitalLon = country.capitalInfo.latlng[1]
    return (
        `https://api.openweathermap.org/data/2.5/weather?lat=${capitalLat}&lon=${capitalLon}&units=metric&appid=${api_key}`
    )
}

const getWeatherData = (country) => {
    const baseUrl = createBaseUrl(country)
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export default { getWeatherData }