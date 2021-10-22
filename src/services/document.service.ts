export function getListOfElementsWithAttribute(attributeName: string) {
  const foundElements = document.querySelectorAll(`[${attributeName}]`);
  const foundElementsList = Array.from(foundElements);

  return foundElementsList;
}