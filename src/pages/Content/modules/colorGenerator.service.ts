class ColorGeneratorService {
  queueOfColors: Array<string>;

  constructor() {
    this.queueOfColors = [
      '#0670EF',
      '#FAB531',
      '#FF2674',
      '#1AC692',
      '#794AFF',
    ];
  }

  getColor() {
    if (this.queueOfColors.length === 0) {
      throw new Error('QueueOfColors are empty');
    }

    return this.queueOfColors.shift();
  }
}

export default new ColorGeneratorService();