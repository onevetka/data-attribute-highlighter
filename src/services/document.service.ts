export function getListOfElementsWithAttribute(attributeName: string): Array<HTMLElement> {
  const foundElements = document.querySelectorAll(`[${attributeName}]`);
  const foundElementsList = Array.from(foundElements);

  // FIXME
  return foundElementsList as Array<HTMLElement>;
}