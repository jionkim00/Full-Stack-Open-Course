import { useState, useEffect } from 'react'
import axios from 'axios'

import CountriesData from './components/CountriesData'
import Filter from './components/Filter'


const App = () => {
  const [countriesData, setCountriesData] = useState([])
  const [filter, setFilter] = useState('')

  const hook = (() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountriesData(response.data)
        console.log(response.data)
  })
  })

  useEffect(hook, [])

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <Filter filter={filter} handleFilter={handleFilter} />
      <CountriesData countriesData={countriesData} filter={filter} />
    </div>
  )
}

export default App