import useResponsiveType from '../hooks/useResponsiveType';
import formatUsername from '../services/formatUsername';
import getUserpage, { AccountType } from '../services/getUserpage';
import styles from './BaseInfos.module.sass';
import Text from './common/Text';

const NA = '';

function getJoinedDate(date: Date): string {
  return `Joined ${formatDate(date)}`;
}

function formatDate(date: Date): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function BaseInfos({name, username, joinedDate, hasColumns}: {name: string | null, username: string | null, joinedDate: Date | null, hasColumns: boolean}) {
  const responsiveType = useResponsiveType();

  return hasColumns ? (
    <div className={styles.row}>
      <div className={styles.nameAndDateContainer}>
        <Text
          className={styles.name}
          data-responsive-type={responsiveType}
          text={name || NA}
        />
        <Text
          className={styles.joinedDate}
          data-responsive-type={responsiveType}
          text={joinedDate ? getJoinedDate(joinedDate) : NA}
        />
      </div>
      <Text
        className={styles.username}
        data-responsive-type={responsiveType}
        text={username ? formatUsername(username) : NA}
        linkUrl={username ? getUserpage(username, AccountType.Github) : null}
      />
    </div>
  ) : (
    <div className={styles.row}>
      <Text
        className={styles.name}
        data-responsive-type={responsiveType}
        text={name || NA}
      />
      <Text
        className={styles.username}
        data-responsive-type={responsiveType}
        text={username ? formatUsername(username) : NA}
        linkUrl={username ? getUserpage(username, AccountType.Github) : null}
      />
      <Text
        className={styles.joinedDate}
        data-responsive-type={responsiveType}
        text={joinedDate ? getJoinedDate(joinedDate) : NA}
      />
    </div>
  );
}

export default BaseInfos;