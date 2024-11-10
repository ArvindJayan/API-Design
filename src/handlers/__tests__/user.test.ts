import * as user from '../user';

describe('User Handler', () => {
    it('should create a user', async () => {
        const req = { body: { username: 'test1', password: 'test1' } };
        const res = {
            json({ token }) {
                expect(token).toBeTruthy();
            }
        }
        await user.signUp(req, res, () => { });
    });
});