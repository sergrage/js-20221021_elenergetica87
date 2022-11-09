export default class SortableTable {
  constructor(headersConfig = [], {
    data = [],
    sorted = {
      id: headerConfig.find(item => item.sortable).id,
      order: 'asc'
    }
  } = {}) {
    this.headersConfig = headersConfig;
    this.sorted = sorted;
    this.data = data;


    this.render();

    this.sort(this.sorted.id, this.sorted.order);
    this.element.innerHTML = this.getTemplate();

    this.isSortLocally = true;
    this.initEventListeners();
  }
  getTemplate() {
    return `
      <div data-element="productsContainer" class="products-list__container">
        <div class="sortable-table">
            <div data-element="header" class="sortable-table__header sortable-table__row">
                ${this.getHeaderTemplate()}
            </div>
            <div data-element="body" class="sortable-table__body">
                ${this.getBodyTemplate()}
            </div>
            <div data-element="loading" class="loading-line sortable-table__loading-line"></div>
            <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
              <div>
                <p>No products satisfies your filter criteria</p>
                <button type="button" class="button-primary-outline">Reset all filters</button>
              </div>
            </div>
          </div>
      </div>
    `;
  }
  render() {
    const element = document.createElement("div");
    element.innerHTML = this.getTemplate();
    this.element = element.firstElementChild;
  }
  getHeaderTemplate() {
    return this.headersConfig.map(item => {
      const arrowTemplate = `
        <span data-element="arrow" class="sortable-table__sort-arrow">
          <span class="sort-arrow"></span>
        </span>
      `;
      const arrow = item.sortable ? arrowTemplate : '';
      return `
        <div class="sortable-table__cell" data-id="${item.id}" data-sortable="${item.sortable}">
            <span>${item.title}</span>
            ${arrow}
        </div>
      `;
    }).join('');
  }
  getBodyTemplate() {
    const ids = this.headersConfig.map(x => x.id);
    return this.data.map(item => {
      const tableCells = ids.map(id => {
        const headerItem = this.headersConfig.find(x => x.id === id);
        if (headerItem.hasOwnProperty('template') && item[id]) {
          return headerItem.template(item[id]);
        } else {
          return `<div class="sortable-table__cell">${item[id]}</div>`;
        }
      }).join('');
      return `
      <a href="/products/${item.id}" class="sortable-table__row">
        ${tableCells}
      </a>
    `;
    }).join('');
  }

  initEventListeners() {
    this.subElements.header.addEventListener('pointerdown', this.sortClick);
  }

  sortClick = (event) => {
    const el = event.target.closest('[data-sortable="true"]');
    if (el) {
      const { id } = el.dataset;
      this.sorted.id = id;
      this.sorted.order = this.sorted.order === 'asc' ? 'desc' : 'asc';
      this.sort(this.sorted.id, this.sorted.order);
      this.subElements.body.innerHTML = this.getBodyTemplate();
    }
  }

  sort(fieldValue, orderValue) {
    const sortType = this.headersConfig.find(x => x.id === fieldValue).sortType;
    this.data = (sortType === 'string') ? this.sortStrings(this.data, fieldValue, orderValue) : this.sortNumbers(this.data, fieldValue, orderValue);
  }
  sortStrings(arr, field, order) {
    const sortState = {
      'asc': 1,
      'desc': -1
    };
    const sortDirection = sortState[order];
    return [...arr].sort((a, b) => {
      return sortDirection * a[field].localeCompare(b[field], ['ru', 'en'], {caseFirst: 'upper'});
    });
  }
  sortNumbers(arr, field, order) {
    const sortState = {
      'asc': 1,
      'desc': -1
    };
    const sortDirection = sortState[order];
    return [...arr].sort((a, b) => {
      return sortDirection * (a[field] - b[field]);
    });
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
