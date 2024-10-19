const Filter = ({setSearch, search}) => <div className="filterInput"><label>Filter shown with:</label> <input name="searchbar" onChange={e => setSearch(e.target.value)} value={search}/></div>

export default Filter