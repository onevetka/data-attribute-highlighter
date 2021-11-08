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
  className?: string;
  label: string;
  highlightingColor: string;
  isHighlighted: boolean;
  onClose: Function;
  onToggleVisibility: Function;
}

const CurrentAttributeListItem: React.FC<ListItemProps> = ({ className, label, highlightingColor, isHighlighted, onClose, onToggleVisibility }) => {
  return (
    <div className={cx(styles.wrapper, className)}>
      <div className={cx(styles.label, { [styles.disabled]: !isHighlighted })}>{label}</div>
      <ColorPicker value={highlightingColor} disabled={!isHighlighted} />
      <IconButton onClick={onToggleVisibility as MouseEventHandler}>{isHighlighted ? <VisibilityOnIcon /> : <VisibilityOffIcon />}</IconButton>
      <IconButton onClick={onClose as MouseEventHandler}><CloseIcon /></IconButton>
    </div>
  )
}

export default CurrentAttributeListItem;
