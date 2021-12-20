import React from 'react';
import { ThemeContext, ThemeType } from '../contexts/ThemeContext';
import { UserContext } from '../contexts/UserContext';
import useResponsiveType, { ResponsiveType } from '../hooks/useResponsiveType';
import User from '../types/user';
import AvatarImage from './AvatarImage';
import BaseInfos from './BaseInfos';
import Text from './common/Text';
import Infos from './Infos';
import Stats from './Stats';
import styles from './UserView.module.sass';

const NO_BIO = 'This profile has no bio';

const UserViewMobile = (user: User, theme: ThemeType): JSX.Element =>
  <div
    className={styles.mainContainer}
    data-responsive-type={ResponsiveType.Mobile}
  >
    <div
      className={styles.subContainer}
      data-responsive-type={ResponsiveType.Mobile}
    >
      <AvatarImage
        src={user.avatarUrl}
        size={70}
        className={styles.avatar}
      />
      <BaseInfos
        name={user.name}
        username={user.username}
        joinedDate={user.joinedDate}
        hasColumns={false}
      />
    </div>
    <Text
      className={styles.bio}
      data-theme={theme}
      data-responsive-type={ResponsiveType.Mobile}
      text={user.bio || NO_BIO}
    />
    <Stats
      className={styles.stats}
      repos={user.repos}
      followers={user.followers}
      following={user.following}
    />
    <Infos
      className={styles.infos}
      location={user.location}
      blogUrl={user.blogUrl}
      twitterUsername={user.twitterUsername}
      company={user.company}
      hasColumns={false}
    />
  </div>;

const UserViewTablet = (user: User, theme: ThemeType): JSX.Element =>
  <div
    className={styles.mainContainer}
    data-responsive-type={ResponsiveType.Tablet}
  >
    <div
      className={styles.subContainer}
      data-responsive-type={ResponsiveType.Tablet}
    >
      <AvatarImage
        src={user.avatarUrl}
        size={117}
        className={styles.avatar}
      />
      <BaseInfos
        name={user.name}
        username={user.username}
        joinedDate={user.joinedDate}
        hasColumns={false}
      />
    </div>
    <Text
      className={styles.bio}
      data-theme={theme}
      text={user.bio || NO_BIO}
    />
    <Stats
      className={styles.stats}
      repos={user.repos}
      followers={user.followers}
      following={user.following}
    />
    <Infos
      className={styles.infos}
      location={user.location}
      blogUrl={user.blogUrl}
      twitterUsername={user.twitterUsername}
      company={user.company}
      hasColumns={true}
    />
  </div>;

const UserViewDesktop = (user: User, theme: ThemeType): JSX.Element =>
  <div
    className={styles.mainContainer}
    data-responsive-type={ResponsiveType.Desktop}
  >
    <AvatarImage
      src={user.avatarUrl}
      size={117}
      className={styles.avatar}
    />
    <div
      className={styles.subContainer}
      data-responsive-type={ResponsiveType.Desktop}
    >
      <BaseInfos
        name={user.name}
        username={user.username}
        joinedDate={user.joinedDate}
        hasColumns={true}
      />
      <Text
        className={styles.bio}
        data-theme={theme}
        text={user.bio || NO_BIO}
      />
      <Stats
        className={styles.stats}
        repos={user.repos}
        followers={user.followers}
        following={user.following}
      />
      <Infos
        className={styles.infos}
        location={user.location}
        blogUrl={user.blogUrl}
        twitterUsername={user.twitterUsername}
        company={user.company}
        hasColumns={true}
      />
    </div>
  </div>;

function getUserView(user: User, responsiveType: ResponsiveType, theme: ThemeType): JSX.Element {
  switch (responsiveType) {
    case ResponsiveType.Mobile:
      return UserViewMobile(user, theme);
    case ResponsiveType.Tablet:
      return UserViewTablet(user, theme);
    case ResponsiveType.Desktop:
      return UserViewDesktop(user, theme);
    default:
      throw new Error(`Undefined ResponsiveType: ${responsiveType}`);
  }
}

function UserView() {
  const { theme } = React.useContext(ThemeContext);
  const { user } = React.useContext(UserContext);
  const responsiveType = useResponsiveType();

  return (
    <div
      data-theme={theme}
      className={styles.container}
    >
      {getUserView(user, responsiveType, theme)}
    </div>
  );
}

export default UserView;
