import { useEffect, useState } from 'react'
import countryService from './services/countries'
import DetailedCountry from './components/detailedCountry'
import Country from './components/countryList'

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
  const matchingCountries = filteredCountries.sort((a, b) => a.name.common.localeCompare(b.name.common))

  useEffect(() => {
    countryService
      .getAll()
      .then(response => {
        setCountries(response)
        console.log("fetch successful")
      })
      .catch(error => "Something went wrong..")
  }, [])

  const handleSearch = (e) => {
    setSearch(e.target.value)
    console.log("search triggered", search)
  }

  const handleCountries = (length) => {
    if (length > 10) {
      return (
        <p>Too many matches, be more specific</p>
      )
    } else if (length > 1) {
      return (
        matchingCountries.map(country => <Country key={country.name.common} name={country.name.common} />)
      )
    } else if (length === 1) {
      return (
        <DetailedCountry country={matchingCountries[0]} />
      )
    }
  }

  return (
    <>
      <div>Find countries: <input name="searchbar" onChange={handleSearch} value={search} /></div>
      {handleCountries(matchingCountries.length)}
    </>
  )
}

export default App
