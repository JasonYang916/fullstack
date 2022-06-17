import React from 'react'

const Country = ({countries, filterOn}) => {
    if(filterOn){
        if (countries.length > 10){ // search finds more than 10 
            return(
                <div>
                    Too many matches, specify another filter
                </div>
            )
        }
        else if (countries.length > 1){ // search finds less than 10 but more than 1 
            return(
                countries.map(country => 
                    <p key={country.name.common}>{country.name.common}</p>)
            )
        }
        else if (countries.length === 1){ // search finds only one country 
            let lang = []
            for(let i in countries[0].languages)
                lang.push(countries[0].languages[i])
            return(
                <div>
                    <h1>{countries[0].name.common}</h1>
                    <p>capital {countries[0].capital}</p>
                    <p>area {countries[0].area}</p>
                    <h4>languages</h4>
                    <ul>
                        {lang.map(language => <li key={language}>{language}</li>)}
                    </ul>
                    <img src={countries[0].flags.png} alt="Country flag"/>
                </div>
            )
        }
    }
    else{return(<div></div>)}
}

export default Country