const Country = ({ country, handleShowCountry }) => {
    return (
        <p>{country.name.common} <button onClick={() => handleShowCountry(country)}>Show</button></p>
    )
}

export default Country