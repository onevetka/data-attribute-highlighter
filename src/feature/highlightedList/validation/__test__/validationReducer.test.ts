import { Status } from '../../../../core/status/domain/entity/status';
import { validationReducer } from '../validationReducer';
import { validationState } from '../validationState';

test('Should do nothing when calling the validateAttributeName action and given name bigger 0 lenght', () => {
  const initialState = validationState();

  expect(
    validationReducer(initialState, {
      type: 'validateAttributeName',
      payload: { name: 'classname' },
    })
  ).toEqual(validationState());
});

test('Should set error when calling the validateAttributeName action and given name equal 0 lenght', () => {
  const initialState = validationState();

  expect(
    validationReducer(initialState, {
      type: 'validateAttributeName',
      payload: { name: '' },
    })
  ).toEqual(validationState({ attributeNameInputStatus: Status.Error }));
});
