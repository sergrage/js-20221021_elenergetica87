export default class NotificationMessage {
  constructor(text = '', {duration = 1000, type = 'success'} = {}) {
    this.text = text;
    this.duration = duration;
    this.type = type;
    this.element = document.createElement("div");
    this.render();
    this.initEventListeners();

    NotificationMessage.allInstances = [];
    NotificationMessage.allInstances.push(this);
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
    if (NotificationMessage.allInstances) {
      NotificationMessage.allInstances.forEach(instances => instances.remove());
    }
    // const oldNotification = document.querySelector('.notification');
    // if (oldNotification) { oldNotification.remove(); }
    const element = document.createElement("div"); // (*)
    element.innerHTML = this.getTemplate();
    this.element = element.firstElementChild;
  }
  show(element = document.body) {
    element.append(this.element);
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
