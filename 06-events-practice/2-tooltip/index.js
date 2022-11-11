class Tooltip {
  initialize () {
    this.initEventListeners();
  }

  constructor() {
    if (!Tooltip._instance) {
      Tooltip._instance = this;
    }
    return Tooltip._instance;
  }

  getTemplate(tooltip = '') {
    return `<div class="tooltip">${tooltip}</div>`;
  }
  render(template, x, y) {
    const element = document.createElement("div"); // (*)
    element.innerHTML = this.getTemplate(template);
    this.element = element.firstElementChild;
    this.element.style.left = x;
    this.element.style.top = y;
    document.body.append(this.element);
  }
  initEventListeners() {
    document.addEventListener('pointerover', this.pointerover);
  }
  pointerover = event => {
    const el = event.target.closest('[data-tooltip]');
    if (el) {
      this.tooltip = el.dataset.tooltip;
      this.render(this.tooltip, event.clientX + 'px', event.clientY + 'px');
      el.addEventListener('pointerout', this.pointerout);
    }
  }
  pointerout = () => {
    this.remove();
  }
  remove() {
    this.element.remove();
  }
  destroy() {
    this.remove();
    document.removeEventListener('pointerover', this.pointerover);
    document.removeEventListener('pointerout', this.pointerout);
    // NOTE: удаляем обработчики событий, если они есть
  }
}


export default Tooltip;
