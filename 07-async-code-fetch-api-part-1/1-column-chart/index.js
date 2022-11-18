import fetchJson from './utils/fetch-json.js';

const BACKEND_URL = 'https://course-js.javascript.ru';

export default class ColumnChart {
  subElements = {};
  loadData = (start, end) => {
    this.element.classList.add("column-chart_loading");
    const url = this.url.href + `?from=${start}&to=${end}`;
    fetchJson(url).then(res => {
      this.graph = [];
      this.data = this.graphLineToPercent(Object.values(res));
      this.createGraph();
      this.subElements.body.innerHTML = this.graph;
      this.element.classList.remove("column-chart_loading");
      return res;
    }).catch((error) => alert(error));
  }
  constructor({
    url = 'api/dashboard/orders/',
    range = {
      from: new Date().toISOString().split('T')[0],
      to: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0]
    },
    data = [],
    label = "",
    link = "",
    value = 0,
    formatHeading = data => data,
  } = {}) {
    this.range = range;
    this.url = new URL(url, BACKEND_URL);
    this.data = this.graphLineToPercent(data);
    this.label = label;
    this.link = `<a class="column-chart__link" href="${link}">View all</a>`;
    this.value = formatHeading(value);
    this.chartClasses = this.data.length ? 'column-chart column-chart_loading' : 'column-chart';
    this.graph = '';
    this.chartHeight = 50;
    this.render();
    this.subElements = this.getSubElements();

    this.loadData(this.range.from, this.range.to);
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

  update(start, end) {
    this.loadData(start.toISOString().split('T')[0], end.toISOString().split('T')[0]);
  }

  getSubElements() {
    const result = {};
    const elements = this.element.querySelectorAll("[data-element]");
    for (const subElement of elements) {
      const name = subElement.dataset.element;
      result[name] = subElement;
    }
    return result;
  }

  remove() {
    this.element.remove();
  }
  destroy() {
    this.remove();
    // NOTE: удаляем обработчики событий, если они есть
  }
}
