import React from 'react';
import About from './About';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

describe('About', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<About />, div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(<About />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
