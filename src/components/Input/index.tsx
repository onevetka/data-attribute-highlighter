import React, { FormEvent } from 'react';
// import cx from 'classnames';

// Assets
import './style.scss';

export enum InputStatus {
  error = 'error',
  // warning = 'warning',
  // approved = 'approved',
  // pending = 'pending',
}

const statusStylesMap = {
  // [InputStatus.error]: styles.error,
  // [InputStatus.warning]: styles.warning,
  // [InputStatus.approved]: styles.approved,
  // [InputStatus.pending]: styles.pending,
};

interface InputProps {
  disabled?: boolean;
  value?: string;
  placeholder?: string;
  status?: InputStatus;
  statusText?: string;
  onChange?: Function;
  onFocus?: Function;
  onBlur?: Function;
}

const Input: React.FC<InputProps> = ({
  value,
  placeholder,
  onChange,
  disabled,
  status,
  statusText,
}) => {
  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    onChange && onChange(value);
  };

  return (
    // <div className={styles.inputWrapper}>
    <input
      // className={cx(styles.input, status && statusStylesMap[status])}
      className="input"
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      disabled={disabled}
    ></input>
    /* {status ? (
      <span className={cx(styles.status, statusStylesMap[status])}>{statusText}</span>
    ) : null} */
    // </div>
  );
};

export default Input;
