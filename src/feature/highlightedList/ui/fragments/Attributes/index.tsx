import React, { FormEvent } from 'react';
import Input from '../../../../../components/Input';
import Button from '../../../../../components/Button';
import ListSkeleton from '../../components/ListSkeleton';
import CurrentAttributeListItem from '../../components/CurrentAttributeListItem';
import { Color } from '../../../../../core/color/domain/entity/color';
import { useViewModel } from '../../../state/useViewModel';

import styles from './style.module.scss';

export const Attributes: React.FC = () => {
  const { state, sendAction } = useViewModel();

  return (
    <div className={styles.wrapper}>
      <form
        className={styles.form}
        onSubmit={(event: FormEvent) => {
          event.preventDefault();
          sendAction({
            type: 'highlight',
          });
        }}
      >
        <Input
          className={styles.attributeNameInput}
          label="Attribute name"
          value={state.attributeNameInputValue}
          onChange={(name: string) =>
            sendAction({
              type: 'changeAttributeNameInputValue',
              payload: { name },
            })
          }
          placeholder="data-test"
          status={state.attributeNameInputStatus}
        />
        <Button className={styles.highlightButton} type="submit">
          Highlight
        </Button>
      </form>
      <div className={styles.list}>
        {state.attributeList.length > 0 ? (
          state.attributeList.map((item, index) => (
            <CurrentAttributeListItem
              // FIXME: state={} Даня предлагает сразу кидать стейт, и определить его интерфейс. Посмотреть как я сделал в Озоне
              className={styles.listItem}
              label={item.name}
              highlightingColor={item.color}
              isHighlighted={item.isHighlighted}
              onClose={() =>
                sendAction({ type: 'deleteItem', payload: { id: index } })
              }
              onToggleVisibility={() =>
                sendAction({
                  type: 'toggleHighlighting',
                  payload: { id: index },
                })
              }
              onChangeColor={(color: Color) =>
                sendAction({
                  type: 'changeHighlightColor',
                  payload: { id: item.id, color },
                })
              }
              key={index} // FIXME
            />
          ))
        ) : (
          <ListSkeleton />
        )}
      </div>
    </div>
  );
};

export default Attributes;
