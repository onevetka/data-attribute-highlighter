import { Status } from '../../../core/status/domain/entity/status';
import { Attribute } from '../domain/entity/attribute';

export interface AttributeListState {
  attributeNameInputValue: string;
  attributeNameInputStatus: Status;
  attributeList: Attribute[];
  status: 'loading' | 'idle';
}

export const attributeListState = (
  data: Partial<AttributeListState> = {}
): AttributeListState => {
  return {
    attributeNameInputValue: '',
    attributeNameInputStatus: Status.Default,
    attributeList: [],
    status: 'loading',
    ...data,
  };
};
