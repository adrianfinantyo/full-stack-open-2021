import React, { useState } from 'react'

const List = ({ persons }) => {
  return(
    persons.map((data, index) => <p key={ index }>{ data.name } { data.number }</p>)
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const temp = [...persons]

  const handleNewName = event => {
    setNewName(event.target.value)
  }

  const handleNewNumber = event => {
    setNewNumber(event.target.value)
  }

  const handleNewFilter = event => {
    setNewFilter(event.target.value)
  }

  const handleNewPersonSubmit = event => {
    console.log('button clicked', event.target)
    const pushData = () => {
      let newTemp = {name: newName, number: newNumber}
      temp.push(newTemp)
      setPersons(temp)
    }
    if(persons.length === 0){
      pushData();
    }
    else{
      let pushFlag = 1
      for(let i=0; i<persons.length; i++){
        let compare = (persons[i].name).localeCompare(newName)
        if(compare === 0){
          alert(`${newName} is already added to phonebook`)
          pushFlag = 0
          break
        }
      }
      if(pushFlag === 1){
        pushData();
        console.log("test")
      }
    }
    event.preventDefault()
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
        filter shown with <input value={ newFilter } onChange={ handleNewFilter }/>
        </div>
      </form>
      <h2>add a new</h2>
      <form onSubmit={ handleNewPersonSubmit }>
        <div>
          name: <input value={ newName } onChange={ handleNewName }/>
        </div>
        <div>
          number: <input value={ newNumber } onChange={ handleNewNumber }/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {console.log(persons)}
      <List persons={ persons }></List>
    </div>
  )
}

export default App