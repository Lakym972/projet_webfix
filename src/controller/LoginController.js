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
                    let accessToken = jwt.sign({username : user.username , a2f: user.a2f}, process.env.JWT_SKEY, {expiresIn: 604800});
                    new Cookies(req, res).set('access_token', accessToken, {httpOnly: true, secure: (process.env.APP_ENV === 'production') });
                    return res.redirect('/admin');
                } else {
                    error = `Echec d'identification.`
                }
            } else {
                error = `Echec d'identification.`
            }
            res.render('auth/index', {error})
        })
    }

    logout(req, res) {
        new Cookies(req, res).set('access_token', "", {maxAge: Date.now()});
        req.flash('notify', 'Vous êtes maintenant déconnecté(e)');
        return res.redirect('/');
    }
    
}

export default new LoginController();