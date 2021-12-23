import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import '../services/matchMedia.mock'; // Must be imported before importing files using ThemeContext or ThemeWrapper
import { ThemeType } from '../contexts/ThemeContext';
import * as useResponsiveType from '../hooks/useResponsiveType';
import { ResponsiveType } from '../hooks/useResponsiveType';
import User, { nullUser } from '../interfaces/user';
import AvatarImage from './AvatarImage';
import BaseInfos from './BaseInfos';
import Text from './common/Text';
import Infos from './Infos';
import Stats from './Stats';
import UserView, { avatarSizes, undefinedResponsiveTypeError } from './UserView';
import styles from './UserView.module.sass';

let realUseContext: <T>(context: React.Context<T>) => T;
let mockUseContext: jest.Mock<any, any>;
beforeEach(() => {
    realUseContext = React.useContext;
    mockUseContext = React.useContext = jest.fn();
});
afterEach(() => {
    React.useContext = realUseContext;
});

it(`should render AvatarImage, BaseInfos, Text with bio, Stats and Infos components when responsive type is mobile`, () => {
  const mockUseResponsiveType = jest.spyOn(useResponsiveType, 'default');
  const responsiveType = useResponsiveType.ResponsiveType.Mobile;
  mockUseResponsiveType.mockReturnValue(responsiveType);

  const theme = ThemeType.Light;
  const user: User = {
    avatarUrl: 'avatarUrl',
    name: 'name',
    username: 'username',
    joinedDate: new Date(0),
    bio: 'bio',
    repos: 1,
    followers: 2,
    following: 3,
    location: 'location',
    blogUrl: 'blogUrl',
    twitterUsername: 'twitterUsername',
    company: 'company'
  };
  mockUseContext.mockReturnValue({ theme, user });

  const renderer = ShallowRenderer.createRenderer();
  renderer.render(<UserView />);
  const result = renderer.getRenderOutput();
  const mainContainer = result.props.children.props;
  const subContainer = mainContainer.children[0].props;
  expect(subContainer.children).toContainEqual(
    <AvatarImage src={user.avatarUrl} size={avatarSizes.MOBILE} className={styles.avatar} />
  );
  expect(subContainer.children).toContainEqual(
    <BaseInfos name={user.name} username={user.username} joinedDate={user.joinedDate} />
  );
  expect(mainContainer.children).toContainEqual(
    <Text className={styles.bio} data-theme={theme} data-responsive-type={responsiveType} text={user.bio!} />
  );
  expect(mainContainer.children).toContainEqual(
    <Stats className={styles.stats} repos={user.repos} followers={user.followers} following={user.following} />
  );
  expect(mainContainer.children).toContainEqual(
    <Infos className={styles.infos} location={user.location} blogUrl={user.blogUrl} twitterUsername={user.twitterUsername} company={user.company} />
  );
});

it(`should render AvatarImage, BaseInfos, Text with bio, Stats and Infos components when responsive type is tablet`, () => {
  const mockUseResponsiveType = jest.spyOn(useResponsiveType, 'default');
  const responsiveType = useResponsiveType.ResponsiveType.Tablet;
  mockUseResponsiveType.mockReturnValue(responsiveType);

  const theme = ThemeType.Light;
  const user: User = {
    avatarUrl: 'avatarUrl',
    name: 'name',
    username: 'username',
    joinedDate: new Date(0),
    bio: 'bio',
    repos: 1,
    followers: 2,
    following: 3,
    location: 'location',
    blogUrl: 'blogUrl',
    twitterUsername: 'twitterUsername',
    company: 'company'
  };
  mockUseContext.mockReturnValue({ theme, user });

  const renderer = ShallowRenderer.createRenderer();
  renderer.render(<UserView />);
  const result = renderer.getRenderOutput();
  const mainContainer = result.props.children.props;
  const subContainer = mainContainer.children[0].props;
  expect(subContainer.children).toContainEqual(
    <AvatarImage src={user.avatarUrl} size={avatarSizes.TABLET} className={styles.avatar} />
  );
  expect(subContainer.children).toContainEqual(
    <BaseInfos name={user.name} username={user.username} joinedDate={user.joinedDate} />
  );
  expect(mainContainer.children).toContainEqual(
    <Text className={styles.bio} data-theme={theme} data-responsive-type={responsiveType} text={user.bio!} />
  );
  expect(mainContainer.children).toContainEqual(
    <Stats className={styles.stats} repos={user.repos} followers={user.followers} following={user.following} />
  );
  expect(mainContainer.children).toContainEqual(
    <Infos className={styles.infos} location={user.location} blogUrl={user.blogUrl} twitterUsername={user.twitterUsername} company={user.company} hasColumns={true} />
  );
});

