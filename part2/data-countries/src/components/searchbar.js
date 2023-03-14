const Searchbar = ({ handleSearch, search, resetCountries}) => {
    return (
        <div className="searchbar">Find countries: <input name="searchbar" onChange={handleSearch} value={search} /><button onClick={resetCountries}>Clear search</button></div>
    )
}

export default Searchbar