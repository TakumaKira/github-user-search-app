import styles from './Text.module.sass';

function Text({ text, className, linkUrl, ...props }: { text: string, className?: string, linkUrl?: string | null }) {
  return (linkUrl
    ? <a
        className={`${styles.link} ${className || ''}`}
        {...props}
        href={linkUrl}
        target='_blank'
        rel='noreferrer'
      >
        {text}
      </a>
    : <span
        className={className}
        {...props}
      >
        {text}
      </span>
  );
}

export default Text;