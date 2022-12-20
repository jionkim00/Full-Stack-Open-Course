const Language = ({ language }) => (
    <li>{language}</li>
)

const CountryInfo = ({country}) => {
    const languages = Object.keys(country.languages)
    return (
        <div>
        <h1>{country.name.official}</h1>
        <p>capital: {country.capital[0]}</p>
        <p>population: {country.population}</p>
        <h2>languages</h2>
        <ul>
          {languages.map((language) => (
            <Language key={language} language={country.languages[language]} />
          ))}
        </ul>
        <img src={country.flags.png} alt={country.name.common} width="50%" height="50%" />
      </div>
    )
  }

export default CountryInfo