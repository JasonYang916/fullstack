import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"

const Country = ({country, toggle, countryKey}) => {
    const [show, setShow] = useState(toggle)
    const [weatherData, setWeatherData] = useState([])

    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}`)
            .then(response => {
                setWeatherData(response.data)
            })
    }, [country.capital])

    const toggleDisplay = (event) => {
        event.preventDefault()
        setShow(!show)
    }

    if (show){
        let lang = []
        for(let i in country.languages)
            lang.push(country.languages[i])
        return(
            <div>
                <h1>{country.name.common}</h1>
                <p>{"capital " + country.capital}</p>
                <p>{"area " + country.area}</p>
                <h4>languages</h4>
                <ul>
                    {lang.map(language => <li key={language}>{language}</li>)}
                </ul>
                <img src={country.flags.png} alt="Country flag"/>
                <h2>{"Weather in " + country.capital}</h2>
                <p>{"temperature " + (weatherData.main.temp-273.15)}</p>
                <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="Weather Icon"/>
                <p>{"wind " + weatherData.wind.speed} m/s</p>
                <p><button onClick={toggleDisplay}>hide</button></p>
            </div>
        )
    }
    else{
        return(
        <p key={countryKey}> 
            {country.name.common}
            <button onClick={toggleDisplay}>show</button>
        </p>
        )
    }
}

export default Country