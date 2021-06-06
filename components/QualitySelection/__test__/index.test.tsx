import { render } from '@testing-library/react';
import QualitySelection from '@/components/QualitySelection';

it('should render Quality Selection correctly', () => {
  const tree = render(<QualitySelection />);
  expect(tree).toMatchSnapshot();
});
