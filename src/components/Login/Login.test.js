import React from 'react';
import { shallow } from 'enzyme';
import { createShallow } from '@material-ui/core/test-utils';
import { loginUser } from 'utils/accountUtil/accountUtil';

import Login from './Login';

jest.mock('utils/accountUtil/accountUtil', () => ({
  loginUser: jest.fn()
}));

afterEach(() => {
  jest.resetAllMocks();
});

let component;
// let shallow;
beforeAll(() => {
  // shallow = createShallow({ dive: true });
  component = shallow(<Login />); //.dive();
});

describe('Login', () => {
  it('renders and matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('logs in user', () => {
    console.log(component.debug());
    component.find('WithStyles(ForwardRef(TextField))').at(0).getDOMNode().value = 'asd';
    // component.find('#login-password').get(0).value = 'asd'; // ('food');
    component.find('WithStyles(ForwardRef(Button))').simulate('click');
    expect(loginUser).toHaveBeenCalledWith({ email: 'david@lozzi.net', password: 'food' });
  });
});