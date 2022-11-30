import styles from './LinkItem.module.css';

const LinkItem = ({ name, href }: { name: string; href: string }) => {
  return (
    <div>
      <a
        className={styles.container}
        href={href}
        style={{ textOverflow: 'ellipsis' }}
      >
        {name}
      </a>
    </div>
  );
};

export default LinkItem;
