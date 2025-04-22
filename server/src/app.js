/* const express = require('express')
const bodyParser = require('body-parser') // to process json data easily
const cors = require('cors') // accessibility from any domain
const morgan = require('morgan') // logs */
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import config from './config/config.js'
import routes from './routes.js';
// import pg from 'pg'

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

routes(app)
app.listen(config.port)
console.log(`Server started at port ${config.port}`)