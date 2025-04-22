import config from '../config/config.js'
import client from '../db.js'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs' 

const jwtSignUser = (user) => {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}
export default {
    async register (req, res) {
        try {
          const { firstname, 
                  lastname, 
                  address, 
                  telephone, 
                  email, 
                  login, 
                  password,
                  passwordBis } = req.body
          
          if (passwordBis !== password)
            return res.status(400).send({  error: 'Veuilez entrer le même mot de passe !' })

          const sameEmail = await client.query(
          'SELECT * FROM users WHERE email = $1', [email]) // request to the database if the email is already in use
          if (sameEmail.rowCount !== 0) // if email in use
            return res.status(400).send({  error: 'email already exists' }) // return an error

          const sameLogin = await client.query(
            'SELECT * FROM users WHERE email = $1', [login]) // request to the database if the login is already in use
          if (sameLogin.rowCount !== 0) // if login in use
            return res.status(400).send({  error: 'login already exists' }) // return an error

          // Hash the password
          const passwordHash = bcryptjs.hashSync(password, 10)
          
          // Insert user to the database
          const result = await client.query(
            'INSERT INTO users (firstname, lastname, address, telephone, email, login, passwordhash) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', 
            [firstname, lastname, address, telephone, email, login, passwordHash])

          // insert in registration database the id of the news user
          client.query(
            'INSERT INTO registrations (user_id) VALUES ($1)', [result.rows[0].id])
          
          // sending response
          return res.status(201).send(result.rows[0])

          } catch (err) {
            console.error("Error on register: ", err)
            return res.status(400).send({
                error: 'An error occured !<br>' + err,
            })
          }
        //
    },

    async login (req, res) {
      try {
        const { email, password } = req.body

          // request the database if an email macthes
          const result = await client.query(
            'SELECT * FROM users WHERE email = $1', [email]) 

          // if no email macthes
          if (result.rowCount === 0) 
            return res.status(403).send({error: 'The login inforamation was incorrect. <br> No email macthes'}) // return an error
          
          // if an email matches
          else 
          {
            // check is password is correct
            const isPasswordValid = bcryptjs.compareSync(password, result.rows[0].password)
            if (!isPasswordValid) // if incorrect password
              return res.status(403).send({error: 'The login inforamation was incorrect. <br> incorrect password'}) // return error
            else // everything is good
              return res.send({ 
                user: result.rows[0], // matched user
                token: jwtSignUser(result.rows[0]) // user token
              })
          }
          
        } catch (err) {
          console.error("Error on login: ", err)

          res.status(500).send({
              error: 'An error occured !<br> ' + err,
          })
        }
      //
  }
}