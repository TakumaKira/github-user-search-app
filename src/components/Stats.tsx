import Stat from './Stat';
import styles from './Stats.module.sass'

function Stats({repos, followers, following}: {repos: number | null, followers: number | null, following: number | null}) {
  return (
    <div className={styles.columnsContainer}>
      <Stat title='Repos' value={repos} />
      <Stat title='Followers' value={followers} />
      <Stat title='Following' value={following} />
    </div>
  );
}

export default Stats;