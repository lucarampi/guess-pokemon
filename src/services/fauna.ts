import { Client } from "faunadb";

const secret = process.env.FAUNA_DB_KEY

if (typeof secret === 'undefined' || secret === '') {
    console.error('The FAUNADB_SECRET environment variable is not set, exiting.')
    process.exit(1)
  }

export const fauna = new Client({
    secret,
    domain: 'db.us.fauna.com',
    scheme: 'https',
})