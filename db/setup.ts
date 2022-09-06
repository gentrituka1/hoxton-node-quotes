import database from 'better-sqlite3';

const db = database('./db/setup.db', { verbose: console.log });

function createQuoteStuff(){

    const quotes = [
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

    const createQuotesTable = db.prepare(`
        CREATE TABLE IF NOT EXISTS quotes (
            id INTEGER NOT NULL,
            author TEXT NOT NULL,
            quote TEXT NOT NULL,
            PRIMARY KEY (id)
        );
    `)
    createQuotesTable.run()

    const deleteAllQuotes = db.prepare(`
        DELETE FROM quotes;
    `)
    deleteAllQuotes.run()

    const createQuote = db.prepare(`
        INSERT INTO quotes (author, quote) VALUES (?, ?);
    `)

    for(let quote of quotes){
        createQuote.run(quote.author.firstName, quote.quote)
    }

}

createQuoteStuff()


