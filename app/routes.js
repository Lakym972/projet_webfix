import homeController from "../src/controller/HomeController.js";
import registerController from "../src/controller/RegisterController.js";
import loginController from "../src/controller/LoginController.js"
import adminController from "../src/controller/AdminController.js";
import { controlJWT, userExist } from "../src/services/servicesJWT.js";
import * as a2f  from "../src/services/servicesQRcode.js";

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

app.get('/admin/movie/:id([0-9]+)', (req, res) => {
    adminController.description(req, res);
});

app.post('/admin/movie/:id([0-9]+)', (req, res) => {
    adminController.add(req, res);
});

app.get('/profil', a2f.getQrCode);
app.get('/2fa-valid', a2f.form);
app.post('/2fa-valid', a2f.valid);

}