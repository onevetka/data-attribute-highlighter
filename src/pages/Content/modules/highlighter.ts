import { addTooltipToDocument, drawTooltipByCoordinates, deleteTooltip } from './tooltip';

/**
 * Implementation
 */
class Highlighter {
  // tooltip: HTMLElement | null;

  static select(elements: Array<HTMLElement>, color: string/*, attributeName: string = 'data-test'*/) {
    elements.forEach((element: any) => {
      element.classList.add('highlighted-element');
      element.style.outlineColor = color;

      // const label = element.getAttribute(attributeName);

      // element.addEventListener('mousemove', (event: MouseEvent) => {
      //   const x = event.clientX;
      //   const y = event.clientY;

      //   drawTooltipByCoordinates(x, y, label, this.tooltip);

      //   if (event.target === element) {
      //     event.stopPropagation();
      //   }
      // });

      // element.addEventListener('mouseleave', () => deleteTooltip(this.tooltip));
    });
  }

  static remove(elements: Array<HTMLElement>/*, attributeName: string = 'data-test'*/) {
    elements.forEach((element: any) => {
      element.classList.remove('highlighted-element');
      element.style.outlineColor = 'unset';

      // TODO: Remove event listeners
    });
  }
}

export default Highlighter;
