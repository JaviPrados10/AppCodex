import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { CertificationsSectionComponent } from './components/certifications-section/certifications-section.component';
import { CvHeaderComponent } from './components/cv-header/cv-header.component';
import { EducationSectionComponent } from './components/education-section/education-section.component';
import { ExperienceListComponent } from './components/experience-list/experience-list.component';
import { LanguagesSectionComponent } from './components/languages-section/languages-section.component';
import { SkillsSectionComponent } from './components/skills-section/skills-section.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CvHeaderComponent,
    ExperienceListComponent,
    EducationSectionComponent,
    SkillsSectionComponent,
    LanguagesSectionComponent,
    CertificationsSectionComponent
  ],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, MaterialModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
