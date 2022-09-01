import express from 'express'
import cors from 'cors'

let quoteData = [
    {
        id: 1,
        author: {
            firstName: "Oscar",
            lastName: "Wilde",
            age: 66,
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Oscar_Wilde_3g07095u-adjust.jpg/220px-Oscar_Wilde_3g07095u-adjust.jpg"
        },
        quote: "Be yourself, everyone else is already taken.",
    },
    {
        id: 2,
        author: {
          firstName: "Nelson",
          lastName: "Mandela",
          age: 95,
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Nelson_Mandela_1994.jpg/640px-Nelson_Mandela_1994.jpg"
      },
        quote: "The greatest glory in living lies not in never falling, but in rising every time we fall."
    },
    {
        id: 3,
        author: {
          firstName: "Harold",
          lastName: "Abelson",
          age: 75,
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/HalAbelsonJI1.jpg/800px-HalAbelsonJI1.jpg"
      },
        quote: "Programs must be written for people to read, and only incidentally for machines to execute."
    }
]

let quotes = quoteData

const app = express()
app.use(cors())
app.use(express.json())
const port = 4000

app.get('/', (req, res) => {
  res.send('Quotes but they are not here. Check the /quotes endpoint')
})

app.delete('/quotes/:id', (req, res) => {
    const id = Number(req.params.id)
    quotes = quotes.filter(quote => quote.id !== id)
    if(quotes.length === 0) {
        res.status(404).send(`No quotes available.`)
    } else {
        res.send(`Quote with id ${id} has been deleted`)
    }
})

app.patch('/quotes/:id', (req, res) => {
    const id = Number(req.params.id)
    const quoteMatch = quotes.find(quote => quote.id === id)
    if(!quoteMatch) {
        res.status(404).send(`No quote with id ${id}`)
    } else {
        if(req.body.author) {
            quoteMatch.author = req.body.author
        }
        if(req.body.quote) {
            quoteMatch.quote = req.body.quote
        }
        res.send(`Quote with id ${id} has been updated`)
    }
})

app.get('/quotes', (req, res) => {
    // let quotesToSend = quotes
    // if(req.query.age) {
    //   quotesToSend = quotesToSend.filter(quote => quote.author.age === Number(req.query.age))
    // }
    res.send(quotes)
})

app.get('/quotes/:id', (req, res) => {
    const id = Number(req.params.id)
    const quote = quotes.find(q => q.id === id)
    if (!quote) {
        res.status(404).send('Quote not found. Try a different id')
    }
    res.send(quote)
})

app.get('/randomBasketItem', (req, res) => {
    const randomIndex = Math.floor(Math.random() * quotes.length)
    res.send(quotes[randomIndex])
})

app.post('/quotes', (req, res) => {

  let errors: any[] = []

    if(typeof req.body.age !== 'number') errors.push('Age must be a number')

    if(typeof req.body.quote !== 'string')  errors.push('Item is not a string')
    if(typeof req.body.author.lastName !== 'string') errors.push('Last name not provided or not a string')
    if(typeof req.body.author.firstName !== 'string') errors.push('First name not provided or not a string')
    if(typeof req.body.author.image !== 'string') errors.push('Image not provided or not a string')

    if (errors.length === 0){
        const newQuote = {
            id: quotes.length + 1,
            author: {
                firstName: req.body.author.firstName,
                lastName: req.body.author.lastName,
                age: req.body.author.age,
                image: req.body.author.image
            },
            quote: req.body.quote
        }
        quotes.push(newQuote)
        res.send(newQuote)
    }
    else {
        res.status(400).send(errors)
    }
    
})

    

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})