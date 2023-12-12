import homeController from "../src/controller/HomeController.js";
import registerController from "../src/controller/RegisterController.js";
import loginController from "../src/controller/LoginController.js"
export default (app) => {

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

app.get('/connected', (req, res) => {
    loginController.onConnect(req, res);
});

}