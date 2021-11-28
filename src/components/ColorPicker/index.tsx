// Base
import React, { FormEvent, useState } from 'react';
import cx from 'classnames';
import FormValidator from './formValidator';
import debounce from 'lodash/debounce';

const debounceFunc = debounce((func) => func(), 1000);

// Components
import Input, { InputStatus } from '../Input';

// Assets
import styles from './style.module.scss';

interface ColorPickerProps {
  value?: string;
  disabled?: boolean;
  onChange?: Function;
  onFocus?: Function;
  onBlur?: Function;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange, disabled }) => {
  const [color, setColor] = useState<string | undefined>(value);
  const [status, setStatus] = useState<InputStatus | undefined>(undefined);
  // const [statusText, setStatusText] = useState<string | undefined>(undefined);

  const handleChange = (value: string) => {
    onChange?.(value);
    setStatus(undefined);
    // setStatusText(undefined);
    debounceFunc(() => {
      if (!FormValidator.isValidColor(value)) {
        setStatus(InputStatus.error);
        // setStatusText('Invalid color');
        return;
      }
    });
    setColor(value);
  }

  const colorIndicator = (
    <input
      type="color"
      value={color}
      onChange={(event: FormEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        handleChange(value);
      }}
      style={disabled ? undefined : { backgroundColor: color }}
      className={cx(styles.colorIndicator, {
        [styles.disabled]: disabled,
      })}
    />);

  return (
    <Input
      onChange={handleChange}
      value={color}
      className={styles.colorPicker}
      placeholder="#FFFFFF"
      additionalIcon={colorIndicator}
      disabled={disabled}
      status={status}
      // statusText={statusText}
    />
  );
};

export default ColorPicker;
