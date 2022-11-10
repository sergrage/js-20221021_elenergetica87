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
    // NOTE: в данном методе добавляем обработчики событий, если они есть
    document.addEventListener('pointerover', this.pointerover);
    // document.addEventListener('onmouseout', this.onmouseout);
  }
  pointerover = e => {
    const el = e.target.closest('[data-tooltip]');
    if (el) {
      this.tooltip = el.dataset.tooltip;
      this.render(this.tooltip, e.clientX + 'px', e.clientY + 'px');
      console.log(e.clientX, e.clientY);
      el.addEventListener('pointerout', this.onmouseout);
    }
  }
  onmouseout = () => {
    this.remove();
    document.removeEventListener('pointermove', this.pointerover);
  }
  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    // NOTE: удаляем обработчики событий, если они есть
  }
}


export default Tooltip;
