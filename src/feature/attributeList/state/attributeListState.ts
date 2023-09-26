import { Status } from '../../../core/status/domain/entity/status';
import { Attribute } from '../domain/entity/attribute';

export interface AttributeListState {
  attributeNameInputValue: string;
  attributeList: Attribute[];
  attributeNameInputStatus: Status;
}

export const attributeListState = (
  data: Partial<AttributeListState> = {}
): AttributeListState => {
  return {
    attributeNameInputValue: '',
    attributeNameInputStatus: Status.Default,
    attributeList: [],
    ...data,
  };
};
