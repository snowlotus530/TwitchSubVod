import { render } from '@testing-library/react';
import InfoModal from '..';

it('should render Info Modal correctly', () => {
  const tree = render(<InfoModal />);
  expect(tree).toMatchSnapshot();
});
