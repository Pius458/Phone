function Form({newName,handleChange,handleSubmit,newNumber}) {
    return(
        <form onSubmit={handleSubmit}>
        <div>
          Name: <input name="name" value={newName} onChange={handleChange} placeholder="Name..." required/>
          <div>
             Number: <input name="number" type="number" value={newNumber} onChange={handleChange} placeholder="Number..." required/>
          </div>
        
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
       </form>
    )
 
}

export default Form