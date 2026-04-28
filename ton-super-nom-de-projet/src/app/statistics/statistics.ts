import { Component, ElementRef, ViewChild, AfterViewInit, inject } from '@angular/core';
import { MoviesApi } from '../services/movies-api';
import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';

Chart.register(...registerables);

@Component({
  selector: 'app-statistics',
  imports: [CommonModule],
  templateUrl: './statistics.html',
  styleUrl: './statistics.scss',
})
export class Statistics implements AfterViewInit {
  private readonly moviesApi = inject(MoviesApi);
  
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  chart: any;

  ngAfterViewInit() {
    this.moviesApi.getMovies().subscribe((movies) => {
      const sortedMovies = [...movies].sort((a, b) => (b.rate || 0) - (a.rate || 0));
      
      const labels = sortedMovies.map(m => m.title);
      const data = sortedMovies.map(m => m.rate || 0);

      this.chart = new Chart(this.chartCanvas.nativeElement, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Movie Ratings',
            data: data,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 5
            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Movies by Rating'
            }
          }
        }
      });
    });
  }
}
