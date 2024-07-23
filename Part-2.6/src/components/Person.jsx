function Person({filteredContact,handleDelete,id}) {
    return (
        <div>
        {
          filteredContact.map(p => <p key={p.id}>{p.name} {p.number} <button onClick={() => handleDelete(p.id)}>Delete</button></p>)
        }
        </div>
    )
 
}
export default Person