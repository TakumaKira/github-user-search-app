import ShallowRenderer from 'react-test-renderer/shallow';
import '../services/matchMedia.mock'; // Must be imported before importing files using ThemeContext or ThemeWrapper
import * as useResponsiveType from '../hooks/useResponsiveType';
import Stat from './Stat';
import Stats, { labels } from './Stats';
import styles from './Stats.module.sass';

it(`should render 3 Stat components`, () => {
  const repos = 1;
  const followers = 2;
  const following = 3;
  const renderer = ShallowRenderer.createRenderer();
  renderer.render(<Stats repos={repos} followers={followers} following={following} />);
  const result = renderer.getRenderOutput();
  const container = result.props;
  expect(container.children).toContainEqual(
    <Stat className={styles.repos} title={labels.REPOS} value={repos} />
  );
  expect(container.children).toContainEqual(
    <Stat className={styles.followers} title={labels.FOLLOWERS} value={followers} />
  );
  expect(container.children).toContainEqual(
    <Stat className={styles.following} title={labels.FOLLOWING} value={following} />
  );
});

it(`should pass className and data-responsive-type attribute to container`, () => {
  const mockUseResponsiveType = jest.spyOn(useResponsiveType, 'default');
  const responsiveType = useResponsiveType.ResponsiveType.Tablet;
  mockUseResponsiveType.mockReturnValue(responsiveType);
  const className = 'a';
  const renderer = ShallowRenderer.createRenderer();
  renderer.render(<Stats className={className} repos={1} followers={2} following={3} />);
  const result = renderer.getRenderOutput();
  expect(result.props.className.split(' ')).toContain(className);
  expect(result.props['data-responsive-type']).toBe(responsiveType);
});
