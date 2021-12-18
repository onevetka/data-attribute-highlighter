// Base
import React, { FormEvent, useState, useRef } from 'react';
import cx from 'classnames';
import FormValidator from './formValidator';
import debounce from 'lodash/debounce';

// Assets
import styles from './style.module.scss';

const debounceFunc = debounce((func) => func(), 1000);

interface ColorPickerProps {
  value?: string;
  disabled?: boolean;
  onChange?: Function;
  onFocus?: Function;
  onBlur?: Function;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange, disabled }) => {
  const [color, setColor] = useState<string | undefined>(value);
  // const [status, setStatus] = useState<InputStatus | undefined>(undefined);
  // const [statusText, setStatusText] = useState<string | undefined>(undefined);

  const {current: fieldId} = useRef("prefix-" + (Math.random().toString(36)+'00000000000000000').slice(2, 7));

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    onChange?.(value);
    // setStatus(undefined);
    // setStatusText(undefined);
    debounceFunc(() => {
      if (!FormValidator.isValidColor(value)) {
        // setStatus(InputStatus.error);
        // setStatusText('Invalid color');
        return;
      }
    });
    setColor(value);
  }

  const colorIndicator = (
    <label className={cx(styles.indicatorWrapper, {
      [styles.disabled]: disabled,
    })} htmlFor={fieldId}>
      <input
        className={styles.colorIndicator}
        id={fieldId}
        type="color"
        value={disabled ? 'black' : color}
        onChange={handleChange}
        disabled={disabled}
      />
    </label>
  );

  const colorInput = (
    <input
      onChange={handleChange}
      value={color}
      className={styles.colorPickerInput}
      placeholder="#FFFFFF"
      disabled={disabled}
    />
  )

  return (
    <div className={cx(styles.wrapper, {
      [styles.disabled]: disabled,
    })}>
      {colorInput}
      {colorIndicator}
    </div>
  );
};

export default ColorPicker;
