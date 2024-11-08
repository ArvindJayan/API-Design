import * as dotenv from 'dotenv';
dotenv.config();

import app from './server';

app.listen(3001, () => {
    console.log('Running on port http://localhost:3001');
})