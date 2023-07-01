import { Color } from '../../../../core/color/domain/entity/color';
import { AttributeName } from './attributeName';

export interface Attribute {
  id: string;
  name: AttributeName;
  color: Color;
  isHighlighted: boolean;
}

export const attribute = (data: Attribute): Attribute => {
  return {
    ...data,
  };
};

// export const attribute = (data: Partial<Attribute>): Attribute => {
//   return {
//     id: '',
//     name,
//     color: '#000000',
//     isHighlighted: false,
//     ...data,
//   };
// };

// const attributeTemp = attribute({ name: attributeName({ text: 'hello' }) });
