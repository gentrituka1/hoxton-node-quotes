import express from 'express'
import cors from 'cors'

const quotes = [
    {
        "id": 1,
        "author": "Oscar Wilde",
        "quote": "Be yourself; everyone else is already taken."
    },
    {
        "id": 2,
        "author": "Nelson Mandela",
        "quote": "The greatest glory in living lies not in never falling, but in rising every time we fall."
    },
    {
        "id": 3,
        "author": "Harold Abelson",
        "quote": "Programs must be written for people to read, and only incidentally for machines to execute."
    }
]

const app = express()
app.use(cors())
const port = 3000

app.get('/', (req, res) => {
  res.send('Quotes but they are not here. Check the /quotes endpoint')
})
app.get('/quotes', (req, res) => {
    res.send(quotes)
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})