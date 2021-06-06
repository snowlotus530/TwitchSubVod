import { render } from '@testing-library/react';
import LinkBox from '..';

it('should render LinkBoxes correctly', () => {
  const tree = render(
    <>
      <LinkBox home />
      <LinkBox clips />
      <LinkBox vods />
      <LinkBox download />
      <LinkBox all />
    </>,
  );

  expect(tree).toMatchSnapshot();
});
