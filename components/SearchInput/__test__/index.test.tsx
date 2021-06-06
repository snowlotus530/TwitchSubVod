import { render } from '@testing-library/react';
import SearchInput from '@/components/SearchInput';

describe('<SearchInput />', () => {
  it('should render Search Input correctly', () => {
    const wrapper = render(<SearchInput />);
    expect(wrapper).toMatchSnapshot();
  });
});
