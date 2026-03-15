const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())

let notes = [
    {
        id: "1",
        content: "HTML is easy",
        important: true
    },
    {
        id: "2",
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: "3",
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

// the notes is still being stored locally
// this is just an interaction between a client(browser) and a server(http web server)

app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const note = notes.find(n => n.id === id)
    if (note) {
        response.json(note)
    } else {
        response.statusMessage = "Requested note not found!!"
        response.status(404).send("Requested note not found!!")
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})



app.post('/api/notes', (request, response) => {

    const body = request.body

    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        id: generateId()
    }

    notes = notes.concat(note)
    response.json(note)
})



const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
})


function generateId() {
    return String(Math.max(...notes.map(n => Number(n.id))) + 1)
}
