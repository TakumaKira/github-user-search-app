import styles from './AvatarImage.module.sass';

function AvatarImage({src, size, className}: {src: string | null, size: number, className?: string}) {
  return (
    <div
      role='group'
      className={`${styles.wrapper} ${className || ''}`}
      style={{height: size, width: size}}
    >
      {src && 
        <img
          className={styles.img}
          src={src}
          alt=''
        />           
      }
    </div>
  );
}

export default AvatarImage;