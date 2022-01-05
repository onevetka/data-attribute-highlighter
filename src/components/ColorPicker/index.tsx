// Base
import React from 'react';
import cx from 'classnames';
import { InputStatus } from '../Input';

// Assets
import styles from './style.module.scss';
import useController from './useController';

interface ColorPickerProps {
  value?: string;
  disabled?: boolean;
  onChange?: Function;
  onFocus?: Function;
  onBlur?: Function;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange, disabled }) => {
  const { state, handleChangeInput, handleChangePicker } = useController(onChange);
  const { fieldId, status } = state;

  const colorIndicator = (
    <label className={cx(styles.indicatorWrapper, {
      [styles.disabled]: disabled,
    })} htmlFor={fieldId}>
      <input
        className={styles.colorIndicator}
        id={fieldId}
        type="color"
        value={disabled ? 'black' : value}
        onChange={handleChangePicker}
        disabled={disabled}
      />
    </label>
  );

  const colorInput = (
    <input
      onChange={handleChangeInput}
      value={value}
      className={styles.colorPickerInput}
      placeholder="#FFFFFF"
      disabled={disabled}
    />
  )

  return (
    <div className={cx(styles.wrapper, {
      [styles.disabled]: disabled,
      [styles.error]: status === InputStatus.Error
    })}>
      {colorInput}
      {colorIndicator}
    </div>
  );
};

export default ColorPicker;
