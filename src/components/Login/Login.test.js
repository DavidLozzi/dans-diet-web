import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { loginUser } from 'utils/loginUtil/loginUtil';

import Login from './Login';

jest.mock('utils/loginUtil/loginUtil', () => {
  loginUser: jest.fn()
});

afterEach(() => {
  jest.resetAllMocks();
});

let component;
let shallow;
beforeAll(() => {
  shallow = createShallow();
  component = shallow(<Login />);
});

describe('Login', () => {
  it('renders and matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('logs in user', () => {
    component.find('#login-email').text('david@lozzi.net');
    component.find('#login-password').text('food');
    component.find('Button').simulate('click');
    expect(loginUser).toHaveBeenCalledWith({ email: 'david@lozzi.net', password: 'food' });
  });
});