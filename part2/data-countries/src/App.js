import { useEffect, useState } from 'react'
import countryService from './services/countries'
import DetailedCountry from './components/detailedCountry'
import Country from './components/countryList'
import Searchbar from './components/searchbar'
import SearchResults from './components/searchResults'

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
  let matchingCountries = filteredCountries.sort((a, b) => a.name.common.localeCompare(b.name.common))

  const fetchCountries = () => {
    countryService
    .getAll()
    .then(response => {
      setCountries(response)
    })
    .catch(error => "Something went wrong..")
  }

  useEffect(() => {
    fetchCountries()
  }, [])

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const resetCountries = () => {
    setSearch('')
    fetchCountries()
  }

  const handleCountries = (length) => {
    if (length === 0 || search === ''){
      return ( 
        <p>No matches..</p>
      )
    } else if (length > 10) {
      return (
        <p>Too many matches, be more specific</p>
      )
    } else if (length > 1) {
      return (
        matchingCountries.map(country => <Country key={country.name.common} country={country} handleShowCountry={handleShowCountry} />)
      )
    } else if (length === 1) {
      return (
        <DetailedCountry country={matchingCountries[0]} />
      )
    } else if (length === 0 || search === ''){
      return ( 
        <p>No matches..</p>
      )
    }
  }

  const handleShowCountry = (country) => {
    const matchingCountry = matchingCountries.filter(element => element === country)
    setCountries(matchingCountry)
  }

  return (
    <>
      <Searchbar handleSearch={handleSearch} search={search} resetCountries={resetCountries} />
      <SearchResults handleCountries={handleCountries} matchingCountries={matchingCountries} />
    </>
  )
}

export default App
