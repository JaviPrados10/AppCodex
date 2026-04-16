import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  exports: [MatToolbarModule, MatCardModule, MatButtonModule, MatExpansionModule, MatChipsModule]
})
export class MaterialModule {}
