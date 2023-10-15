import { Status } from '../../../core/status/domain/entity/status';
import { AttributeListState } from './attributeListState';
import { AttributeViewState } from './attributeViewState';

export class AttributeListViewState {
  list: AttributeViewState[] | 'empty' | 'loading'; // FIXME: Сюда тесты нужны и логику по показу пустого списка. Кстати это должен быть компонент с вью стейтом
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
