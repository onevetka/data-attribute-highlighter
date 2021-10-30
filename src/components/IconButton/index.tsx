import React, { MouseEventHandler } from 'react';
// import cx from 'classnames';

// Assets
import styles from './style.module.scss';

interface IconButtonProps {
  onClick?: MouseEventHandler;
  type?: 'button' | 'submit';
  disabled?: boolean;
  isPending?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
  children,
  onClick,
  type = 'button',
  disabled,
  isPending,
}) => {
  return (
    <button
      // className={cx(styles.button, {
      //   [styles.disabled]: disabled,
      //   [styles.peniding]: isPending,
      // })}
      className={styles.button}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default IconButton;
