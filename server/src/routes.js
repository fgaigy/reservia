import AuthenticationController from "./controllers/AuthenticationController.js"
import AuthenticationControllerPolicy from "./policies/AuthenticationControllerPolicy.js"
import getNewRegistrations from "./services/getNewRegistrations.js"

export default (app) => {
    app.post('/register',
        AuthenticationControllerPolicy.register,
        AuthenticationController.register),
    
    app.post('/login',
        AuthenticationController.login)

    app.post('/getNewRegistration', 
        getNewRegistrations)
}