import { useState } from 'react'
import CountryInfo from './CountryInfo'

const Country = ({ country }) => {
    const [ state, setState ] = useState(false)
    const handleClick = () => {
      setState(!state)
    }
    return (
    <>
      {country.name.common} <button onClick={handleClick}>show</button>
      {state && <CountryInfo country={country} />}
      <br />
    </>
    )
}

const CountriesData = ({countriesData, filter}) => {
    let filteredCountries = []

    if (filter.length > 0) {
        filteredCountries = countriesData.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
    } else {
        filteredCountries = countriesData
    }
        
    if (filteredCountries.length > 10) {
        return 'Too many matches, specify another filter'
    }
    else if (filteredCountries.length === 1) {
        return (
            <div>
                <CountryInfo country={filteredCountries[0]} />
            </div>
        )
    }
    else {
        return (
            <div>

              {filteredCountries.map(country =>
                <Country
                    key={country.name.common} 
                    country={country}  
                />
              )}

          </div>
        )
    }
}

export default CountriesData