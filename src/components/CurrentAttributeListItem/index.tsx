// Base
import React, { MouseEventHandler } from 'react';
import cx from 'classnames';

// Components
import ColorPicker from '../ColorPicker';
import IconButton from '../IconButton';
import CloseIcon from '../Icons/CloseIcon';
import VisibilityOffIcon from '../Icons/VisibilityOffIcon';
import VisibilityOnIcon from '../Icons/VisibilityOnIcon';

// Assets
import styles from './style.module.scss';

interface ListItemProps {
  label: string;
  highlightingСolor: string;
  isHighlighted: boolean;
  onClose: Function;
  onToggleVisibility: Function;
}

const CurrentAttributeListItem: React.FC<ListItemProps> = ({ label, highlightingСolor, isHighlighted, onClose, onToggleVisibility }) => {
  return (
    <div className={styles.wrapper}>
      <div className={cx(styles.label, { [styles.disabled]: !isHighlighted })}>{label}</div>
      <ColorPicker value={highlightingСolor} disabled={!isHighlighted} />
      <IconButton onClick={onToggleVisibility as MouseEventHandler}>{isHighlighted ? <VisibilityOnIcon /> : <VisibilityOffIcon />}</IconButton>
      <IconButton onClick={onClose as MouseEventHandler}><CloseIcon /></IconButton>
    </div>
  )
}

export default CurrentAttributeListItem;