it(`should render AvatarImage, BaseInfos, Text with bio, Stats and Infos components when responsive type is desktop`, () => {
  const mockUseResponsiveType = jest.spyOn(useResponsiveType, 'default');
  const responsiveType = useResponsiveType.ResponsiveType.Desktop;
  mockUseResponsiveType.mockReturnValue(responsiveType);

  const theme = ThemeType.Light;
  const user: User = {
    avatarUrl: 'avatarUrl',
    name: 'name',
    username: 'username',
    joinedDate: new Date(0),
    bio: 'bio',
    repos: 1,
    followers: 2,
    following: 3,
    location: 'location',
    blogUrl: 'blogUrl',
    twitterUsername: 'twitterUsername',
    company: 'company'
  };
  mockUseContext.mockReturnValue({ theme, user });

  const renderer = ShallowRenderer.createRenderer();
  renderer.render(<UserView />);
  const result = renderer.getRenderOutput();
  const mainContainer = result.props.children.props;
  const subContainer = mainContainer.children[1].props;
  expect(mainContainer.children).toContainEqual(
    <AvatarImage src={user.avatarUrl} size={avatarSizes.DESKTOP} className={styles.avatar} />
  );
  expect(subContainer.children).toContainEqual(
    <BaseInfos name={user.name} username={user.username} joinedDate={user.joinedDate} hasColumns={true} />
  );
  expect(subContainer.children).toContainEqual(
    <Text className={styles.bio} data-theme={theme} data-responsive-type={responsiveType} text={user.bio!} />
  );
  expect(subContainer.children).toContainEqual(
    <Stats className={styles.stats} repos={user.repos} followers={user.followers} following={user.following} />
  );
  expect(subContainer.children).toContainEqual(
    <Infos className={styles.infos} location={user.location} blogUrl={user.blogUrl} twitterUsername={user.twitterUsername} company={user.company} hasColumns={true} />
  );
});

it(`should pass data-theme attribute to container`, () => {
  const mockUseResponsiveType = jest.spyOn(useResponsiveType, 'default');
  const responsiveType = useResponsiveType.ResponsiveType.Tablet;
  mockUseResponsiveType.mockReturnValue(responsiveType);

  const theme = ThemeType.Light;
  mockUseContext.mockReturnValue({ theme, user: nullUser });

  const renderer = ShallowRenderer.createRenderer();
  renderer.render(<UserView />);
  const result = renderer.getRenderOutput();
  const container = result.props;
  expect(container['data-theme']).toBe(theme);
});

it(`should pass data-responsive-type attribute to mainContainer and subcontainer`, () => {
  const mockUseResponsiveType = jest.spyOn(useResponsiveType, 'default');
  const responsiveType = useResponsiveType.ResponsiveType.Tablet;
  mockUseResponsiveType.mockReturnValue(responsiveType);

  const theme = ThemeType.Light;
  mockUseContext.mockReturnValue({ theme, user: nullUser });

  const renderer = ShallowRenderer.createRenderer();
  renderer.render(<UserView />);
  const result = renderer.getRenderOutput();
  const mainContainer = result.props.children.props;
  expect(mainContainer['data-responsive-type']).toBe(responsiveType);
  const subContainer = mainContainer.children[1].props;
  expect(subContainer['data-responsive-type']).toBe(responsiveType);
});

it(`should not throw if UserView is defined for the ResponsiveType`, () => {
  for (const responsiveType of Object.values(useResponsiveType.ResponsiveType)) {
    const mockUseResponsiveType = jest.spyOn(useResponsiveType, 'default');
    mockUseResponsiveType.mockReturnValue(responsiveType);
  
    const theme = ThemeType.Light;
    mockUseContext.mockReturnValue({ theme, user: nullUser });
  
    const renderer = ShallowRenderer.createRenderer();
    expect(() => renderer.render(<UserView />)).not.toThrow();
  }
});

it(`should throw if UserView is not defined for the ResponsiveType`, () => {
  const mockUseResponsiveType = jest.spyOn(useResponsiveType, 'default');
  const responsiveType = 'a' as ResponsiveType;
  mockUseResponsiveType.mockReturnValue(responsiveType);

  const theme = ThemeType.Light;
  mockUseContext.mockReturnValue({ theme, user: nullUser });

  const renderer = ShallowRenderer.createRenderer();
  expect(() => renderer.render(<UserView />)).toThrow(undefinedResponsiveTypeError(responsiveType));
});
