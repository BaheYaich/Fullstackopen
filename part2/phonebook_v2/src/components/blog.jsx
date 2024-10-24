const Blog = ({blogs, handleDeleteBlog}) => 
{
    return (
    <li>
        <p>{blogs.title} {blogs.author} {blogs.url} {blogs.likes}</p>
        <button type="submit" onClick={() => handleDeleteBlog(blogs.name, blogs.id)}>Delete</button>
    </li>
    )
}

export default Blog