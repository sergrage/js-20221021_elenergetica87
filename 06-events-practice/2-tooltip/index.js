class Tooltip {
  static _instance;
  onPointerOver = event => {
    const element = event.target.closest('[data-tooltip]');
    if (element) {
      this.tooltip = element.dataset.tooltip;
      this.render(this.tooltip);
      element.addEventListener('pointermove', this.onPointerMove);
    }
  }
  onPointerMove = (event) => {
    this.moveTooltip(event);
  }
  onPointerOut = () => {
    this.remove();
    document.removeEventListener('pointermove', this.onPointerMove);
  }
  constructor() {
    if (!Tooltip._instance) {
      Tooltip._instance = this;
    }
    return Tooltip._instance;
  }
  initialize () {
    this.initEventListeners();
  }
  getTemplate(tooltip = '') {
    return `<div class="tooltip">${tooltip}</div>`;
  }
  moveTooltip = (event) => {
    this.element.style.left = 10 + event.clientX + 'px';
    this.element.style.top = 10 + event.clientY + 'px';
  }
  render(template) {
    const element = document.createElement("div"); // (*)
    element.innerHTML = this.getTemplate(template);
    this.element = element.firstElementChild;

    document.body.append(this.element);
  }
  initEventListeners() {
    document.addEventListener('pointerover', this.onPointerOver);
    document.addEventListener('pointerout', this.onPointerOut);
  }

  remove() {
    this.element.remove();
  }
  destroy() {
    this.remove();
    document.removeEventListener('pointerover', this.onPointerOver);
    document.removeEventListener('pointerout', this.onPointerOut);
    document.removeEventListener('pointermove', this.onPointerMove);
    // NOTE: удаляем обработчики событий, если они есть
  }
}


export default Tooltip;
