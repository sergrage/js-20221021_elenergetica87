import RangePicker from './components/range-picker/src/index.js';
import SortableTable from './components/sortable-table/src/index.js';
import ColumnChart from './components/column-chart/src/index.js';
import header from './bestsellers-header.js';

import fetchJson from './utils/fetch-json.js';

const BACKEND_URL = 'https://course-js.javascript.ru/';

export default class Page {
  constructor() {
    this.render();
  }

  render() {
    const element = document.createElement("div"); // (*)
    element.innerHTML = this.getTemplate();
    this.element = element.firstElementChild;

    const from = new Date();
    const to = new Date();

    const rangePicker = new RangePicker({});

    this.ordersChart = new ColumnChart({
      url: 'api/dashboard/orders',
      label: 'orders',
      link: '#'
    });
    this.salesChart = new ColumnChart({
      url: 'api/dashboard/sales',
      label: 'sales',
      formatHeading: data => `$${data}`
    });
    this.customersChart = new ColumnChart({
      url: 'api/dashboard/customers',
      label: 'customers',
    });

    this.sortableTable = new SortableTable(header, {
      url: `api/dashboard/bestsellers?_start=1&_end=20&from=${from.toISOString()}&to=${to.toISOString()}`,
      isSortLocally: true
    });

    this.subElements.rangePicker.append(rangePicker.element);

    this.subElements.ordersChart.append(this.ordersChart.element);
    this.subElements.salesChart.append(this.salesChart.element);
    this.subElements.customersChart.append(this.customersChart.element);

    this.subElements.sortableTable.append(this.sortableTable.element);


    this.initEventListeners();
    return this.element;
  }

  async update(from, to) {
    await this.ordersChart.update(from, to);
    await this.salesChart.update(from, to);
    await this.customersChart.update(from, to);

    const url = new URL('api/dashboard/bestsellers', BACKEND_URL);
    url.searchParams.set('_start', '1');
    url.searchParams.set('_end', '21');
    url.searchParams.set('_sort', 'title');
    url.searchParams.set('_order', 'asc');
    url.searchParams.set('from', from.toISOString());
    url.searchParams.set('to', to.toISOString());

    const data = await fetchJson(url);

    this.sortableTable.update(data);

    if (data.length) {
      this.element.querySelector('.sortable-table').classList.remove('sortable-table_empty');
    }
  }

  initEventListeners () {
    this.subElements.rangePicker.addEventListener('date-select', event => {
      const { from, to } = event.detail;
      this.update(from, to);
    });
  }
  getTemplate() {
    return `
    <div class="dashboard">
      <div class="content__top-panel">
        <h2 class="page-title">Dashboard</h2>
        <!-- RangePicker component -->
        <div data-element="rangePicker"></div>
      </div>
      <div data-element="chartsRoot" class="dashboard__charts">
        <!-- column-chart components -->
        <div data-element="ordersChart" class="dashboard__chart_orders"></div>
        <div data-element="salesChart" class="dashboard__chart_sales"></div>
        <div data-element="customersChart" class="dashboard__chart_customers"></div>
      </div>

      <h3 class="block-title">Best sellers</h3>

      <div data-element="sortableTable">
        <!-- sortable-table component -->
      </div>
    </div>
    `;
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
  remove() {
    this.element.remove();
  }
  destroy() {
    this.remove();
    // NOTE: удаляем обработчики событий, если они есть
  }
}
