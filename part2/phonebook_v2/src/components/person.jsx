const Person = ({persons, handleDeleteContact}) => 
{
    return (
    <li>
        <p>{persons.name} {persons.number}</p>
        <button type="submit" onClick={() => handleDeleteContact(persons.name, persons.id)}>Delete</button>
    </li>
    )
}

export default Person