import Joi from 'joi'

export default {
    register (req, res, next) {
        const userSchema = Joi.object({
        firstname: Joi.string()
            .min(2)
            .max(50)
            .pattern(/^[A-Za-zÀ-ÿ\s'-]+$/)
            .required(),

        lastname: Joi.string()
            .pattern(/^[A-Za-zÀ-ÿ\s'-]+$/),

        address: Joi.string()
            .min(5)
            .max(255)
            .required(),

        telephone: Joi.string()
            .pattern(/^[0-9+().\s-]{6,20}$/),

        email: Joi.string()
            .email({ tlds: { allow: false } })
            .required(),

        login: Joi.string()
            .alphanum()
            .min(4)
            .max(30)
            .required(),

        password: Joi.string()
            .min(8)
            .max(100)
            .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$')) // 1 maj, 1 min, 1 chiffre
            .required()
            .messages({
            'string.pattern.base': 'Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre.'
            }),

        passwordBis: Joi.string()
});

        const {error} = userSchema.validate(req.body)

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
                        error: 'Invalid registration information: ' + error.details[0].context.key
                    })
                    break
            }
        } else {
            next()
        }
    }
 }