import database from 'better-sqlite3';

const db = database('./db/setup.db', { verbose: console.log });

const createQuotesTable = db.prepare(`
    CREATE TABLE IF NOT EXISTS quotes (
        id INTEGER PRIMARY KEY,
        author TEXT,
        quote TEXT
    );
`)
createQuotesTable.run()

