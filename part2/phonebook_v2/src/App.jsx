import { useEffect, useState } from 'react';
import Person from './components/person';
import PersonForm from './components/personForm';
import Filter from './components/search';
import personService from './services/persons';
import Notification from './components/notification';

const App = () => {
  // State variables to manage contacts, new input fields, search term, and notifications
  const [persons, setPersons] = useState([]); // List of all contacts
  const [newName, setNewName] = useState(''); // Name input field state
  const [newNumber, setNewNumber] = useState(''); // Number input field state
  const [search, setSearch] = useState(''); // Search term
  const [message, setMessage] = useState(null); // Notification message
  const [messageType, setMessageType] = useState('success'); // Type of notification (success/error)

  // Fetch all persons when the component mounts
  useEffect(() => {
    personService
      .getAll()
      .then(response => setPersons(response)); // Set the initial list of persons
  }, []);

  // Helper function to handle notifications (displays a message for 5 seconds)
  const handleNotification = (message, type = 'success') => {
    setMessageType(type);
    setMessage(message);
    setTimeout(() => {
      setMessage(null); // Clear the message after 5 seconds
    }, 5000);
  };

  // Filtered contacts based on the search term
  const filteredContacts = persons.filter(person =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  // Function to handle adding or updating a person in the phonebook
  const handleAddOrUpdatePerson = (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Basic validation to ensure that both name and number are provided
    if (!newName || !newNumber) {
      handleNotification('Name and Number are required!', 'error');
      return;
    }

    // Check if the person already exists in the phonebook (case insensitive)
    const existingPerson = persons.find(person =>
      person.name.toLowerCase() === newName.toLowerCase()
    );

    // Object for the new/updated person
    const personObject = {
      name: newName,
      number: newNumber
    };

    if (existingPerson) {
      // If the person exists, confirm with the user to update their number
      const confirmUpdate = window.confirm(
        `${newName} is already in the phonebook. Replace the old number with the new one?`
      );

      if (confirmUpdate) {
        // Send a PUT request to update the person's number
        personService
          .update(existingPerson.id, personObject)
          .then(updatedPerson => {
            // Update the state with the updated person
            setPersons(persons.map(person =>
              person.id !== existingPerson.id ? person : updatedPerson
            ));
            // Clear input fields
            setNewName('');
            setNewNumber('');
            // Show success notification
            handleNotification(`Updated ${newName}'s number`, 'success');
          })
          .catch(error => {
            // Handle any error (e.g., person not found on the server)
            handleNotification(
              error.response?.data?.error || `Error updating ${newName}'s contact`,
              'error'
            );
          });
      }
    } else {
      // If the person does not exist, create a new contact (POST request)
      personService
        .create(personObject)
        .then(returnedPerson => {
          // Add the new person to the list
          setPersons(persons.concat(returnedPerson));
          // Clear input fields
          setNewName('');
          setNewNumber('');
          // Show success notification
          handleNotification(`Added ${newName}`, 'success');
        })
        .catch(error => {
          // Handle any error (e.g., validation failure)
          handleNotification(
            error.response?.data?.error || `Error adding ${newName}`,
            'error'
          );
        });
    }
  };

  // Function to handle deleting a person from the phonebook
  const handleOnDelete = (name, id) => {
    // Ask for confirmation before deleting
    if (!window.confirm(`${name} is about to be deleted`)) return;

    // Send a DELETE request to the server
    personService
      .delete(id)
      .then(() => {
        // Filter out the deleted person from the state (no need to refetch)
        setPersons(persons.filter(person => person.id !== id));
        // Show success notification
        handleNotification(`'${name}' was deleted`, 'error');
      })
      .catch(error => {
        // Handle any error (e.g., person already deleted from the server)
        handleNotification(
          `'${name}' was already deleted from the server`,
          'error'
        );
        // Remove the person from the state if they were not found on the server
        setPersons(persons.filter(person => person.id !== id));
      });
  };

  // JSX structure for the phonebook UI
  return (
    <>
      <h2>Phonebook</h2>
      {/* Notification Component */}
      <Notification message={message} type={messageType} />
      
      {/* Filter Component for searching contacts */}
      <Filter setSearch={setSearch} search={search} />
      
      <h3>Add new contact</h3>
      {/* Form to add or update contacts */}
      <PersonForm
        functionReference={handleAddOrUpdatePerson}
        setNewName={setNewName}
        newName={newName}
        setNewNumber={setNewNumber}
        newNumber={newNumber}
      />

      <h3>Numbers</h3>
      {/* List of contacts filtered by search term */}
      <ul className='contacts'>
        {filteredContacts.map(person =>
          <Person
            key={person.id}
            persons={person}
            handleDeleteContact={handleOnDelete}
          />
        )}
      </ul>
    </>
  );
};

export default App;