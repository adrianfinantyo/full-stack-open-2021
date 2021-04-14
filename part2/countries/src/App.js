import React, { useState, useEffect } from 'react'
import axios from 'axios'


const List = ({ countries, filter }) => {

}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")

  useEffect(() => {
    axios.get('http://restcountries.eu/rest/v2/all')
         .then(response => {setCountries(response.data)})
  }, [])

  const handleFilter = event => {
    setFilter(event.target.value)
  }

  console.log(countries) 

  return (
    <div>
      <form>
        <div>
          find countries <input value={ filter } onChange={ handleFilter } />
        </div>
      </form>
      <List countries={ countries } filter={ filter } ></List>
    </div>
  )
}

export default App;
