import pg from 'pg'
import config from './config/config.js'

const client = new pg.Client(config.db)

client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

export default client
