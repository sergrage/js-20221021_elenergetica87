export default class ColumnChart {
  constructor(props) {
    this.chartClasses = (props === undefined) ? 'column-chart column-chart_loading' : 'column-chart';
    this.chartHeight = 50;

    this.data = (props && props.data) ? this.graphLineToPercent(props.data) : [];
    this.label = (props && props.label) || '';
    //немного ниндзя кода))))
    this.value = (props && props.value) ? (props.formatHeading ? props.formatHeading(props.value) : props.value) : 0;
    this.link = (props && props.link) ? `<a class="column-chart__link" href="${props.link}">View all</a>` : '';

    this.graph = '';
    this.createGraph();

    this.render();
    this.initEventListeners();
  }

  getTemplate() {
    return `
    <div class="${this.chartClasses}" style="--chart-height: 50">
      <div class="column-chart__title">
        Total ${this.label} ${this.link}
      </div>
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header">${this.value}</div>
        <div data-element="body" class="column-chart__chart">
            ${this.graph}
        </div>
      </div>
    </div>
    `;
  }

  render() {
    const element = document.createElement("div"); // (*)
    element.innerHTML = this.getTemplate();
    // NOTE: в этой строке мы избавляемся от обертки-пустышки в виде `div`
    // который мы создали на строке (*)
    this.element = element.firstElementChild;
  }

  graphLineToPercent(data) {
    const maxValue = Math.max(...data);
    const scale = this.chartHeight / maxValue;
    return data.map(item => {
      return {
        percent: (item / maxValue * 100).toFixed(0) + '%',
        value: String(Math.floor(item * scale))
      };
    });
  }

  createGraph() {
    this.data.map(col => {
      this.graph += `<div style="--value:  ${col.value}" data-tooltip="${col.percent}"></div>`;
    });
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

  update(data) {
    this.data = data;
  }

}

// const defaultComponent = new ColumnChart();
// const element = document.getElementById("root");
//
// element.append(defaultComponent.element);
