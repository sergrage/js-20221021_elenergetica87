export default class ColumnChart {
  constructor(props) {
    if (props === undefined) {
      props = {
        data: [],
        label: '',
        link: '',
        value: 0
      };
      this.chartClasses = 'column-chart column-chart_loading';
    } else {
      this.chartClasses = 'column-chart';
    }

    this.chartHeight = 50;

    this.data = props.data || [];
    if (this.data.length) {
      this.data = this.graphLineToPercent(props.data);
    }
    // this.data = this.graphLineToPercent(props.data) || [];
    this.label = props.label || '';

    this.value = props.formatHeading ? props.formatHeading(props.value) : props.value;

    this.link = this.getLink(props['link']);



    this.graph = '';
    this.createGraph();

    this.formatHeading = props.formatHeading;
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
    let graphTemp = '';
    for (let h of this.data) {
      graphTemp = graphTemp +
      `<div style="--value:  ${h.value}" data-tooltip="${h.percent}"></div>`;
    }
    this.graph = graphTemp;
  }

  getLink(link) {
    return link ? `<a class="column-chart__link" href="${link}">View all</a>` : '';
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

  update(props) {
    self.prototype.constructor(props);
  }

}

// const defaultComponent = new ColumnChart();
// const element = document.getElementById("root");
//
// element.append(defaultComponent.element);
