import React from 'react';
import { shallow } from 'enzyme';
import Landing from './Landing';

afterEach(() => {
  jest.resetAllMocks();
});

let component;
beforeAll(() => {
  component = shallow(<Landing />);
});

describe('Landing', () => {
  it('renders and matches snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});