import { comparePasswords, createJWT, hashPassword } from '../modules/auth';
import prisma from '../modules/db';

export const signUp = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const user = await prisma.user.create({
            data: {
                username,
                password: await hashPassword(password),
            }
        });

        const token = createJWT(user);
        res.json({ token: token });
    } catch (e) {
        e.type = 'input';
        next(e);
    }
}

export const signIn = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username
        }
    });

    const isValid = await comparePasswords(req.body.password, user.password);

    if (!isValid) {
        return res.status(401).json({ message: 'Invalid password' });
    }

    const token = createJWT(user);
    res.json({ token: token });
}
