const morgan = require('morgan')

// Custom morgan token to log the request body in POST/PUT requests
morgan.token('body', (req) => JSON.stringify(req.body))

// Middleware to handle unknown endpoints (404 errors)
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' })
}

// Centralized error handling for various types of errors
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformatted ID' }) // Handle invalid MongoDB IDs
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message }) // Handle Mongoose validation errors
  }

  next(error)
}

module.exports = {
  morgan,
  unknownEndpoint,
  errorHandler
}