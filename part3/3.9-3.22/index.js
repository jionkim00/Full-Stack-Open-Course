const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())

var morgan = require('morgan')
const app = express()
app.use(bodyParser())
app.use(morgan('tiny'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
    response.send('<p>Phonebook has info for ' + persons.length + ' people</p>' + '<p>' + new Date() + '</p>')
  })

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })
  
  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const person = persons.find(person => {
        return person.id === id
    })
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }

  app.post('/api/persons', (request, response) => {
    console.log(request.body)
    const body = request.body
    console.log(body.content)
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'must have both name and number' 
    })
  }

  const duplicate = persons.some(person => person.name.toLowerCase() === body.name.toLowerCase())
  if (duplicate) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
    
  }

  persons = persons.concat(person)

  response.json(person)
  })

  const PORT = process.env.PORT || 3001
  app.listen((PORT), () => {
    console.log(`Server running on port ${PORT}`)
})

  
  