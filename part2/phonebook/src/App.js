import { useState } from 'react'

const Person = ({persons}) => <p>{persons.name} {persons.number}</p>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '+358410000000' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
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
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleNewPerson}>
        <div>
          name: <input name="name" onChange={e => setNewName(e.target.value)} value={newName} />
        </div>
        <div>number: <input name="number" onChange={e => setNewNumber(e.target.value)} value={newNumber}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(persons => <Person key={persons.name} persons={persons} />)}
    </div>
  )
}

export default App