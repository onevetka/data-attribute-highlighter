import React, { MouseEventHandler } from 'react';
// import cx from 'classnames';

// Assets
import './style.scss';

interface ButtonProps {
  onClick?: MouseEventHandler;
  type?: 'button' | 'submit';
  disabled?: boolean;
  isPending?: boolean;
}

const Button: React.FC<ButtonProps> = ({
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
      className="button"
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;