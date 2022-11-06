export default class NotificationMessage {
  constructor(text, props) {
    this.text = text || 'hi';
    this.duration = (props && props.duration) || 1000;
    this.type = (props && props.type) || 'success';
    this.element = document.createElement("div");
    this.render();
    this.initEventListeners();
  }

  getTemplate() {
    return `
        <div class="notification ${this.type}" style="--value:${this.duration / 1000}s">
            <div class="timer"></div>
            <div class="inner-wrapper">
                <div class="notification-header">${this.type}</div>
                <div class="notification-body">
                    ${this.text}
                </div>
            </div>
        </div>
    `;
  }
  render() {
    const element = document.createElement("div"); // (*)
    element.innerHTML = this.getTemplate();
    this.element = element.firstElementChild;
  }

  show(element) {
    if (element) {
      element.innerHTML = this.getTemplate();
    } else {
      element = this.element;
    }
    document.body.append(element);
    setTimeout(() => {
      this.remove();
    }, this.duration);
  }

  initEventListeners() {
    // NOTE: в данном методе добавляем обработчики событий, если они есть
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    // NOTE: удаляем обработчики событий, если они есть
  }
}
