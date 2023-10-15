import React from 'react';
import styles from './style.module.scss';

const SkeletonAttributeList: React.FC = () => {
  return (
    <div className={styles.skeletonWrapper}>
      {[1.0, 0.7, 0.4].map((item) => (
        <div
          className={styles.skeletonItem}
          style={{ opacity: `${item}` }}
          key={item}
        />
      ))}
    </div>
  );
};

export default SkeletonAttributeList;
