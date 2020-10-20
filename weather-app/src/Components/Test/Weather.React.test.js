import React from 'react';
import Weather from '../Weather';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer 
    .create(<Weather/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
});