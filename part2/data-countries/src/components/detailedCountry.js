const DetailedCountry = ({ country }) => {
    return (
        <>
            <h1>{country.name.common}</h1>
            <p>Capital : {country.capital.join(', ')}</p>
            <p>Area : {country.area}</p>
            <br />
            <h2>Languages :</h2>
            <ul>
                {Object.getOwnPropertyNames(country.languages).map(language => <li>{country.languages[language]}</li>)}
            </ul>
            <p className='country-flag'>{country.flag}</p>
        </>
    )
}

export default DetailedCountry