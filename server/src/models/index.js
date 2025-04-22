/* import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
import config from '../config/config.js'
import { fileURLToPath } from 'url';
const db = {}

const sequelize = new Sequelize (
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options
)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

fs
    .readdirSync(__dirname)
    .filter((file) => file !== 'index.js')
    .forEach((file) => {
        const model = sequelize.import(path.join(__dirname, file))
        db[model.name] = model
    })
/* const model = sequelize.import('User.js')
db[model.name] = model */

// db.Sequelize = sequelize
// db.sequelize = sequelize

export {} 