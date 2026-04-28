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
    const style = getComputedStyle(document.documentElement);
    const accentColor = style.getPropertyValue('--accent').trim() || '#3b82f6';
    const textColor = style.getPropertyValue('--text').trim() || '#f1f5f9';
    const mutedColor = style.getPropertyValue('--muted').trim() || '#64748b';
    const borderColor = style.getPropertyValue('--border').trim() || 'rgba(255, 255, 255, 0.1)';

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
            backgroundColor: accentColor + '80', // 50% opacity
            borderColor: accentColor,
            borderWidth: 1,
            borderRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 5,
              grid: {
                color: borderColor
              },
              ticks: {
                color: mutedColor
              }
            },
            x: {
              grid: {
                display: false
              },
              ticks: {
                color: mutedColor
              }
            }
          },
          plugins: {
            legend: {
              labels: {
                color: textColor
              }
            },
            title: {
              display: true,
              text: 'Movies by Rating',
              color: textColor,
              font: {
                size: 16,
                weight: 'bold'
              }
            }
          }
        }
      });
    });
  }
}
