import { useState } from 'react'

const Person = ({persons}) => <p>{persons.name} {persons.number}</p>
const PersonForm = ({functionReference, setNewName, newName, setNewNumber, newNumber}) => {
  return (
    <form onSubmit={functionReference}>
        <div>
          name: <input name="name" onChange={e => setNewName(e.target.value)} value={newName} />
        </div>
        <div>number: <input name="number" onChange={e => setNewNumber(e.target.value)} value={newNumber}/></div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}
const Filter = ({setSearch, search}) => <div>Filter shown with: <input name="searchbar" onChange={e => setSearch(e.target.value)} value={search}/></div>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const filteredContacts = search === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
  const handleNewPerson = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) return window.alert(`${newName} already exists in the phonebook`);
    else {
      const person = {
        name: newName,
        number: newNumber,
      }
    setPersons(persons.concat(person))
    setNewName("")
    setNewNumber("")
    }
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Filter setSearch={setSearch} search={search} />
      <h3>Add new contact</h3>
      <PersonForm functionReference={handleNewPerson} setNewName={setNewName} newName={newName} setNewNumber={setNewNumber} newNumber={newNumber} />
      <h3>Numbers</h3>
      {filteredContacts.map(persons => <Person key={persons.name} persons={persons} />)}
    </>
  )
}

export default App