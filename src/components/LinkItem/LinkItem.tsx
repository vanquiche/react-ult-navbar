import styles from './LinkItem.module.css';

const LinkItem = ({ name, href }: { name: string; href: string }) => {
  return (
    <div className={styles.container}>
      <a
        className={styles.link}
        href={href}
        style={{ textOverflow: 'ellipsis' }}
      >
        {name}
      </a>
    </div>
  );
};

export default LinkItem;
