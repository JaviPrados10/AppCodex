import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'cv-interactivo',
    loadComponent: () =>
      import('./features/interactive-cv/pages/cv-interactive-page/cv-interactive-page.component').then(
        (m) => m.CvInteractivePageComponent
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
