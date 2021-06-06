import { render } from '@testing-library/react';
import LoadingModal from '..';

it('should render Loading Modal correctly', () => {
  const tree = render(<LoadingModal />);
  expect(tree).toMatchSnapshot();
});
