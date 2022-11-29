import styles from './LinkItem.module.css';

const LinkItem = ({ name, href }: { name: string; href: string }) => {
  return (
    <a className={styles.container} href={href}>
      {name}
    </a>
  );
};

export default LinkItem;
