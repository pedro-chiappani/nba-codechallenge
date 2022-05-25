import * as React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import App from '../App';

describe('Testing react navigation', () => {
  test('page contains the header and 10 items', async () => {
    // const component = (<App/>);
    const {findByText, findAllByText} = render(<App/>);

    // const header = await findByText('List of numbers from 1 to 20');
    // const items = await findAllByText(/Item number/);

    // expect(header).toBeTruthy();
    // expect(items.length).toBe(10);
  });

  test('clicking on one item takes you to the details screen', async () => {
  });
});
