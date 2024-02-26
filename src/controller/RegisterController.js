import UserRepository from '../repository/UserRepository.js';
import user from '../entity/User.js';
import bcrypt from 'bcrypt';

class RegisterController {
    
    index(req, res) {
        res.render('register/index', {user: {}});
    }

    process(req, res) {
        let entity = new user();
        entity.setFirstname(req.body.firstname)
        .setLastname(req.body.lastname)
        .setUsername(req.body.username)
        .setPassword(bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)))
        .setA2f(false);

        const UserRepo = new UserRepository();
        UserRepo.getUserByUsername(req.body.username).then((user) => {
            if (user) {
                res.render('register/index', {user: entity, error : `Cet utilisateur existe déja`});
            } else {
                UserRepo.addUser(entity);
                req.flash('notify', 'Votre compte a bien été créé');
                res.redirect('/');
            }
        })
    }
}

export default new RegisterController();