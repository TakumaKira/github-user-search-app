import { render } from '@testing-library/react';
import './services/matchMedia.mock'; // Must be imported before importing files using ThemeContext or ThemeWrapper
import App from './App';
import { avatarSizes } from './components/UserView';
import { iconIds, title } from './config.json';
import * as useResponsiveType from './hooks/useResponsiveType';
import getIconUrl from './services/getIconUrl';

it(`should render background, container, Header, SearchBox and Userview`, () => {
  const mockUseResponsiveType = jest.spyOn(useResponsiveType, 'default');
  const responsiveType = useResponsiveType.ResponsiveType.Desktop;
  mockUseResponsiveType.mockReturnValue(responsiveType);

  const result = render(<App />);
  const app = result.container;
  const background = app.children[0];
  expect(background).toBeInTheDocument();
  const container = background.children[0];
  expect(container).toBeInTheDocument();
  const Header = container.children[0];
  expect(Header).toBeInTheDocument();
  const titleElem = Header.children[0];
  expect(titleElem.textContent).toBe(title);
  const SearchBox = container.children[1];
  expect(SearchBox).toBeInTheDocument();
  const svg = SearchBox.children[0];
  const use = svg.children[0];
  expect(use.getAttributeNS('http://www.w3.org/1999/xlink', 'href')).toBe(getIconUrl(iconIds.Search));
  const UserView = container.children[2];
  expect(UserView).toBeInTheDocument();
  const UserViewMainContainerDesktop = UserView.children[0];
  const AvatarImage = UserViewMainContainerDesktop.children[0] as HTMLDivElement;
  expect(AvatarImage.style.height).toBe(`${avatarSizes.DESKTOP}px`);
  expect(AvatarImage.style.height === AvatarImage.style.width).toBe(true);
  // TODO: Needs more concise way to check existance of each child component. Introduce enzyme and use dive?
});
