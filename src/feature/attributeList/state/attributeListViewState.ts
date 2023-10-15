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
    this.list = state.attributeList.map(
      (attribute) => new AttributeViewState(attribute)
    );

    this.input = {
      value: state.attributeNameInputValue,
      status: state.attributeNameInputStatus,
    };
  }
}
