import { useState,useEffect } from "react";
import cService from './service/contacts'
import Form from "./components/Form";
import Person from "./components/Person";
import Filter from "./components/FIlter";
import Notification from "./components/notice";

const App = () => {
  const [persons, setPerson] = useState([])
  
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message,setMessage] = useState(null)
  

  useEffect(()=> {
    cService
         .getAll()
         .then(initialContacts => {
          setPerson(initialContacts)
         }).catch(error=> console.log("error",error))     
  },[])
  

  const handleSubmit = (e) => {
    e.preventDefault()

    const existingContact = persons.find(p => p.name === newName)

    if(existingContact) {
      const confirmReplace = window.confirm(
        `${newName} aready exist, replace the old one?`
      )

      if(confirmReplace){
        const updatedPerson = {...existingContact,number:newNumber}
        console.log(updatedPerson)
        cService
             .update(existingContact.id,updatedPerson)
             .then(updated => {
              setMessage(
                `${existingContact.name} was replaced successfully`
              )
              setTimeout(() => {
                setMessage(null)
              },5000)
              setPerson(persons.map(p => p.id !== existingContact.id ? p : updated))
              setNewName('')
              setNewNumber('')
             })
             .catch(() => {
              setMessage(
                `${existingContact.name} does't reside/was removed from the server`
              )
              setTimeout(()=> {
                setMessage(null)
              },5000)
              setPerson(persons.filter(p => p.name !== existingContact.name))
              setNewName('')
              setNewNumber('')
             })
                     
      }
      return
    }
   
    const personObject = {
      name: newName,
      number: newNumber
    }

    cService
         .create(personObject)
         .then(createdNumber => {
          console.log('New: ',createdNumber)
          setMessage(
            `Name: ${createdNumber.name} Number: ${createdNumber.number} was created successfully `
          )
          setTimeout(() => {
            setMessage(null)
          },5000)
          setPerson(persons.concat(createdNumber))
          setNewName('')
          setNewNumber('')
         })
         .catch(error => {
            setMessage(error.response.data)
            setTimeout(() => {
              setMessage(null)
            },5000)
         })
  }

  const handleDelete = (id) => {
    console.log(`handling delete of ${id}`)
    cService
         .deleting(id)
         .then(deleteItem => {
          if(deleteItem === 200) {
            setPerson(persons.filter(p => p.id !== id))
          }
         })
         .catch(() => {
          alert(`${id} doesn't exist in server`)
          setPerson(persons.filter(p => p.id !== id))
         })

  }
    
  const handleChange = (e) => {
    const {name,value} = e.target

    if (name === 'name') {
      setNewName(value)
    }else if(name === 'number') {
      setNewNumber(value)
    }else if(name === 'search') {
      setSearch(value)
    }
  }
  const filteredContact = persons.filter(person => {
   return person.name.toLowerCase().includes(search.toLowerCase())
  })


  return (
    <div className="container">
      <h1>phonebook</h1>
      <aside style={{display:"flex", textAlign:"justify"}}>
        <div style={{border: "2px solid white",padding:"30px"}}>
          <div>
            <nav>
              <Notification message={message}/>
              <Filter search={search} handleChange={handleChange} />
              <hr/>
            </nav>
          </div>
          <h2>Add new</h2>
          <Form
               newNumber={newNumber}
               newName={newName}
               handleChange={handleChange}
               handleSubmit={handleSubmit}
          />
        </div>
     
        <div style={{boader: "2px solid white",padding:"30px",width:"75%"}} >
           <h2>Numbers</h2>
           <Person filteredContact={filteredContact} handleDelete={handleDelete}/> 
        </div>
      </aside>
      
    </div>
  )
}
export default App