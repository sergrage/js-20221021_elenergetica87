export default class ColumnChart {
  // было бы неплохо для init задать значение по умолчанию
  // ну а более удачным именем будет "options", "props", "params" итд.
  constructor(init) {
    // почему используется "??" оператор а не "||"?
    this.data = init.data ? this.graphLineToPercent(init.data) : [];
    // а если мы не передадим в ColumnChart параметр при вызове new ColumnChart()
    // будет падать ошибка, так как init будет равен `undefined`
    this.label = init.label ? init.label : ''; 
    this.value = init.value ? init.value : '';
    this.link = init['link'] ? init['link'] : '';

    // 
    this.formatHeading = init.formatHeading;

    console.log(this.formatHeading);

    this.element = document.createElement('div');
    this.render();
  }
  // getAttribute(name) {
  //   return
  // }
  render() {
    this.element.classList.add('column-chart');
    
    if (this.data.length === 0) {
      this.element.classList.add('column-chart_loading');
    }
    
    this.element.setAttribute('style', `--chart-height: 50`);

    // тут объявление должно быть через `const`
    
    // все эти элементы нужно собрать через шаблонную строку,
    // а не через метод "createElement"
    // "createElement" следует использовать только для для создания эл-та на к-м вызовем метод `innerHTML`
    
    let title = document.createElement('div');
    let link = document.createElement('a');
    let chartContainer = document.createElement('div');
    let chartHeader = document.createElement('div');

    title.classList.add('column-chart__title');
    title.innerText = this.label;

    link.classList.add('column-chart__link');
    link.setAttribute('href', this.link);
    link.innerText = 'View all';
    
    if (this.link.length > 0) {
      title.append(link);
    }
    
    this.element.append(title);

    chartHeader.classList.add('column-chart__header');
    chartHeader.setAttribute('data-element', 'header');
    chartHeader.innerHTML = `${this.value}`;
    chartContainer.classList.add('column-chart__container');
    chartContainer.append(chartHeader);

    chartContainer.append(this.createGraph());
    this.element.append(chartContainer);
  }

  createGraph() {
    // const graph
    let graph = document.createElement('div');
    graph.classList.add('column-chart__chart');
    graph.setAttribute('data-element', 'body');
    
    // const h
    for (let h of this.data) {
      let div = document.createElement('div');
      div.setAttribute('style', `--value: ${h.value}`);
      div.setAttribute('data-tooltip', `${h.percent}`);
      graph.append(div);
    }
    return graph;
  }

  graphLineToPercent(data) {
    const maxValue = Math.max(...data);
    // что такое 50?
    const scale = 50 / maxValue;
    return data.map(item => {
      return {
        percent: (item / maxValue * 100).toFixed(0) + '%',
        value: String(Math.floor(item * scale))
      };
    });
  }

  update() {

  }

}
