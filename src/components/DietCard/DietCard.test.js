import React from 'react';
import { shallow } from 'enzyme';

import DietCard from './DietCard';

describe('DietCard', () => {
  let component;
  beforeAll(() => {
    component = shallow(<DietCard diet={{
      title: 'Whole 30',
      description: 'A good description',
      restricted: 2,
      allowed: 2
    }}
    />);
  });

  it('renders and matches the snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});