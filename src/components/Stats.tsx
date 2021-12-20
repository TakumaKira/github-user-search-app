import useResponsiveType from '../hooks/useResponsiveType';
import Stat from './Stat';
import styles from './Stats.module.sass';

function Stats({repos, followers, following, className}: {repos: number | null, followers: number | null, following: number | null, className?: string}) {
  const responsiveType = useResponsiveType();

  return (
    <div
      className={`${styles.columnsContainer} ${className}`}
      data-responsive-type={responsiveType}
    >
      <Stat
        className={styles.repos}
        title='Repos'
        value={repos}
      />
      <Stat
        className={styles.followers}
        title='Followers'
        value={followers}
      />
      <Stat
        className={styles.following}
        title='Following'
        value={following}
      />
    </div>
  );
}

export default Stats;