import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from './Weather'

const Details = ({country}) => {
  return(
    <div>
      <h1>{ country.name }</h1>
      <p>capital { country.capital }</p>
      <p>population { country.population }</p>
      <h3>languages</h3>
      <ul>
        {(country.languages).map((data, index) => <li key={ index }>{ data.name }</li>)}
      </ul>
      <img src={ country.flag } width={ 300 } alt={ country.name }></img>
      <h3>Weather in { country.capital }</h3>
      <Weather city={ country.capital }></Weather>
    </div>
  )
}

const ShowButton = ({ country }) => {
  const [showDetails, setShowDetails] = useState(false)
  return(
    <div>
      <button onClick={() => setShowDetails(true)}>show</button>
      {showDetails ? <Details country={ country }/> : null}
    </div>
  )
}

const List = ({ countries, filter}) => {
  
  let arrFilter = countries.filter(country => country.name.toLowerCase()
                                              .includes(filter.toLowerCase()))
  //console.log(arrFilter)
  if(arrFilter.length === 1){
    return <Details country={ arrFilter[0] }></Details>
  }
  else if(arrFilter.length < 10){
    return (
      <div>
        {arrFilter.map((data, index) => 
        <div key={ index }>
          <div style={{
            paddingTop: '10px',
            paddingBottom: '10px'
        }}>
          { data.name }
          <ShowButton country={ data }></ShowButton>
          </div>
        </div>
        )}
      </div>
    )
  }
  else{
    return <p>Too many matches, specify another filter</p>
  }
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

  //console.log(countries) 

  return (
    <div>
      <form>
        <div>
          find countries <input value={ filter } onChange={ handleFilter } />
        </div>
      </form>
      <List filter={ filter } countries={ countries }></List>
    </div>
  )
}

export default App;
