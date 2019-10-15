import { loginUser } from './accountUtil';

jest.mock('axios', () => {
  post: jest.fn()
});

describe('accountUtil', () => {
  it('loginUser', async () => {
    expect(await loginUser('email@lozzi.net', 'password')).toEqual(true);
  });
});