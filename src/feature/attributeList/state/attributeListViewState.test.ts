import { Attribute } from '../domain/entity/attribute';
import { attributeName } from '../domain/entity/attributeName';
import { attributeListState } from './attributeListState';
import { AttributeListViewState } from './attributeListViewState';
import { v4 as uuid } from 'uuid';
import { AttributeViewState } from './attributeViewState';

describe('AttributeListViewState', () => {
  describe('If app is loading', () => {
    const viewState = new AttributeListViewState(
      attributeListState({
        status: 'loading',
      })
    );
    test('Should have loading on list place', () => {
      expect(viewState.list).toBe('loading');
    });
  });

  describe('If app is idle', () => {
    describe('If list is empty', () => {
      const viewState = new AttributeListViewState(
        attributeListState({
          status: 'idle',
          attributeList: [],
        })
      );

      test('Should have empty list stub on list place', () => {
        expect(viewState.list).toBe('empty');
      });
    });

    describe('If list have items', () => {
      const attribute = new Attribute({
        id: uuid(),
        name: attributeName('data-test'),
        color: '#000000',
        isHighlighted: true,
      });

      const viewState = new AttributeListViewState(
        attributeListState({
          status: 'idle',
          attributeList: [attribute],
        })
      );

      test('Should have AttributeState items on list place', () => {
        expect(viewState.list).toEqual([new AttributeViewState(attribute)]);
      });
    });
  });
});
