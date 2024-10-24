import { useEffect, useState } from 'react';
import Blog from './components/blog';
import BlogForm from './components/BlogForm';
import Filter from './components/search';
import blogService from './services/blogs';
import Notification from './components/notification';

const App = () => {
  // State variables to manage contacts, new input fields, search term, and notifications
  const [blogs, setBlogs] = useState([]); // List of all contacts
  const [newTitle, setNewTitle] = useState(''); // Name input field state
  const [newAuthor, setNewAuthor] = useState(''); // Number input field state
  const [newUrl, setNewUrl] = useState(''); // Number input field state
  const [newLikes, setNewLikes] = useState(''); // Number input field state
  const [search, setSearch] = useState(''); // Search term
  const [message, setMessage] = useState(null); // Notification message
  const [messageType, setMessageType] = useState('success'); // Type of notification (success/error)

  // Fetch all persons when the component mounts
  useEffect(() => {
    blogService
      .getAll()
      .then(response => setBlogs(response)); // Set the initial list of persons
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
  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  // Function to handle adding or updating a person in the phonebook
  const handleAddOrUpdateBlog = (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Basic validation to ensure that both name and number are provided
    if (!newTitle || !newAuthor || !newUrl || !newLikes) {
      handleNotification('All fields are required!', 'error');
      return;
    }

    // Check if the person already exists in the phonebook (case insensitive)
    const existingBlog = blogs.find(blog =>
      blog.name.toLowerCase() === newTitle.toLowerCase()
    );

    // Object for the new/updated person
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes
    };

    if (existingBlog) {
      // If the person exists, confirm with the user to update their number
      const confirmUpdate = window.confirm(
        `${newTitle} is already in the database. Replace the old details with the new ones?`
      );

      if (confirmUpdate) {
        // Send a PUT request to update the person's number
        blogService
          .update(existingBlog.id, blogObject)
          .then(updatedBlog => {
            // Update the state with the updated person
            setBlogs(blogs.map(blog =>
              blog.id !== existingBlog.id ? blog : updatedBlog
            ));
            // Clear input fields
            setNewTitle('');
            setNewAuthor('');
            setNewUrl('');
            setNewLikes('');
            // Show success notification
            handleNotification(`Updated ${newTitle}'s details`, 'success');
          })
          .catch(error => {
            // Handle any error (e.g., person not found on the server)
            handleNotification(
              error.response?.data?.error || `Error updating ${newTitle}'s details`,
              'error'
            );
          });
      }
    } else {
      // If the person does not exist, create a new contact (POST request)
      blogService
        .create(blogObject)
        .then(returnedBlog => {
          // Add the new person to the list
          setBlogs(blogs.concat(returnedBlog));
          // Clear input fields
          setNewTitle('');
            setNewAuthor('');
            setNewUrl('');
            setNewLikes('');
          // Show success notification
          handleNotification(`Added ${newTitle}`, 'success');
        })
        .catch(error => {
          // Handle any error (e.g., validation failure)
          handleNotification(
            error.response?.data?.error || `Error adding ${newTitle}`,
            'error'
          );
        });
    }
  };

  // Function to handle deleting a person from the phonebook
  const handleOnDelete = (title, id) => {
    // Ask for confirmation before deleting
    if (!window.confirm(`${title} is about to be deleted`)) return;

    // Send a DELETE request to the server
    blogService
      .delete(id)
      .then(() => {
        // Filter out the deleted person from the state (no need to refetch)
        setBlogs(blogs.filter(blog => blog.id !== id));
        // Show success notification
        handleNotification(`'${title}' was deleted`, 'error');
      })
      // eslint-disable-next-line no-unused-vars
      .catch(error => {
        // Handle any error (e.g., person already deleted from the server)
        handleNotification(
          `'${title}' was already deleted from the server`,
          'error'
        );
        // Remove the person from the state if they were not found on the server
        setBlogs(blogs.filter(blog => blog.id !== id));
      });
  };

  // JSX structure for the phonebook UI
  return (
    <>
      <h2>Blogs</h2>
      {/* Notification Component */}
      <Notification message={message} type={messageType} />
      
      {/* Filter Component for searching contacts */}
      <Filter setSearch={setSearch} search={search} />
      
      <h3>Add new contact</h3>
      {/* Form to add or update contacts */}
      <BlogForm
        functionReference={handleAddOrUpdateBlog}
        setNewTitle={setNewTitle}
        newTitle={newTitle}
        setNewAuthor={setNewAuthor}
        newAuthor={newAuthor}
        setNewUrl={setNewUrl}
        newUrl={newUrl}
        setNewLikes={setNewLikes}
        newLikes={newLikes}
      />

      <h3>Saved Blogs</h3>
      {/* List of contacts filtered by search term */}
      <ul className='blogs'>
        {filteredBlogs.map(blog =>
          <Blog
            key={blog.id}
            blogs={blog}
            handleDeleteBlog={handleOnDelete}
          />
        )}
      </ul>
    </>
  );
};

export default App;