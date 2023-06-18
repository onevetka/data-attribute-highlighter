import React, { FocusEventHandler, FormEvent, ReactElement } from 'react';
import cx from 'classnames';

// Assets
import styles from './style.module.scss';
import { Status } from '../../core/status/domain/entity/status';

export enum InputStatus {
  'Default' = 'default',
  'Error' = 'error',
  // warning = 'warning',
  // approved = 'approved',
  // pending = 'pending',
}

const statusStylesMap = {
  [Status.Default]: undefined,
  [Status.Error]: styles.error,
  // [Status.warning]: styles.warning,
  // [Status.approved]: styles.approved,
  // [Status.pending]: styles.pending,
};

interface InputProps {
  className?: string;
  disabled?: boolean;
  label?: string;
  additionalIcon?: ReactElement;
  value?: string;
  placeholder?: string;
  maxLength?: number;
  status?: Status;
  statusText?: string;
  onChange?: Function;
  onFocus?: Function;
  onBlur?: FocusEventHandler<HTMLInputElement> ;
}

const Input: React.FC<InputProps> = ({
  className,
  label,
  value,
  additionalIcon,
  placeholder,
  onChange,
  onBlur,
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
    <div className={cx(styles.outerFieldWrapper, className)}>
      {label && (
        <div className={styles.label}>
          {label}
        </div>
      )}
      <div className={cx(
        styles.inputWrapper,
        status && statusStylesMap[status],
        {[styles.disabled]: disabled })}
      >
        <input
          className={cx(styles.input)}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={onBlur}
          disabled={disabled}
          maxLength={maxLength}
        />
        {additionalIcon && (
          <div className={styles.additionalIcon}>
            {additionalIcon}
          </div>
        )}
      </div>
      {status && (
      <span className={cx(styles.status, statusStylesMap[status])}>{statusText}</span>
    )}
    </div>
  );
};

export default Input;
