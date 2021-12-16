import styles from './AvatarImage.module.sass';

function AvatarImage({src, size}: {src: string | null, size: number}) {
  return (
    <div
      className={styles.wrapper}
      style={{height: size, width: size}}
    >
      {src
        ? <img
            className={styles.img}
            src={src}
            alt=""
          />
        : <span
            className={styles.loading}
          >
            Image Loding...
          </span>
      }
    </div>
  );
}

export default AvatarImage;