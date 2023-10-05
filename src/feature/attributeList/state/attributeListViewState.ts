import { Status } from '../../../core/status/domain/entity/status';
import { AttributeViewState } from '../ui/components/CurrentAttributeListItem';
import { AttributeListState } from './attributeListState';

export class AttributeListViewState {
  list: AttributeViewState[] | 'empty' | 'loading';
  input: {
    value: string;
    status: Status;
  };

  constructor(state: AttributeListState) {
    this.list = state.attributeList.map(
      (attribute) => new AttributeViewState(attribute)
    );

    this.input = {
      value: state.attributeNameInputValue,
      status: state.attributeNameInputStatus,
    };
  }
}
