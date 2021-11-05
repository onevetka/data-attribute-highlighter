const darkModeColors = [
  '#0670EF', // Blue
  '#FAB531', // Yellow
  '#FF2A4F', // Pink
  '#3DFFC5', // Green
  '#8D63FF', // Purple
  '#BCEB02', // Toxic
];

const lightModeColors = [
  '#0773F7', // Blue
];

class ColorGeneratorService {
  queueOfColors: Array<string>;

  constructor() {
    this.queueOfColors = [...darkModeColors];
  }

  getColor() {
    if (this.queueOfColors.length === 0) {
      const index = Math.floor(Math.random() * darkModeColors.length);
      return darkModeColors[index];
    }

    return this.queueOfColors.shift();
  }
}

export default new ColorGeneratorService();