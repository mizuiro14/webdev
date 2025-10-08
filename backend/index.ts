import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import bcrypt from 'bcrypt';
import { User, UserLogin } from './types/User';
import jwt from 'jsonwebtoken';

let database: User[] = [];


const app = express();
const PORT = process.env.PORT || 3000;
app
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .post('/signup', (req, res) => {
        const user = req.body as User;
        
        bcrypt.hash(user.password, 10).then((hashedPwd) => {
            console.log(hashedPwd);
            database.push({ ...user, password: hashedPwd });
        });


        console.log('debug', user);
        res.send('hi');
    })
    .post('/login', (req, res) => {
        const user = req.body as UserLogin;
        const dbUser = database.find((e) => e.userName === user.userName);

        console.log('debug');
        if (dbUser) {
            bcrypt
                .compare(user.password, dbUser.password)
                .then((isMatched) => {
                    if (isMatched) {
                        const token = jwt.sign(
                            { name: dbUser.firstName },
                            process.env.API_KEY!,
                            {
                                expiresIn: '24h',
                            }
                        );
                        res.cookie('cookie', token);
                        res.json({ success: true });
                    } else {
                        res.json({ success: false, error: 'user not found '})
                    }
                })
                .catch((e) => {
                    res.json({ success: false, error: e})
                })
            } else {
                res.json({ success: false, error: 'user not found' })
            }
    })
    .get('/', (req, res) => {
        // console.log(database);
    })
    .listen(PORT, () =>
        console.log(`server has started at: http://localhost:${PORT}`)
    );

console.log(PORT);