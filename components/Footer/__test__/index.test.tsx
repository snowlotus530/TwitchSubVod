import { render } from '@testing-library/react';
import Footer from '..';

it('should render Footer correctly', () => {
  const tree = render(<Footer />);
  expect(tree).toMatchSnapshot();
});
