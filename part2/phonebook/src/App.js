import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const temp = [...persons]

  const handleNewName = event => {
    setNewName(event.target.value)
  }

  const handleNewNumber = event => {
    setNewNumber(event.target.value)
  }

  const pushData = () => {
    let newTemp = {name: newName, number: newNumber}
    temp.push(newTemp)
    setPersons(temp)
  }

  const handleNewPersonSubmit = event => {
    console.log('button clicked', event.target)
    if(persons.length === 0){
      pushData();
    }
    else{
      persons.filter((list) => {
        let compare = (list.name).localeCompare(newName)
        if(compare === 0){
          console.log(`${newName} is already added to phonebook`)
        }
        else{
          pushData();
          console.log("test")
        }
      })
    }
    event.preventDefault()
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleNewPersonSubmit}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {console.log(persons)}
      {persons.map((data, index) => <p key={index}>index[{index}] {data.name} {data.number}</p>)}
    </div>
  )
}

export default App