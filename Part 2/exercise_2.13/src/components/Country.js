import {useState} from 'react'

const Country = ({country, toggle, countryKey}) => {
    const [show, setShow] = useState(toggle)

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
                <p>capital {country.capital}</p>
                <p>area {country.area}</p>
                <h4>languages</h4>
                <ul>
                    {lang.map(language => <li key={language}>{language}</li>)}
                </ul>
                <img src={country.flags.png} alt="Country flag"/>
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