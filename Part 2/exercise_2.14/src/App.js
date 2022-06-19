import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"

import Countries from "./components/Countries"
import Filter from "./components/Filter"

const App = () => {
    const [countries, setCountries] = useState([])
    const [filterName, setFilterName] = useState('')
    const [filterOn, setFilterOn] = useState(false)

    useEffect(() => {
        axios 
            .get("https://restcountries.com/v3.1/all")
            .then(response => {
            setCountries(response.data)
            })
    }, [])

    const handleFilterChange = (event) => {setFilterName(event.target.value)}

    const show = (event) => {
        event.preventDefault()
        setFilterOn(true)
    }

    const countriesToShow = filterOn
    ? countries.filter(country => country.name.common.toLowerCase().includes(filterName.toLowerCase()))
    : countries

    return(
        <div>
            <Filter func={show} filter={filterName} handler={handleFilterChange}/>
            <Countries countries={countriesToShow} filterOn={filterOn}/>
        </div>
    )
}

export default App