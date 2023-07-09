import { validateColor } from './validateColor';

class FormValidator {
  static isValidColor(value: string) {
    const isValidColor = validateColor(value);
    return isValidColor || value === '';
  }
}

export default FormValidator;
