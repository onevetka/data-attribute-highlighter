import { Attribute } from '../domain/entity/attribute';
import { attributeName } from '../domain/entity/attributeName';
import { AttributeViewState } from './attributeViewState';
import { v4 as uuid } from 'uuid';

describe('attributeViewState', () => {
  describe('Common', () => {
    const id = uuid();

    const viewState = new AttributeViewState(
      new Attribute({
        id,
        name: attributeName('data-test'),
        color: '#000000',
        isHighlighted: true,
      })
    );

    test('Should have same id like original business attribute', () => {
      expect(viewState.id).toBe(id);
    });

    test('Should have attribute name', () => {
      expect(viewState.label.value).toBe('data-test');
    });

    test('Should have color of attribute highlighting', () => {
      expect(viewState.color.value).toBe('#000000');
    });
  });

  describe('Highlighted attribute', () => {
    const viewState = new AttributeViewState(
      new Attribute({
        id: uuid(),
        name: attributeName('data-test'),
        color: '#000000',
        isHighlighted: true,
      })
    );

    test('Label should be not crossed', () => {
      expect(viewState.label.isСrossed).toBe(false);
    });

    test('Should activate color picker', () => {
      expect(viewState.color.isDisabled).toBe(false);
    });

    test('Toggle visibility button should have vis on icon', () => {
      expect(viewState.visibilityButton.icon).toBe('VisibilityOnIcon');
    });
  });

  describe('Hidden attribute', () => {
    const viewState = new AttributeViewState(
      new Attribute({
        id: uuid(),
        name: attributeName('data-test'),
        color: '#000000',
        isHighlighted: false,
      })
    );

    test('Label should be crossed', () => {
      expect(viewState.label.isСrossed).toBe(true);
    });

    test('Should deactivate color picker', () => {
      expect(viewState.color.isDisabled).toBe(true);
    });

    test('Toggle visibility button should have vis off icon', () => {
      expect(viewState.visibilityButton.icon).toBe('VisibilityOffIcon');
    });
  });
});
