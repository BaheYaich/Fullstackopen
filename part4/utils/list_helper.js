const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogList) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogList.reduce(reducer, 0)
}

const favoriteBlog = (blogList) => {
  const mostLikedBlog = blogList.reduce((mostLiked, currentBlog) => {
    return currentBlog.likes > (mostLiked.likes || 0) ? currentBlog : mostLiked
  }, {})

  return mostLikedBlog.title
    ? { title: mostLikedBlog.title, author: mostLikedBlog.author, likes: mostLikedBlog.likes }
    : null
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}