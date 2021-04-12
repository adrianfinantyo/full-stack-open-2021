import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')

  const handleNewName = event => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewPersonSubmit = event => {
    console.log('button clicked', event.target)
    event.prevenDefault()
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleNewPersonSubmit}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
    </div>
  )
}

export default App