import { labels } from '../config.json';
import Icon from './common/Icon';
import Text from './common/Text';
import styles from './Info.module.sass';

function Info({iconId, info, linkUrl}: {iconId: string, info: string | null, linkUrl?: string | null}) {
  return (
    <div
      role='group'
      className={`${styles.container} ${info ? '' : styles.disabled}`}
    >
      <Icon
        iconId={iconId}
        className={styles.icon}
      />
      <Text
        className={styles.text}
        text={info || labels.NOT_AVAILABLE}
        linkUrl={linkUrl}
      />
    </div>
  );
}

export default Info;