import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { singleBar, multiBar, multiLine } from './data';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // single: any[];
  view: any[] = [300, 400];

  single: any = [
    {
      name: 'Unspecified',
      value: 10,
      index: 0,
      extra: {
        color: 'Unspecified',
      },
    },
    {
      name: 'Vegetation Fire',
      value: 25,
      index: 1,
      extra: {
        color: 'Vegetation',
      },
    },
    {
      name: 'Training',
      value: 32,
      index: 2,
      extra: {
        color: 'Training',
      },
    },
    {
      name: 'Vehicle Fire',
      value: 18,
      index: 3,
      extra: {
        color: 'Vehicle',
      },
    },
    {
      name: 'Structure Fire',
      value: 22,
      index: 4,
      extra: {
        color: 'Structure',
      },
    },
  ];

  // options
  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = false;
  isDoughnut: boolean = true;
  legendPosition: string = 'below';

  name = 'Total Incidents';
  value = '107';

  colorScheme = {
    domain: ['#c9c9c9', '#58b4cd', '#9247b4', '#45ae94', '#fa631d'],
  };

  constructor() {
    this.getCalculate();
    Object.assign(this, { multiLine });
  }
  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    this.colorSchemeBar = {
      domain: [JSON.parse(JSON.stringify(data)).extra.color],
    };
    Object.assign(this, { singleBar });
  }

  onActivate(data): void {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));
    this.name = JSON.parse(JSON.stringify(data)).value.name;
    let temp = JSON.parse(JSON.stringify(data)).value.value;
    this.value = ((Number(this.value) * temp) / 100).toString() + `%`;
    Object.assign(this, {}); //
  }

  onDeactivate(data): void {
    this.name = 'Total Incidents';
    this.value = '107';
    this.getCalculate();
    Object.assign(this, {});
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  getCalculate() {
    const initialValue = 0;
    this.value = this.single
      .map((s) => {
        return s.value;
      })
      .reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue
      )
      .toString();
    this.single = this.single.map((s, index) => {
      index = index % 5;
      return {
        ...s,
        extra: {
          color: this.colorScheme.domain[index],
        },
        value: 10,
        // value: Math.round(s.value * Number(this.value)) / 100,
      };
    });
    Object.assign(this, this.single);
  }

  singleBar: any[];
  multiBar: any[];

  viewBar: any[] = [600, 400];

  // options
  showXAxisBar = true;
  showYAxisBar = true;
  gradientBar = false;
  showLegendBar = false;
  showXAxisLabelBar = true;
  // xAxisLabelBar = 'Country';
  showYAxisLabelBar = true;
  // yAxisLabelBar = 'Population';

  colorSchemeBar = {
    domain: ['#c9c9c9', '#58b4cd', '#9247b4', '#45ae94', '#fa631d'],
  };

  onSelectBar(event) {
    console.log(event);
  }

  //
  multiLine: any[];
  viewLine: any[] = [600, 300];

  // options
  legendLine: boolean = false;
  showLabelsLine: boolean = true;
  animationsLine: boolean = true;
  xAxisLine: boolean = true;
  yAxisLine: boolean = true;
  showYAxisLabelLine: boolean = true;
  showXAxisLabelLine: boolean = true;
  xAxisLabelLine: string = 'Year';
  yAxisLabelLine: string = 'Population';
  timelineLine: boolean = true;

  colorSchemeLine = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  onSelectLine(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivateLine(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivateLine(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  getColor(elem) {
    alert(elem.style.backgroundColor);
  }
}
