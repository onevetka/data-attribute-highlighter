type Attribute = {
  label: string;
  color: string;
};

export default class Tooltip {
  attributes: Record<string, Attribute> = {};
}
