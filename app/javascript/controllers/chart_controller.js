import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = []

  connect(){
    let ctx = document.getElementById('jschart');
    this.values = [];
    this.chart_type = 'bar'
    this.labels = [];
    this.datasets = [];
    this.display_title = false;
    this.display_grid = false;
    this.suggested_max = 0; //magic default number
    this.pad_top = 0;
    this.pad_left = 0;
    this.pad_bottom = 0;
    this.pad_right = 0;
  }

  xTickCallback() {

  }

  yTickCallback() {

  }

  createChart() {

    this.genChart = new Chart(ctx, {
      type: this.chart_type,
      data: {
        labels: this.labels,
        datasets: this.datasets,
      },
      options: {
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          title: {
            display: this.display_title,
          },
          tooltip: {
            enabled: false,
            position: 'nearest',
            external: this.externalTool,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: this.yTickCallback,
            },
            suggestedMax: this.suggested_max,
          },
          x: {
            ticks: {
              callback: this.xTickCallback,
            },
            grid: {
              display: this.display_grid,
            },
          },
        },
        layout: {
          padding: {
            top: this.pad_top,
            left: this.pad_left,
            bottom: this.pad_bottom,
            right: this.pad_right,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: true,
        },
      },
    });

    document.fonts.onloadingdone = () => {
      this.genChart.update();
    };
  }

  setValues() {

  }

  getOrCreateTooltip = (chart)  => {
    let tooltipEl = chart.canvas.parentNode.querySelector('div');

    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.style.background = 'rgba(4, 47, 46, 1)';
      tooltipEl.style.borderRadius = '10px';
      tooltipEl.style.color = 'white';
      tooltipEl.style.opacity = 1;
      tooltipEl.style.pointerEvents = 'none';
      tooltipEl.style.position = 'absolute';
      tooltipEl.style.transform = 'translate(-50%, 0)';
      tooltipEl.style.transition = 'all .2s ease';

      const table = document.createElement('table');
      table.style.margin = '0px';

      tooltipEl.appendChild(table);
      chart.canvas.parentNode.appendChild(tooltipEl);
    }

    return tooltipEl;
  };

  externalTool = (context) => {
    // Tooltip Element
    const { chart, tooltip } = context;
    const tooltipEl = this.getOrCreateTooltip(chart);

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = 0;
      return;
    }

    // Set Text
    if (tooltip.body) {
      const titleLines = tooltip.title || [];
      const bodyLines = tooltip.body.map((b) => b.lines);

      const tableHead = document.createElement('thead');

      titleLines.forEach((title) => {
        const tr = document.createElement('tr');
        tr.style.borderWidth = 0;

        const th = document.createElement('th');
        th.style.borderWidth = 0;
        const text = document.createTextNode(`${title} year total`);
        th.style.textDecoration = 'underline';

        th.appendChild(text);
        tr.appendChild(th);
        tableHead.appendChild(tr);
      });

      const tableBody = document.createElement('tbody');
      bodyLines.forEach((body, i) => {
        const tr = document.createElement('tr');
        tr.style.backgroundColor = '#042f2e';
        tr.style.borderWidth = 0;
        tr.style.display = 'flex';
        tr.style.justifyContent = 'center';

        const td = document.createElement('td');
        td.style.borderWidth = 0;
        td.style.fontFamily = '"Raleway", sans-serif';
        td.style.fontSize = '1rem';
        td.style.fontWeight = 'bold';
        let text;
        if(i == 0)
          text = document.createTextNode(`$${body} spent`);
        else
          text = document.createTextNode(`$${body} saved`);

        td.appendChild(text);
        tr.appendChild(td);
        tableBody.appendChild(tr);
      });

      const tableRoot = tooltipEl.querySelector('table');

      // Remove old children
      while (tableRoot.firstChild) {
        tableRoot.firstChild.remove();
      }

      // Add new children
      tableRoot.appendChild(tableHead);
      tableRoot.appendChild(tableBody);
    }

    const { offsetLeft: positionX, offsetTop: positionY } =
      chart.canvas;

    let ctx = document.getElementById('monthlypowerchart');

    let finalColAdjustmentX = 0;
    let finalColAdjustmentY = tooltip.height;

    if (tooltip.title[0] === '15' && ctx.clientWidth < 573) {
      finalColAdjustmentX = tooltip.width / 5;
      finalColAdjustmentY *= 0.8;
    }

    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left =
      positionX + tooltip.caretX - finalColAdjustmentX + 'px';
    tooltipEl.style.top =
      positionY + tooltip.caretY - finalColAdjustmentY + 'px';
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding =
      tooltip.options.padding +
      'px ' +
      tooltip.options.padding +
      'px';
    tooltipEl.style.width = 'fit-content';
    tooltipEl.style.blockSize = 'fit-content';
    tooltipEl.style.whiteSpace = 'nowrap';
    tooltipEl.style.backgroundColor = '#092038';
  };
}