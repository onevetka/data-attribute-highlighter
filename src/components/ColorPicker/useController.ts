import { debounce } from 'lodash';
import { FormEvent, useRef, useState } from 'react';
import { InputStatus } from '../Input';
import FormValidator from './formValidator';

const debounceFunc = debounce((func) => func(), 1000);

const useController = (onChange: Function | undefined) => {
  const [status, setStatus] = useState<InputStatus | undefined>(undefined);

  const {current: fieldId} = useRef("prefix-" + (Math.random().toString(36)+'00000000000000000').slice(2, 7));

  const handleChangePicker = (event: FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    debounceFunc(() => {
      onChange?.(value);
    });

    setStatus(undefined);
  }

  const handleChangeInput = (event: FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    onChange?.(value);

    debounceFunc(() => {
      if (!FormValidator.isValidColor(value)) {
        setStatus(InputStatus.Error);
      } else {
        setStatus(undefined);
      }
    });
  }

  const state = {
    fieldId,
    status,
  }

  return {
    state,
    handleChangePicker,
    handleChangeInput,
  }
}

export default useController