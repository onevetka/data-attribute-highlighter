export function addTooltipToDocument() {
  const tooltip = document.createElement('div');

  tooltip.className = 'tooltip';
  tooltip.id = 'tooltip';

  document.body.appendChild(tooltip);

  return tooltip;
}

export function drawTooltipByCoordinates(x: number, y: number, label: string, tooltip: HTMLElement | null) {
  if (tooltip === null) {
    return null;
  }

  tooltip.innerText = label;
  tooltip.style.left = `${x + 16}px`;
  tooltip.style.top = `${y + 16}px`;
  tooltip.style.display = 'block';
  tooltip.style.visibility = 'visible';
}

export function deleteTooltip(tooltip: HTMLElement | null) {
  if (tooltip === null) {
    return null;
  }

  tooltip.style.display = 'none';
  tooltip.style.visibility = 'hidden';
  tooltip.style.left = '0px';
  tooltip.style.top = '0px';
}