import { render } from '@testing-library/react';
import VodModal from '..';

it('should render Vod Modal correctly', () => {
  const tree = render(
    <VodModal videoUrl="https://www.youtube.com/watch?v=d1YBv2mWll0" />,
  );
  expect(tree).toMatchSnapshot();
});
