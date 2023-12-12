import Cookies from 'cookies';
import jwt from 'jsonwebtoken';

export function controlJWT (req, res, next) {

    // Récupération du token dans le cookie
    let token = new Cookies(req,res).get('access_token');

    // Si le cookie (access_token) n'existe pas
    if (token == null) return res.sendStatus(401);

    // sinon on vérifie le jwt
    jwt.verify(token, process.env.JWT_SKEY, (err, data) => {

        // Erreur du JWT (n'est pas un JWT, a été modifié, est expiré)
        if(err) return res.sendStatus(403);

        // A partir de là le JWT est valide
        req.user = data.username
    });
    next();
}

export function userExist (req, res, next) {

    // Récupération du token dans le cookie
    let token = new Cookies(req,res).get('access_token');

    // Si le cookie (access_token) n'existe pas
    if (token == null) req.user = null;

    // sinon on vérifie le jwt
    jwt.verify(token, process.env.JWT_SKEY, (err, data) => {

        // Erreur du JWT (n'est pas un JWT, a été modifié, est expiré)
        if(err) req.user = null;

        else {
            // A partir de là le JWT est valide
            req.user = data.username;
            res.locals.username = req.user;
        }
        
    });
    next();
}