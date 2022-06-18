import React from 'react'

const Display = (country) => {
    let lang = []
    for(let i in country.languages)
        lang.push(country.languages[i])
    return(
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h4>languages</h4>
            <ul>
                {lang.map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} alt="Country flag"/>
        </div>
    )
}

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
                    <p key={country.name.common}> 
                        {country.name.common}
                        <button onClick={Display(country)}>show</button>
                    </p>
                )
            )
        }
        // search finds only one country
        else if (countries.length === 1){return Display(countries[0])}
    }
    else{return(<div></div>)}
}

export default Country