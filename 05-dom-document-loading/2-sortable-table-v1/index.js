export default class SortableTable {
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;

    // this.hasTemplates = Object.fromEntries(
    //   this.headerConfig.filter(item => item.template).map(({id, template}) => [id, template])
    // );

    this.data = data;

    this.render();
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
    return this.headerConfig.map(item => {
      const arrowTemplate = `
        <span data-element="arrow" class="sortable-table__sort-arrow">
          <span class="sort-arrow"></span>
        </span>
      `;
      let arrow = item.sortable ? arrowTemplate : '';
      return `
        <div class="sortable-table__cell" data-id="${item.id}" data-sortable="${item.sortable}">
            <span>${item.title}</span>
            ${arrow}
        </div>
      `;
    }).join('');
  }
  getBodyTemplate() {
    const ids = this.headerConfig.map(x => x.id);
    // <img className="sortable-table-image" alt="Image" src="${item?.images[0]?.url || 'https://via.placeholder.com/32'}">
    return this.data.map(item => {
      let cell = ids.map(x => {
        if (item[x].template) {
          return item[x].template(item[x]);
        } else {
          return `<div class="sortable-table__cell">${item[x]}</div>`;
        }
      }).join('');

      console.log('cell', cell);

      return `
      <a href="/products/${item.id}" class="sortable-table__row">
        ${cell}
      </a>
    `;
    }).join('');
  }
  applyTemplate(record, key){

  }

  initEventListeners() {
  }

  sort(fieldValue, orderValue) {
    const sortType = this.headerConfig.find(x => x.id === fieldValue).sortType;
    if (sortType === 'string') {
      this.data = this.sortStrings(this.data, fieldValue, orderValue);
    }
    if (sortType === 'number') {
      this.data = this.sortNumbers(this.data, fieldValue, orderValue);
    }

    this.element.innerHTML = this.getTemplate();
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
    const element = document.createElement("div");
    element.innerHTML = this.getBodyTemplate();
    return {body: element};
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    // NOTE: удаляем обработчики событий, если они есть
  }
}

