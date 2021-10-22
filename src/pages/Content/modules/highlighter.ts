import { addTooltipToDocument, drawTooltipByCoordinates, deleteTooltip } from './tooltip';

interface HighlighterInterface {
  attributeName: string;
  color: string;
  tooltip: HTMLElement | null;

  highlightElements: Function;
}

class Highlighter implements HighlighterInterface {
  attributeName;
  color;
  tooltip;

  constructor(attributeName: string = 'data-test', color: string = '') {
    this.attributeName = attributeName;
    this.color = color;
    this.tooltip = document.getElementById('tooltip');
  }

  highlightElements(elements: any) {
    elements.forEach((element: any) => {
      element.classList.add('highlighted-element');

      const label = element.getAttribute(this.attributeName);
  
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
