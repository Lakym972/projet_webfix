import UserRepository from "../repository/UserRepository.js";
import bcrypt from "bcryptjs";

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
                    console.log(`Youhou les infos de connexion sont correctes, on va maintenir la connexion avec un JWT`);
                    res.redirect('/');
                } else {
                    error = `Echec d'identification.`
                }
            } else {
                error = `Echec d'identification.`
            }
            res.render('auth/index', {error})
        })
    }
}

export default new LoginController();