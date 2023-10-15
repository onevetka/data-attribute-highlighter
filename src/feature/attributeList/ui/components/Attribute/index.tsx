// Base
import React from 'react';
import cx from 'classnames';

// Entity
import { Color } from '../../../../../core/color/domain/entity/color';

// Components
import ColorPicker from '../ColorPicker';
import IconButton from '../../../../../components/IconButton';
import CloseIcon from '../../icons/CloseIcon';
import VisibilityOffIcon from '../../icons/VisibilityOffIcon';
import VisibilityOnIcon from '../../icons/VisibilityOnIcon';

// Assets
import styles from './style.module.scss';
import { AttributeViewState } from '../../../state/attributeViewState';

const mapVisibilityIcon = {
  VisibilityOnIcon: <VisibilityOnIcon />,
  VisibilityOffIcon: <VisibilityOffIcon />,
};

interface ListItemProps {
  viewState: AttributeViewState;
  onDelete: (id: string) => void;
  onToggleVisibility: (id: string) => void;
  onChangeColor: (id: string, color: Color) => void;
}

const Attribute: React.FC<ListItemProps> = ({
  viewState,
  onDelete,
  onToggleVisibility,
  onChangeColor,
}) => {
  return (
    <div className={styles.wrapper}>
      <div
        className={cx(styles.label, {
          [styles.disabled]: viewState.label.isСrossed,
        })}
      >
        {viewState.label.value}
      </div>
      <ColorPicker
        onChange={(color: Color) => onChangeColor(viewState.id, color)}
        value={viewState.color.value}
        disabled={viewState.color.isDisabled}
      />
      <IconButton onClick={() => onToggleVisibility(viewState.id)}>
        {mapVisibilityIcon[viewState.visibilityButton.icon]}
      </IconButton>
      <IconButton onClick={() => onDelete(viewState.id)}>
        <CloseIcon />
      </IconButton>
    </div>
  );
};

export default Attribute;
