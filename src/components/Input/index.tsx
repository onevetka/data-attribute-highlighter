import React, { FormEvent, ReactElement } from 'react';
import cx from 'classnames';

// Assets
import styles from './style.module.scss';

export enum InputStatus {
  error = 'error',
  // warning = 'warning',
  // approved = 'approved',
  // pending = 'pending',
}

const statusStylesMap = {
  [InputStatus.error]: styles.error,
  // [InputStatus.warning]: styles.warning,
  // [InputStatus.approved]: styles.approved,
  // [InputStatus.pending]: styles.pending,
};

interface InputProps {
  className?: string;
  disabled?: boolean;
  label?: string;
  additionalIcon?: ReactElement;
  value?: string;
  placeholder?: string;
  maxLength?: number;
  status?: InputStatus;
  statusText?: string;
  onChange?: Function;
  onFocus?: Function;
  onBlur?: Function;
}

const Input: React.FC<InputProps> = ({
  className,
  label,
  value,
  additionalIcon,
  placeholder,
  onChange,
  disabled,
  maxLength,
  status,
  statusText,
}) => {
  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    onChange?.(value);
  };

  return (
    <div className={styles.outerFieldWrapper}>
      {label && (
        <div className={styles.label}>
          {label}
        </div>
      )}
      <div className={cx(styles.inputWrapper, className)}>
        <input
          className={cx(styles.input, status && statusStylesMap[status])}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          disabled={disabled}
          maxLength={maxLength}
        />
        {additionalIcon && (
          <div className={styles.additionalIcon}>
            {additionalIcon}
          </div>
        )}
      </div>
      {/* {status && (
      <span className={cx(styles.status, statusStylesMap[status])}>{statusText}</span>
    )} */}
    </div>
  );
};

export default Input;
