function Filter({search,handleChange}) {
    return(
        <div>
            <p>Search:</p>
            <input name="search" value={search} onChange={handleChange} placeholder="Search..."/>
        </div>
      
    )
}
export default Filter