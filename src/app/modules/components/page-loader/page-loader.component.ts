import { Component } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';


@Component({
  selector: 'app-loader',
  template: `
    <div class="overlay" *ngIf="loaderService.loading$ | async">
      <div class="spinner"></div>
    </div>
  `,
  styleUrls: ['./page-loader.component.css']
})
export class PageLoaderComponent {

  constructor(public loaderService: LoaderService) {}

}
