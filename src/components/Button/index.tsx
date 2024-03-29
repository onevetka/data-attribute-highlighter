import React, { MouseEventHandler } from 'react';
import cx from 'classnames';

// Assets
import styles from './style.module.scss';

interface ButtonProps {
  onClick?: MouseEventHandler;
  type?: 'button' | 'submit';
  disabled?: boolean;
  isPending?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  disabled,
  isPending,
  className,
}) => {
  return (
    <button
      // className={cx(styles.button, {
      //   [styles.disabled]: disabled,
      //   [styles.peniding]: isPending,
      // })}
      className={cx(styles.button, className)}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
