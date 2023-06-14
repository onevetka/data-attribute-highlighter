// Base
import React, { MouseEventHandler } from 'react';
import cx from 'classnames';

// Components
import ColorPicker from '../ColorPicker';
import IconButton from '../../../../../components/IconButton';
import CloseIcon from '../../icons/CloseIcon';
import VisibilityOffIcon from '../../icons/VisibilityOffIcon';
import VisibilityOnIcon from '../../icons/VisibilityOnIcon';

// State
import { useViewModel } from '../../../state/useViewModel';

// Assets
import styles from './style.module.scss';

interface ListItemProps {
  className?: string;
  label: string;
  highlightingColor: string;
  isHighlighted: boolean;
  onClose: Function;
  onToggleVisibility: Function;
  onChangeColor: Function;
}

const CurrentAttributeListItem: React.FC<ListItemProps> = ({
  className,
  label,
  highlightingColor,
  isHighlighted,
  onClose,
  onToggleVisibility,
  onChangeColor,
}) => {
  const { state, dispatch } = useViewModel();

  return (
    <div className={cx(styles.wrapper, className)}>
      <div
        className={cx(styles.label, {
          [styles.disabled]: !state.isHighlighted,
        })}
      >
        {label}
      </div>
      <ColorPicker
        onChange={(value: string) =>
          dispatch({ type: 'changeHighlightColor', payload: { color: value } })
        }
        value={state.color}
        disabled={!state.isHighlighted}
      />
      <IconButton onClick={() => dispatch({ type: 'toggleHighlighting' })}>
        {state.isHighlighted ? <VisibilityOnIcon /> : <VisibilityOffIcon />}
      </IconButton>
      <IconButton onClick={onClose as MouseEventHandler}>
        <CloseIcon />
      </IconButton>
    </div>
  );
};

export default CurrentAttributeListItem;
