import Joi from 'joi'

export default {
    register (req, res, next) {
        const schema = Joi.object({
            email: Joi.string().email(),
            password: Joi.string().regex( new RegExp('^[a-zA-Z0-9]{8,32}$') )
        })

        const {error} = schema.validate(req.body)

        if (error) {
            switch (error.details[0].context.key) {
                case 'email':
                    res.status(400).send({
                        error: 'You must provide a valid email'
                    })
                    break
                case 'password':
                    res.status(400).send({
                        error: 'Invalid password'
                    })
                    break

                default:
                    res.status(400).send({
                        error: 'Invalid registration information'
                    })
                    break

            }
        } else {
            next()
        }
    }
 }