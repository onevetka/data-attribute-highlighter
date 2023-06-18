export interface Attribute {
  id: string;
  color: string;
  isHighlighted: boolean;
}

export const attribute = (data: Partial<Attribute>): Attribute => ({
  id: '',
  color: '#000000',
  isHighlighted: false,
  ...data,
});
