import homeController from "../src/controller/HomeController.js";
import registerController from "../src/controller/RegisterController.js";
import loginController from "../src/controller/LoginController.js"
import adminController from "../src/controller/AdminController.js";
import { controlJWT, userExist } from "../src/services/servicesJWT.js";

export default (app) => {
app.use('/', userExist)
/**
 * Gérer le JWT pour toutes les urls commencant par /admin
 */
app.use('/admin', controlJWT);

app.get('/', (req, res) => {
    homeController.index(req, res);
});

app.get('/register', (req, res) => {
    registerController.index(req, res);
});

app.get('/login', (req, res) => {
    loginController.index(req, res);
});

app.post('/login', (req, res) => {
    loginController.auth(req, res);
});

app.get('/logout', (req, res) => {
    loginController.logout(req, res);
});

app.get('/admin', (req, res) => {
    adminController.index(req, res);
});

}