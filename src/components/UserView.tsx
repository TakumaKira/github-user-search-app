import React from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { UserContext } from '../contexts/UserContext';
import useResponsiveType, { ResponsiveType } from '../hooks/useResponsiveType';
import User from '../types/user';
import AvatarImage from './AvatarImage';
import Text from './common/Text';
import Infos from './Infos';
import Stats from './Stats';
import styles from './UserView.module.sass';

const NA = 'N/A';
const NO_BIO = 'This profile has no bio';

const UserViewMobile = (user: User): JSX.Element =>
  <div className={styles.rowsContainer}>
    <div className={styles.infoContainerTablet}>
      <AvatarImage
        src={user.avatarUrl}
        size={70}
      />
      <div className={styles.baseInfoContainerTablet}>
        <Text
          className={styles.name}
          text={user.name || NA}
        />
        <Text
          className={styles.username}
          text={user.username || NA}
        />
        <Text
          className={styles.joinedDate}
          text={user.joinedDate ? getJoinedDate(user.joinedDate) : NA}
        />
      </div>
    </div>
    <Text
      className={styles.bio}
      text={user.bio || NO_BIO}
    />
    <Stats
      repos={user.repos}
      followers={user.followers}
      following={user.following}
    />
    <Infos
      location={user.location}
      blogUrl={user.blogUrl}
      twitterUsername={user.twitterUsername}
      company={user.company}
      hasColumns={false}
    />
  </div>;

const UserViewTablet = (user: User): JSX.Element =>
  <div className={styles.rowsContainer}>
    <div className={styles.infoContainerTablet}>
      <AvatarImage
        src={user.avatarUrl}
        size={117}
      />
      <div className={styles.baseInfoContainerTablet}>
        <Text
          className={styles.name}
          text={user.name || NA}
        />
        <Text
          className={styles.username}
          text={user.username || NA}
        />
        <Text
          className={styles.joinedDate}
          text={user.joinedDate ? getJoinedDate(user.joinedDate) : NA}
        />
      </div>
    </div>
    <Text
      className={styles.bio}
      text={user.bio || NO_BIO}
    />
    <Stats
      repos={user.repos}
      followers={user.followers}
      following={user.following}
    />
    <Infos
      location={user.location}
      blogUrl={user.blogUrl}
      twitterUsername={user.twitterUsername}
      company={user.company}
      hasColumns={true}
    />
  </div>;

const UserViewDesktop = (user: User): JSX.Element =>
  <div className={styles.columnsContainer}>
    <AvatarImage
      src={user.avatarUrl}
      size={117}
    />
    <div className={styles.infoContainerDesktop}>
      <div className={styles.baseInfoContainerDesktop}>
        <div className={styles.namesContainer}>
          <Text
            className={styles.name}
            text={user.name || NA}
          />
          <Text
            className={styles.username}
            text={user.username || NA}
          />
        </div>
        <Text
          className={styles.joinedDate}
          text={user.joinedDate ? getJoinedDate(user.joinedDate) : NA}
        />
      </div>
      <Text
        className={styles.bio}
        text={user.bio || NO_BIO}
      />
      <Stats
        repos={user.repos}
        followers={user.followers}
        following={user.following}
      />
      <Infos
        location={user.location}
        blogUrl={user.blogUrl}
        twitterUsername={user.twitterUsername}
        company={user.company}
        hasColumns={true}
      />
    </div>
  </div>;

function getJoinedDate(date: Date): string {
  return `Joined ${dateFormatter(date)}`;
}

function dateFormatter(date: Date): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
}

function getUserView(user: User, responsiveType: ResponsiveType): JSX.Element {
  switch (responsiveType) {
    case ResponsiveType.Mobile:
      return UserViewMobile(user);
    case ResponsiveType.Tablet:
      return UserViewTablet(user);
    case ResponsiveType.Desktop:
      return UserViewDesktop(user);
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
      {getUserView(user, responsiveType)}
    </div>
  );
}

export default UserView;
