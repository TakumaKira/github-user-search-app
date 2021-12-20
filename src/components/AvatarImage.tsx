import styles from './AvatarImage.module.sass';
import Text from './common/Text';

const LOADING = 'Image Loding...';

function AvatarImage({src, size, className}: {src: string | null, size: number, className?: string}) {
  return (
    <div
      className={`${styles.wrapper} ${className}`}
      style={{height: size, width: size}}
    >
      {src
        ? <img
            className={styles.img}
            src={src}
            alt=""
          />
        : <Text
            className={styles.loading}
            text={LOADING}
          />            
      }
    </div>
  );
}

export default AvatarImage;