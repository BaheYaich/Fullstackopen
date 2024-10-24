const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response, next) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
    .catch(error => next(error))
})

blogsRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => next(error))
})

// // Get all blogs
// blogsRouter.get('/', (request, response, next) => {
//   Blog.find({})
//     .then(result => response.json(result))
//     .catch(error => next(error)) // Pass errors to error handler
// })

// Get a specific blog by ID
blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end() // If blog not found, return 404
      }
    })
    .catch(error => next(error))
})

// Delete a blog by ID
blogsRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndDelete(request.params.id)
    .then(result => response.status(204).end()) // Return 204 (No Content) if deletion is successful
    .catch(error => next(error))
})

// // Add a new blog
// blogsRouter.post('/', (request, response, next) => {
//   const { title, author, url, likes } = request.body

//   if (!title || !author || !url || !likes) {
//     return response.status(400).json({ error: 'Details missing' }) // Validate required fields
//   }

//   Blog.findOne({ title, author, url, likes }) // Ensure name is unique
//     .then(existingBlog => {
//       if (existingBlog) {
//         return response.status(400).json({ error: 'Blog must be unique. Please update instead.' })
//       } else {
//         const blog = new Blog({ title, author, url, likes }) // Create new blog object
//         blog.save()
//           .then(savedBlog => response.json(savedBlog))
//           .catch(error => next(error))
//       }
//     })
//     .catch(error => next(error))
// })

// // Update a blog's details
// blogsRouter.put('/:id', (request, response, next) => {
//   const { title, author, url, likes } = request.body

//   if (!title || !author || !url || !likes) {
//     return response.status(400).json({ error: 'Details missing' })
//   }

//   const blog = { title, author, url, likes }

//   Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' })
//     .then(updatedPerson => response.json(updatedPerson))
//     .catch(error => next(error))
// })

module.exports = blogsRouter