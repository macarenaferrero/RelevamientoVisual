import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Foto } from 'src/app/clases/foto';
import { FotosService } from 'src/app/services/fotos.service';

@Component({
  selector: 'app-graficos-feos',
  templateUrl: './graficos-feos.component.html',
  styleUrls: ['./graficos-feos.component.scss'],
})
export class GraficosFeosComponent  implements  AfterViewInit,  OnInit {
  public misFotosFeas:any[]=[];
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
  this.cargarFotosFeas();
 }
async ngOnInit() {
}

async cargarFotosFeas(){
  this.misFotosFeas = [];
    this.fotoService.getListadoFotosFeasProm().then(resp => {
      if (resp.size > 0) {
        resp.forEach((foto: any) => {
          this.misFotosFeas.push(foto.data());
          this.labels.push(foto.data().usuarioEmail);
          this.votos.push(foto.data().votos);
          this.images.push(foto.data().imagen);
        })
      }
      this.ngAfterViewInit();
    });
}

async ngAfterViewInit() {
  if (this.misFotosFeas.length > 0) {
    this.barChartMethod();
  }
}


barChartMethod() {
  if (typeof Chart !== 'undefined') {
  Chart.defaults.plugins.legend.display = false;
  }
  this.barChart = new Chart(this.barCanvas.nativeElement, {
    type: 'bar',
    data: {
      labels: this.labels,
      datasets: [{
        label: 'Votos',
        data: this.votos,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true, // Esto puede causar un error, retíralo
          ticks: {
            stepSize: 1, // Especifica el tamaño del paso según tus necesidades
            callback: function (value, index, values) {
              // Puedes personalizar el formato de las etiquetas aquí
              return value.toString();
            }
          }
        }
      },
      onClick: (e) => {
        const activePoints = this.barChart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true);
        if (activePoints.length > 0) {
          var clickedElementindex = activePoints[0].index;
          var label = this.barChart.data.labels[clickedElementindex];
          this.selectedNiceImage = this.images[clickedElementindex];
        }
      }
    }
  });
}

}
