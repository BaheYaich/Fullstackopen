const PersonForm = ({functionReference, setNewName, newName, setNewNumber, newNumber}) => {
  return (
    <form onSubmit={functionReference}>
        <label>name:</label><input required placeholder="Type a name." name="name" onChange={e => setNewName(e.target.value)} value={newName} />
        <label>number:</label><input required placeholder="Format XX-XXXXXXX or XXX-XXXXXXXX." name="number" onChange={e => setNewNumber(e.target.value)} value={newNumber}/>
        <button type="submit">add</button>
    </form>
  )
}

export default PersonForm