import { Status } from '../../../core/status/domain/entity/status';
import { AttributeListState } from './attributeListState';
import { AttributeViewState } from './attributeViewState';

export class AttributeListViewState {
  list: AttributeViewState[] | 'empty' | 'loading';
  input: {
    value: string;
    status: Status;
  };

  constructor(state: AttributeListState) {
    switch (state.status) {
      case 'loading': {
        this.list = 'loading';
        break;
      }
      case 'idle': {
        if (state.attributeList.length === 0) {
          this.list = 'empty';
        } else {
          this.list = state.attributeList.map(
            (attribute) => new AttributeViewState(attribute)
          );
        }
        break;
      }
    }

    this.input = {
      value: state.attributeNameInputValue,
      status: state.attributeNameInputStatus,
    };
  }
}
