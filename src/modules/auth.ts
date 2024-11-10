import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const comparePasswords = (password, hash) => {
    return bcrypt.compare(password, hash);
}

export const hashPassword = (password) => {
    return bcrypt.hash(password, 5);
}


export const createJWT = (user) => {
    const token = jwt.sign({
        id: user.id,
        username: user.username
    },
        process.env.JWT_SECRET
    );
    return token;
}

export const protect = (req, res, next) => {
    const bearer = req.headers.authorization;

    if (!bearer) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const [, token] = bearer.split(' ');
    if (!token) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (e) {
        console.error(e);
        return res.status(401).json({ message: 'Invalid token.' });
    }
}