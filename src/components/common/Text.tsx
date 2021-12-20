import styles from './Text.module.sass';

function Text({ className, text, linkUrl, ...props }: { className: string, text: string, linkUrl?: string | null }) {
  return (linkUrl
    ? <a
        className={`${styles.link} ${className}`}
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