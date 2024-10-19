const Person = ({persons, handleDeleteContact}) => 
{
    return (
    <div>
        <p>{persons.name} {persons.number}</p>
        <button type="submit" onClick={() => handleDeleteContact(persons.name, persons.id)}>Delete</button>
    </div>
    )
}

export default Person