import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from "url";
import routes from './app/routes.js';
import flash from 'express-flash-messages';
import session from 'express-session';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');

app.use(session({secret: process.env.APP_KEY, resave:false, saveUninitialized:false, cookie: {maxAge:3600000}}));

app.use((req,res, next) => {
    res.locals.session = req.session;
    next();
})

app.use((req, res, next) => {
    if(process.env.APP_ENV === 'dev') {
        req.session.a2f = true;
    }
    next();
})
app.use(flash());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

app.listen(process.env.PORT, () => {
    console.log(`server start on http://localhost:${process.env.PORT}`);
})