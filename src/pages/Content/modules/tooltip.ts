type Attribute = {
  label: string;
  color: string;
};

export default class Tooltip {
  attributes: Array<Attribute> = [];

  element: HTMLElement | null = null;
}
