import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <main class="container">
      <h1>Hola</h1>
    </main>
  `
})
class AppComponent {}

bootstrapApplication(AppComponent, {
  providers: [provideRouter([])]
}).catch((err) => console.error(err));
