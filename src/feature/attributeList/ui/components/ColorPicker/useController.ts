import { v4 as uuid } from 'uuid';
import { debounce } from 'lodash';
import { FormEvent, useRef, useState } from 'react';
import { InputStatus } from '../../../../../components/Input';
import FormValidator from './formValidator';

const debounceFunc = debounce((func) => func(), 1000);

// FIXME: Make functional core
const useController = (onChange: Function | undefined) => {
  const [status, setStatus] = useState<InputStatus | undefined>(undefined);

  const { current: fieldId } = useRef('prefix-' + uuid());

  const handleChangePicker = (event: FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    debounceFunc(() => {
      onChange?.(value);
    });

    setStatus(undefined);
  };

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
  };

  const state = {
    fieldId,
    status,
  };

  return {
    state,
    handleChangePicker,
    handleChangeInput,
  };
};

export default useController;
