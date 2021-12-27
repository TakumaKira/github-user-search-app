import React from 'react';
import { labels } from '../config.json';
import { ThemeContext } from '../contexts/ThemeContext';
import useResponsiveType from '../hooks/useResponsiveType';
import Text from './common/Text';
import styles from './Stat.module.sass';

function Stat({title, value, className}: {title: string, value: number | null, className?: string}) {
  const { theme } = React.useContext(ThemeContext);
  const responsiveType = useResponsiveType();

  return (
    <div
      role='group'
      className={`${styles.rowsContainer} ${className || ''}`}
      data-responsive-type={responsiveType}
    >
      <Text
        className={styles.title}
        data-theme={theme}
        text={title}
      />
      <Text
        className={styles.value}
        data-theme={theme}
        text={value ? String(value) : labels.ZERO}
      />
    </div>
  );
}

export default Stat;