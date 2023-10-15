import { Attribute } from '../domain/entity/attribute';

export class AttributeViewState {
  id: string;

  label: {
    value: string;
    isСrossed: boolean;
  };
  color: {
    value: string;
    isDisabled: boolean;
  };
  visibilityButton: {
    icon: 'VisibilityOnIcon' | 'VisibilityOffIcon';
  };

  constructor(attribute: Attribute) {
    this.id = attribute.id;

    this.label = {
      value: attribute.name.string,
      isСrossed: !attribute.isHighlighted,
    };

    this.color = {
      value: attribute.color,
      isDisabled: !attribute.isHighlighted,
    };

    this.visibilityButton = {
      icon: attribute.isHighlighted ? 'VisibilityOnIcon' : 'VisibilityOffIcon',
    };
  }
}
