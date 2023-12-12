import UserRepository from "../repository/UserRepository.js";
import bcrypt from "bcryptjs";
import Cookies from 'cookies';
import jwt from 'jsonwebtoken';

class LoginController {
    
    index(req, res) {
        res.render('auth/index');
    }

    auth(req,res) {
        let error;
        const repo = new UserRepository();
        repo.getUserByUsername(req.body.username).then((user)=> {
            if(user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    let accessToken = jwt.sign({username : user.username}, process.env.JWT_SKEY, {expiresIn: 604800});
                    new Cookies(req, res).set('access_token', accessToken, {httpOnly: true, secure: false });
                    console.log(`Youhou les infos de connexion sont correctes, on va maintenir la connexion avec un JWT`);
                    console.log(accessToken);

                    return res.redirect('/connected');
                } else {
                    error = `Echec d'identification.`
                }
            } else {
                error = `Echec d'identification.`
            }
            res.render('auth/index', {error})
        })
    }

    onConnect(req, res) {

        // Récupération du token dans le cookie
        let token = new Cookies(req,res).get('access_token');

        // Si le cookie (access_token) n'existe pas
        if (token == null) return res.sendStatus(401);

        // sinon on vérifie le jwt
        jwt.verify(token, process.env.JWT_SKEY, (err, data) => {

        // Erreur du JWT (n'est pas un JWT, a été modifié, est expiré)
        if(err) return res.sendStatus(403);

        // A partir de là le JWT est valide
        return res.render('auth/connected');
        })
    }
}

export default new LoginController();