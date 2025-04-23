import client from '../db.js'

export default async (req, res) => {
    try {
        const result = await client.query(
            'SELECT firstname, lastname, address, telephone FROM users WHERE id IN (SELECT user_id FROM registrations)')
        return res.send(result.rows)

    } catch (err) {
        console.error("Error on register: ", err)
        return res.status(400).send({
            error: 'An error occured !<br>' + err,
        })
    }
}