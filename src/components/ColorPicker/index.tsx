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
import IconButton from '../IconButton';

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
    <label className={cx(styles.indicatorWrapper, {
      [styles.disabled]: disabled,
    })} htmlFor="colorPicker">
      <input
        className={styles.colorIndicator}
        id="colorPicker"
        type="color"
        value={disabled ? 'black' : color}
        onChange={(event: FormEvent<HTMLInputElement>) => {
          const value = event.currentTarget.value;
          handleChange(value);
        }}
        disabled={disabled}
      />
    </label>
  );

  return (
    <div className={cx(styles.wrapper, {
      [styles.disabled]: disabled,
    })}>
      <Input
      onChange={handleChange}
      value={color}
      className={styles.colorPickerInput}
      placeholder="#FFFFFF"
      disabled={disabled}
      status={status}
      // statusText={statusText}
    />
    {colorIndicator}
    </div>
  );
};

export default ColorPicker;
