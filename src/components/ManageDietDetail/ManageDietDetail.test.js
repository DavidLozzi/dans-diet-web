import React from 'react';
import { shallow } from 'enzyme';

import ManageDietDetail, { actions } from './ManageDietDetail';

describe('ManageDietDetail', () => {
  const baseProps = {
    onSave: jest.fn(),
    onCancel: jest.fn()
  };
  const props = {
    action: actions.add,
    ...baseProps
  };
  const editProps = {
    action: actions.edit,
    ...baseProps
  };

  let component;
  let editComponent;
  beforeEach(() => {
    component = shallow(<ManageDietDetail {...props} />);
    editComponent = shallow(<ManageDietDetail {...editProps} />);
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('renders and matches snapshot', () => {
    expect(component.debug()).toMatchSnapshot();
  });

  it('shows the right action', () => {
    expect(component.find('[variant="h5"]').text()).toEqual(`${props.action} Diet`);
    expect(component.find('.makeStyles-button-1').text()).toEqual(`${props.action} Diet`);

    expect(editComponent.find('[variant="h5"]').text()).toEqual(`${editProps.action} Diet`);
    expect(editComponent.find('.makeStyles-button-1').text()).toEqual(`${editProps.action} Diet`);
  });

  it('saves', () => {
    component.find('.makeStyles-button-1').simulate('click');
    expect(props.onSave).toHaveBeenCalled();
    expect(props.onCancel).not.toHaveBeenCalled();
  });

  it('cancels', () => {
    const component1 = shallow(<ManageDietDetail {...props} />);
    component1.setState({ detailTitle: '' });
    component1.find('WithStyles(ForwardRef(Button))').at(1).simulate('click');
    console.log(component.state());
    expect(props.onCancel).toHaveBeenCalled();
    expect(props.onSave).not.toHaveBeenCalled();
  });
});