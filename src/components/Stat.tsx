import styles from './Stat.module.sass';

function Stat({title, value}: {title: string, value: number | null}) {
  return (
    <div className={styles.rowsContainer}>
      <span>{title}</span>
      <span>{value}</span>
    </div>
  );
}

export default Stat;