import UserpageGithub from '../classes/userpageGithub';
import useResponsiveType from '../hooks/useResponsiveType';
import formatJoinedDate from '../services/formatJoinedDate';
import formatUsername from '../services/formatUsername';
import styles from './BaseInfos.module.sass';
import Text from './common/Text';

const NA = '';

function BaseInfos({name, username, joinedDate, hasColumns}: {name: string | null, username: string | null, joinedDate: Date | null, hasColumns?: boolean}) {
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
          text={joinedDate ? formatJoinedDate(joinedDate) : NA}
        />
      </div>
      <Text
        className={styles.username}
        data-responsive-type={responsiveType}
        text={username ? formatUsername(username) : NA}
        linkUrl={username ? new UserpageGithub(username).getUrl() : null}
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
        linkUrl={username ? new UserpageGithub(username).getUrl() : null}
      />
      <Text
        className={styles.joinedDate}
        data-responsive-type={responsiveType}
        text={joinedDate ? formatJoinedDate(joinedDate) : NA}
      />
    </div>
  );
}

export default BaseInfos;