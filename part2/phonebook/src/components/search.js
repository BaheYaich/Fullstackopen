const Filter = ({setSearch, search}) => <div>Filter shown with: <input name="searchbar" onChange={e => setSearch(e.target.value)} value={search}/></div>

export default Filter