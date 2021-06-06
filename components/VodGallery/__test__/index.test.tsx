import { render } from '@testing-library/react';
import VodGallery from '..';
import data from './data.json';

it('should render Vod Gallery correctly', () => {
  const tree = render(<VodGallery data={data.videos} quality="chunked" />);
  expect(tree).toMatchSnapshot();
});
