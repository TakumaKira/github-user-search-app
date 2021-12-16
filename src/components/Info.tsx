import Icon from './common/Icon';
import styles from './Info.module.sass';

const NOT_AVAILABLE = 'Not Available';

function Info({iconId, info}: {iconId: string, info: string | null}) {
  return (
    <div>
      <Icon
        iconId={iconId}
        className={styles.icon}
      />
      <span>{info || NOT_AVAILABLE}</span>
    </div>
  );
}

export default Info;