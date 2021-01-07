import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import App from '../App';

test('Should be able to search deleted clips', async () => {
  const { getByPlaceholderText, getByLabelText } = render(<App />);

  fireEvent.click(getByLabelText('DeletedClips'));

  fireEvent.change(getByPlaceholderText('Vod ID'), {
    target: { value: '41194530526' },
  });
  fireEvent.change(getByLabelText('startingM'), { target: { value: '25' } });
  fireEvent.change(getByLabelText('endingM'), { target: { value: '26' } });

  fireEvent.click(getByLabelText('submit'));

  expect(getByPlaceholderText('Vod ID').value).toBe('41194530526');
  expect(getByLabelText('startingM').value).toBe('25');
  expect(getByLabelText('endingM').value).toBe('26');
  expect(getByLabelText('endingM').value).not.toBe('30');
});
