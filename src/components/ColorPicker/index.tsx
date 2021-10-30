import React, { FormEvent, useState } from 'react';
import cx from 'classnames';

// Components
import Input from '../Input';

// Assets
import styles from './style.module.scss';

interface ColorPickerProps {
  value?: string;
  onChange?: Function;
  onFocus?: Function;
  onBlur?: Function;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange }) => {
  const [color, setColor] = useState<string | undefined>(value);

  const handleChange = (val: string) => {
    onChange?.(val);
    setColor(val);
  }

  const colorIndicator = <div style={{ backgroundColor: color }} className={styles.colorIndicator} />

  return (
    <Input maxLength={7} onChange={handleChange} value={value} className={styles.colorPicker} placeholder="#FFFFFF" additionalIcon={colorIndicator} />
  );
};

export default ColorPicker;
