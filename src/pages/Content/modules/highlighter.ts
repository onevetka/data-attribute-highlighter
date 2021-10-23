import { addTooltipToDocument, drawTooltipByCoordinates, deleteTooltip } from './tooltip';

/**
 * Implementation
 */
class Highlighter {
  color: string;
  tooltip: HTMLElement | null;

  constructor(color: string = '') {
    this.color = color;
    this.tooltip = addTooltipToDocument();
  }

  highlightElements(elements: any, attributeName: string = 'data-test') {
    elements.forEach((element: any) => {
      element.classList.add('highlighted-element');

      const label = element.getAttribute(attributeName);

      element.addEventListener('mousemove', (event: MouseEvent) => {
        const x = event.clientX;
        const y = event.clientY;

        drawTooltipByCoordinates(x, y, label, this.tooltip);

        if (event.target === element) {
          event.stopPropagation();
        }
      });

      element.addEventListener('mouseleave', () => deleteTooltip(this.tooltip));
    });
  }
}

export default Highlighter;
