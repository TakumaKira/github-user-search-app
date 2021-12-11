import styles from './Container.module.sass';

function Container(props: any) {
  return (
    <div className={styles.container}>
      {props.children}
    </div>
  );
}

export default Container;