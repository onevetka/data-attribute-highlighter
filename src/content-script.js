function getListOfElementsWithAttribute(attributeName) {
  const foundElements = document.querySelectorAll(`[${attributeName}]`);
  const foundElementsList = Array.from(foundElements);

  return foundElementsList;
}

function highlightElements(elements) {
  elements.forEach((element) => {
    element.classList.add('highlighted-element');

    element.addEventListener('mousemove', (event) => {
      const x = event.clientX;
      const y = event.clientY;

      const tipWrapper = document.getElementById('tooltip');

      tipWrapper.innerText = element.getAttribute('data-tnav');

      tipWrapper.style.left = `${x + 16}px`;
      tipWrapper.style.top = `${y + 16}px`;
      tipWrapper.style.display = 'block';
      tipWrapper.style.visibility = 'visible';

      if (event.target === element) {
        event.stopPropagation();
      }
    });

    element.addEventListener('mouseleave', () => {
      const tipWrapper = document.getElementById('tooltip');
      tipWrapper.style.display = 'none';
      tipWrapper.style.visibility = 'hidden';
      tipWrapper.style.left = '0px';
      tipWrapper.style.top = '0px';
    });
  });
}

function addTooltipToDocument() {
  const tipWrapper = document.createElement('div');

  tipWrapper.className = 'tooltip';
  tipWrapper.id = 'tooltip';

  document.body.appendChild(tipWrapper);
}

const ATTRIBUTE_NAME = 'data-tnav';

const foundElementsList = getListOfElementsWithAttribute(ATTRIBUTE_NAME);
highlightElements(foundElementsList);
addTooltipToDocument();

document.addEventListener('click', () => {
  setTimeout(() => {
    const fElementsList = getListOfElementsWithAttribute(ATTRIBUTE_NAME);
    highlightElements(fElementsList);
  }, 100);
});
