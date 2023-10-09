import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Foto } from 'src/app/clases/foto';
import { FotosService } from 'src/app/services/fotos.service';
import { Chart } from 'chart.js';
import { PieController } from 'chart.js';
import { ArcElement } from 'chart.js';

Chart.register(ArcElement);
Chart.register(PieController);

@Component({
  selector: 'app-graficos-lindas',
  templateUrl: './graficos-lindas.component.html',
  styleUrls: ['./graficos-lindas.component.scss'],
})
export class GraficosLindasComponent  implements  AfterViewInit, OnInit {
  public misFotosLindas:any[]=[];
  public labels:string[]=[];
  public votos:number[]=[];
  public images:string[]=[];
  public selectedNiceImage:any;

  @ViewChild('barCanvas') private barCanvas!: ElementRef;
  @ViewChild('doughnutCanvas') private doughnutCanvas!: ElementRef;
  @ViewChild('lineCanvas') private lineCanvas!: ElementRef;

  barChart: any;
  doughnutChart: any;
  lineChart: any;

  constructor(public fotoService:FotosService) {

  this.getFotoslindas();

 }
async ngOnInit() {}

getFotoslindas() {
  this.misFotosLindas = [];
  this.fotoService.getListadoFotosLindasProm().then(resp => {
    if (resp.size > 0) {
      resp.forEach((foto: any) => {
        this.misFotosLindas.push(foto.data());
        this.labels.push(foto.data().usuarioEmail);
        this.votos.push(foto.data().votos);
        this.images.push(foto.data().imagen);
      })
    }
    this.ngAfterViewInit();
  });
}

async ngAfterViewInit() {
  if (this.misFotosLindas.length > 0) {
    this.doughnutChartMethod();
  }
}

doughnutChartMethod() {
  this.selectedNiceImage = '';
  this.misFotosLindas.sort((a,b) => (a.votos > b.votos) ? -1 : (b.votos> a.votos) ? 1:0);
this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
  type: 'pie',
  data: {
    labels: this.labels,
    datasets: [{
      label: '# of Votes',
      data: this.votos,
      backgroundColor: [
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)'
      ],
      hoverBackgroundColor: [
        '#FFCE56',
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#FF6384'
      ]
    }],

  },
  options: {
    responsive: true,

    onClick: (e) => {
      const activePoints = this.doughnutChart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true);
      if (activePoints.length > 0) {

        var clickedElementindex = activePoints[0].index;
        var label = this.doughnutChart.data.labels[clickedElementindex];
        this.selectedNiceImage = this.images[clickedElementindex];
      }
    }
  }
});
}

}
