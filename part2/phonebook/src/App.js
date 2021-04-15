import React, { useState, useEffect } from 'react'
import * as personService from "./Services_Person"
import Notification from "./Notification"

const Header = ({ title }) => {
  return <h1>{title}</h1>
}

const Filter = ({ newFilter, handleNewFilter }) => {
  return (
      <form>
          <div>
              filter shown with <input value={newFilter} onChange={handleNewFilter} />
          </div>
      </form>
  )
}

const Form = ({ handleNewPersonSubmit, handleNewName, handleNewNumber, newName, newNumber }) => {
  return (
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
  )
}

const DeleteButton = ({ person, deletePerson }) => {
  return(
    <button style={{
      marginLeft: '5px'
    }} onClick={() => deletePerson(person.id, person.name)}>Delete</button>
  )
}

const List = ({ persons, newFilter, deletePerson }) => {
  if (newFilter !== '') {
      let arrFilter = persons.filter(person => person.name.toLocaleLowerCase().includes(newFilter.toLocaleLowerCase()))
      return arrFilter.map((data, index) => <p key={index}>{data.name} {data.number}</p>)
  }
  else {
      return (
          persons.map((data, index) => (
            <div key={ index } style={{
              paddingTop: '10px',
              paddingBottom: '10px'
              }}>
              {data.name} {data.number}
              <DeleteButton person={ data } deletePerson={ deletePerson }></DeleteButton>
            </div>
          )
      )
    )
  }
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ notification, setNotification ] = useState('')
  const [ tempName, setTempName ] = useState('')

  useEffect(() => {
    personService.getAll().then(initalPersons => {
      setPersons(initalPersons);
    });
  }, []);

  const deletePerson = (id, name) => {
    if(window.confirm(`Delete ${name}?`)){
      personService.deletePerson(id).then(response => {
        setPersons(persons.filter(person => person.id !== id))
      })
    }
    setTempName(name)
    setNotification('delete')
  }

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
    let newTemp = {name: newName, number: newNumber}
    const pushData = () => {
      personService.create(newTemp).then(response => {
        setPersons([...persons, response])
      })
      setTempName(newName)
      setNotification('added')
    }

    let pushFlag = 1
    for(let i=0; i<persons.length; i++){
      let compareName = (persons[i].name.toLowerCase())
                    .localeCompare(newName.toLocaleLowerCase())
      let compareNumber = (persons[i].number).localeCompare(newNumber)
      if(compareName === 0 && compareNumber === 0){
        alert(`${persons[i].name} is already added to phonebook`)
        pushFlag = 0
        break
      }
      else if(compareName === 0 && compareNumber !== 0){
        let id = persons[i].id
        personService.update(persons[i], newTemp).then(response => {
          setPersons([...persons.filter(person => person.id !== id), response])})
        setTempName(persons[i].name)
        setNotification('update')
        pushFlag = 0
      }
    }
    if(pushFlag === 1){
      pushData();
    }

    event.preventDefault()
  }

  return (
    <div>
      <Header title="Phonebook"></Header>
      <Notification status={ notification} tempName={ tempName }></Notification>
      <Filter newFilter={ newFilter } handleNewFilter={ handleNewFilter }></Filter>
      <Header title="add a new"></Header>
      <Form
        handleNewName={ handleNewName }
        handleNewNumber={ handleNewNumber }
        handleNewPersonSubmit={ handleNewPersonSubmit }
        newName={ newName }
        newNumber={ newNumber }
      ></Form>
      <Header title="Numbers"></Header>
      <List persons={ persons } newFilter={ newFilter } deletePerson={ deletePerson } ></List>
    </div>
  )
}

export default App