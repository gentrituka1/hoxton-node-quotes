import express from 'express'
import cors from 'cors'
import database from 'better-sqlite3'

const db = database('../db/setup.db', { verbose: console.log })
const app = express()
app.use(cors())
app.use(express.json())
const port = 4000

const getQuotes = db.prepare(`
    SELECT * FROM quotes;
`)

const getQuoteById = db.prepare(`
    SELECT * FROM quotes WHERE id = ?;
`)

const createQuote = db.prepare(`
    INSERT INTO quotes (author, quote) VALUES (?, ?);
`)

const deleteQuote = db.prepare(`
    DELETE FROM quotes WHERE id = ?;
`)

const updateQuote = db.prepare(`
    UPDATE quotes SET author = ?, quote = ? WHERE id = ?;
`)

app.get('/', (req, res) => {
    res.send(`check the /quotes endpoint`)
})

app.delete('/quotes/:id', (req, res) => {
    const id = req.params.id
    const quote = deleteQuote.get(id)
    
    if (quote) {
        res.send(quote)
    } else {
        res.status(404).send({ error: 'Quote not found'})
    }
})

app.patch('/quotes/:id', (req, res) => {
    const id = req.params.id
    const quote = updateQuote.get(req.body.author, req.body.quote, id)
    
    if (quote) {
        res.send(quote)
    } else {
        res.status(404).send({ error: 'Quote not found'})
    }
})

app.get('/quotes', (req, res) => {
    const quotes = getQuotes.all()
    res.send(quotes)
})

app.get('/quotes/:id', (req, res) => {
    const id = req.params.id
    const quote = getQuoteById.get(id)
    
    if (quote) {
        res.send(quote)
    } else {
        res.status(404).send({ error: 'Quote not found'})
    }
})

app.get('/randomQuote', (req, res) => {
    const quotes = getQuotes.all()
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    res.send(randomQuote)
})

app.post('/quotes', (req, res) => {

//   let errors: any[] = []

//     if(typeof req.body.age !== 'number') errors.push('Age must be a number')

//     if(typeof req.body.quote !== 'string')  errors.push('Item is not a string')
//     if(typeof req.body.author.lastName !== 'string') errors.push('Last name not provided or not a string')
//     if(typeof req.body.author.firstName !== 'string') errors.push('First name not provided or not a string')
//     if(typeof req.body.author.image !== 'string') errors.push('Image not provided or not a string')

//     if (errors.length === 0){
//         const newQuote = {
//             id: quotes.length + 1,
//             author: {
//                 firstName: req.body.author.firstName,
//                 lastName: req.body.author.lastName,
//                 age: req.body.author.age,
//                 image: req.body.author.image
//             },
//             quote: req.body.quote
//         }
//         quotes.push(newQuote)
//         res.send(newQuote)
//     }
//     else {
//         res.status(400).send(errors)
//     }

    const author = req.body.author
    const quote = req.body.quote

    let errors: string[] = []

    if(typeof author !== 'string') errors.push('Author not given or not a string')
    if(typeof quote !== 'string') errors.push('Quote not given or not a string')

    if (errors.length === 0){
        const info = createQuote.run(author, quote)
        const singleQuote = getQuoteById.get(info.lastInsertRowid)
        res.send(singleQuote)
    }
})

    

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})