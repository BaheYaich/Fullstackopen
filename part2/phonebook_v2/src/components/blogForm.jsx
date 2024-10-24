const BlogForm = ({ functionReference, setNewTitle, newTitle, setNewAuthor, newAuthor, setNewUrl, newUrl, setNewLikes, newLikes }) => {
  return (
    <form onSubmit={functionReference}>
        <label>Title:</label><input required placeholder="Type a title." name="title" onChange={e => setNewTitle(e.target.value)} value={newTitle} />
        <label>Author:</label><input required placeholder="Type an author's name." name="author" onChange={e => setNewAuthor(e.target.value)} value={newAuthor}/>
        <label>URL:</label><input required placeholder="Type an URL." name="url" onChange={e => setNewUrl(e.target.value)} value={newUrl}/>
        <label>Likes:</label><input required placeholder="Set how many likes." name="likes" onChange={e => setNewLikes(e.target.value)} value={newLikes}/>
        <button type="submit">add</button>
    </form>
  )
}

export default BlogForm