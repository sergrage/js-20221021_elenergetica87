export default class RangePicker {
  onInputClick = () => {
    const rangePicker = document.querySelector('.rangepicker');
    if (!rangePicker.classList.contains('rangepicker_open')) {
      this.renderCalendar(this.dateMonth);
    }
    rangePicker.classList.toggle('rangepicker_open');
  }
  insideClick = (event) => {
    const rangePicker = document.querySelector('.rangepicker');
    const isRangePicker = event.target.closest('.rangepicker');
    if (rangePicker.classList.contains('rangepicker_open') && (isRangePicker === null)) {
      rangePicker.classList.remove('rangepicker_open');
    }
  }

  prevMonthClick = (event) => {
    const date = new Date(this.dateMonth.setMonth(this.dateMonth.getMonth() - 1));
    this.renderCalendar(date);
  }

  nextMonthClick = (event) => {
    const date = new Date(this.dateMonth.setMonth(this.dateMonth.getMonth() + 1));
    this.renderCalendar(date);
  }

  constructor ({
    from = new Date(),
    to = new Date()
  } = {}) {
    this.from = from;
    this.to = to;

    this.dateMonth = new Date(this.from.getTime());

    this.render();
    this.initEventListeners();
  }
  render() {
    const element = document.createElement("div"); // (*)
    element.innerHTML = this.getTemplate();
    this.element = element.firstElementChild;
  }
  renderCalendar(date) {
    const selector = this.subElements.selector;
    selector.innerHTML = this.getCalendar(date);

    const previousMonth = selector.querySelector('.rangepicker__selector-control-left');
    const nextMonth = selector.querySelector('.rangepicker__selector-control-right');
    previousMonth.addEventListener('click', () => this.prevMonthClick());
    nextMonth.addEventListener('click', () => this.nextMonthClick());
  }
  getTemplate() {
    return `
      <div class="rangepicker">
        <div class="rangepicker__input" data-element="input">
          <span data-element="from">${this.from.toLocaleDateString('ru-RU')}</span> -
          <span data-element="to">${this.to.toLocaleDateString('ru-RU')}</span></div>
          <div class="rangepicker__selector" data-element="selector"></div>
      </div>
    `;
  }

  getCalendar(date) {
    return `
      ${this.getArrowsControl()}
      <div class="rangepicker__calendar">
        ${this.getMonthIndicator(date)}
        ${this.getDaysOfWeek()}
        <div class="rangepicker__date-grid">
          ${this.getDateGrid(date)}
        </div>
      </div>
      <div class="rangepicker__calendar">
        ${this.getMonthIndicator(new Date(date.setMonth(date.getMonth() + 1)))}
        ${this.getDaysOfWeek()}
        <div class="rangepicker__date-grid">
          ${this.getDateGrid(new Date(date.setMonth(date.getMonth() + 1)))}
        </div>
      </div>
    `;
  }
  getDateGrid(date) {
    date.setUTCDate(0);
    const daysNumber = this.getDaysNumberInMonth(date);
    const dayOfWeekDigit = date.getDay() === 0 ? 7 : date.getDay();

    let result =
    `<button type="button" class="rangepicker__cell" data-value="${new Date(date)}" style="--start-from: ${dayOfWeekDigit}">1</button>`;
    for (let i = 1; i < daysNumber; i++) {
      result += `<button type="button" class="rangepicker__cell" data-value="${new Date(date.setUTCDate(i))}">${i + 1} ${this.datesIsEqual(new Date(date.setUTCDate(i)), this.from) }</button>`;
    }
    return result;
  }
  getMonthIndicator(date) {
    return `
    <div class="rangepicker__month-indicator">
       <time datetime="${this.getMonthString(date)}">${this.getMonthString(date)}</time>
    </div>
    `;
  }
  getArrowsControl() {
    return `
      <div class="rangepicker__selector-arrow"></div>
      <div class="rangepicker__selector-control-left"></div>
      <div class="rangepicker__selector-control-right"></div>
    `;
  }
  getDaysOfWeek() {
    return `
      <div class="rangepicker__day-of-week">
          <div>Пн</div>
          <div>Вт</div>
          <div>Ср</div>
          <div>Чт</div>
          <div>Пт</div>
          <div>Сб</div>
          <div>Вс</div>
        </div>`;
  }

  getDaysNumberInMonth (data) {
    const currentYear = data.getFullYear();
    const currentMonth = data.getMonth() + 1;
    return new Date(currentYear, currentMonth, 0).getDate();
  }

  initEventListeners() {
    this.subElements.input.addEventListener('click', this.onInputClick);
    document.addEventListener('click', this.insideClick, true);
  }
  get subElements() {
    const result = {};
    const elements = this.element.querySelectorAll("[data-element]");

    for (const subElement of elements) {
      const name = subElement.dataset.element;
      result[name] = subElement;
    }

    return result;
  }

  getMonthString(date) {
    return date.toLocaleString('ru', { month: 'long'});
  }
  datesIsEqual(date1, date2) {
    return date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear();
  }
  dateBetween(date, start, end) {
    return (date > start && date < end);
  }
  remove() {
    this.element.remove();
  }
  destroy() {
    this.remove();
    // NOTE: удаляем обработчики событий, если они есть
  }
}
