import React from "react"
import Country from "./Country"

const Countries = ({countries, filterOn}) => {
    if(filterOn){
         // search finds more than 10 
        if (countries.length > 10)
            return <div>Too many matches, specify another filter</div>
        // search finds less than 10 but more than 1
        else if (countries.length > 1)
            return countries.map(country => <Country key={country.name.common} countryKey={country.name.common} country={country} toggle={false}/>)
        // search finds only one country
        else if (countries.length === 1)
            return <Country key={countries[0].name.common} countryKey={countries[0].name.common} country={countries[0]} toggle={true}/>
    }
    else{return(<div></div>)}
}

export default Countries