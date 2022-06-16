import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
    return(
      <form onSubmit={props.func}>
        <div>
          find countries
          <input
            value={props.filter}
            onChange={props.handler}
          />
        </div>
      </form>
    )
}

const Country = ({countries}) => {
    if (countries.length > 10){ // search finds more than 10 
        return(
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
    else if (countries.length < 1){ // search finds less than 10 but more than 1 
        return(
            countries.map(country => <p key={country.name.common}>{country.name.common}</p>)
        )
    }
    else if (countries.length === 1){ // search finds only one country 
        return(
            <div>
                <h1>{countries.name.common}</h1>
                <p>capital {countries.capital}</p>
                <p>area {countries.area}</p>
                <h4>languages</h4>
                <img src={countries.flags.png} alt="Country flag"/>
            </div>
        )
    }
    else{
        return(
            <div></div>
        )
    }
    
}

const App = () => {
    const [countries, setCountries] = useState([])
    const [filterName, setFilterName] = useState('')

    useEffect(() => {
        axios
          .get('https://restcountries.com/v3.1/all')
          .then(response => {
            setCountries(response.data)
          })
    }, [])

    const handleFilterChange = (event) => {setFilterName(event.target.value)}

    return(
        <div>
            <Filter func={show} filter={filterName} handler={handleFilterChange}/>
            <Country countries={countriesToShow}/>
        </div>
    )
}

export default App