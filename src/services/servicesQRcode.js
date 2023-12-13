import QRCode from "qrcode";
import { authenticator } from "otplib";
import UserRepository from "../repository/UserRepository.js";


export function getQrCode (req, res) {
    QRCode.toDataURL(authenticator.keyuri(req.user, 'webfix', process.env.A2F_SECRET), (err, url) => {
        if (err) res.redirect('/');
        res.render('profil', { 
            qr: url, 
            account: 'webfix',
            key: process.env.A2F_SECRET
        });
        // passe le statut A2F à true en BDD pour l'utilisateur
        const userRepo = new UserRepository();
        userRepo.enableA2FByUsername(req.user);
    });
};

export function form (req, res) {
    if (req.session.a2f != undefined && req.session.a2f) {
        return res.redirect('/admin')
    }
    res.render('2fa-form');
};

export function valid(req, res) {
    try {
        const isValid = authenticator.check(req.body.number_2fa, process.env.A2F_SECRET);
        // si c'est valide, on peut connecter l'utilisateur
        if(isValid) {
            req.session.a2f = true;
            res.redirect('/admin')
        } else {
            // si non valide, recharger la page du formulaire 2FA
            res.render('2fa-form', {statut: 'error'});
        }
    } catch (err) {
        res.render('2fa-form', {statut: 'error'});
    }
}