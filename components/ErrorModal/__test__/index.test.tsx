import { render } from '@testing-library/react';
import ErrorModal from '@/components/ErrorModal';

it('should render Error Modal correctly', () => {
  const tree = render(
    <ErrorModal message="The user you just searched doesn't exist" />,
  );
  expect(tree).toMatchSnapshot();
});
