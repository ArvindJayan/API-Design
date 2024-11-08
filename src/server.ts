import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { signIn, signUp } from './handlers/user';
import { protect } from './modules/auth';
import router from './router';
const app = express();

const customLogger = (message) => (req, res, next) => {
    console.log(`Hello from ${message}`);
    next();
}

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(customLogger('custom logger'));
app.use((req, res, next) => {
    req.secret = 'test';
    next();
})

app.get('/', (req, res) => {
    console.log('hello from express');
    res.status(200).json({ message: 'hello' });
});

app.use('/api', protect, router);
app.post('/signup', signUp);
app.post('/signin', signIn);

export default app;