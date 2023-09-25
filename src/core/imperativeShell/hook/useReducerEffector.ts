import { useState } from 'react';
import { Reducer } from '../domain/entity/reducer';
import { Effector } from '../domain/entity/effector';

/**
 * Хук редьюсер с обработкой сайд эффектов
 * @param reducer
 * @param effector
 * @param init
 *
 * @returns state, dispatch
 */
export const useReducerEffector = <State, Event, Effect>(
  reducer: Reducer<State, Event, Effect>,
  effector: Effector<Effect, Event>,
  init: State
) => {
  const [state, setState] = useState(init);

  const dispatch = (event: Event) => {
    const { state: _state, effects } = reducer(state, event);
    setState(_state);

    effects.forEach((effect: Effect) => effector(effect, { dispatch }));
  };

  return { state, dispatch };
};
