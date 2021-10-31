import React, { FormEvent, useState } from 'react';
import cx from 'classnames';

// Components
import Input from '../Input';

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

  const handleChange = (val: string) => {
    onChange?.(val);
    setColor(val);
  }

  const colorIndicator = <div style={{ backgroundColor: color }} className={cx(styles.colorIndicator, {
    [styles.disabled]: disabled,
  })} />

  return (
    <Input maxLength={7} onChange={handleChange} value={value} className={styles.colorPicker} placeholder="#FFFFFF" additionalIcon={colorIndicator} disabled={disabled} />
  );
};

export default ColorPicker;
