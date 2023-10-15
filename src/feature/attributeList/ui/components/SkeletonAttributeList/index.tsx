import React from 'react';
import styles from './style.module.scss';

const EmptyAttributeList: React.FC = () => {
  return (
    <div className={styles.skeletonWrapper}>
      {[1.0, 0.7, 0.4].map((item) => (
        <div
          className={styles.skeletonItem}
          style={{ opacity: `${item}` }}
          key={item}
        />
      ))}
      <div className={styles.label}>No highlighted attributes</div>
    </div>
  );
};

export default EmptyAttributeList;
