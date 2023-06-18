import { appError } from '../../domain/entity/appError';
import { appErrorReducer } from '../appErrorReducer';
import { appErrorState } from '../appErrorState';

test('setErrors action sets error list', () => {
  const initState = appErrorState();

  const errors = [
    appError({
      code: 'ERROR_CANNOT_FETCH',
      message: "Api caller can't fetch data from remote repository",
      path: ['fetchComponent', 'viewModel', 'apiCaller'],
    }),
  ];

  const reducer = appErrorReducer(initState, {
    type: 'setErrors',
    payload: { errors },
  });

  expect(reducer).toEqual(appErrorState({ errors }));
});

test('clearErrors action sets empty error list', () => {
  const errors = [
    appError({
      code: 'ERROR_CANNOT_FETCH',
      message: "Api caller can't fetch data from remote repository",
      path: ['fetchComponent', 'viewModel', 'apiCaller'],
    }),
    appError({
      code: 'ERROR_INVALID_DATA',
      message: 'You need to input valid email',
      path: ['emailInput'],
    }),
  ];

  const initState = appErrorState({ errors });

  const reducer = appErrorReducer(initState, { type: 'clearErrors' });

  expect(reducer).toEqual(appErrorState());
});

test('clearErrorsByPath action clear errors only with selected path', () => {
  const errors = [
    appError({
      code: 'ERROR_CANNOT_FETCH',
      message: "Api caller can't fetch data from remote repository",
      path: ['fetchComponent', 'viewModel', 'apiCaller'],
    }),
    appError({
      code: 'ERROR_INVALID_DATA',
      message: 'You need to input valid email',
      path: ['emailInput'],
    }),
  ];

  const initState = appErrorState({ errors });

  const reducer = appErrorReducer(initState, {
    type: 'clearErrorsByPath',
    payload: { path: ['emailInput'] },
  });

  expect(reducer).toEqual(
    appErrorState({
      errors: [
        appError({
          code: 'ERROR_CANNOT_FETCH',
          message: "Api caller can't fetch data from remote repository",
          path: ['fetchComponent', 'viewModel', 'apiCaller'],
        }),
      ],
    })
  );
});
