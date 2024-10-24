const mongoose = require('mongoose')

// Define the schema for 'Blog' documents in the MongoDB collection
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

// Modify the JSON response: convert '_id' to 'id' and remove MongoDB-specific fields '__v' and '_id'
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString() // Convert MongoDB _id to a string format
    delete returnedObject._id // Remove _id field from the response
    delete returnedObject.__v // Remove version field from the response
  }
})

module.exports = mongoose.model('Blog', blogSchema, 'blogs')