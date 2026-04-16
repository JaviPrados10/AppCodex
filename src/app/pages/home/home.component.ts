import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

import { CV_DATA } from '../../data/cv.data';
import { CvProfile } from '../../models/cv.model';

interface NavItem {
  id: string;
  label: string;
}

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly cvData: CvProfile = CV_DATA;
  readonly themeStorageKey = 'cv-theme';
  readonly navItems: NavItem[] = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'experiencia', label: 'Experiencia' },
    { id: 'competencias', label: 'Skills' },
    { id: 'formacion', label: 'Formación' },
    { id: 'idiomas', label: 'Idiomas' },
    { id: 'otros', label: 'Cursos' }
  ];
  readonly highlightedStack: string[] = ['Angular', 'TypeScript', 'Spring Boot', 'Microfrontends', 'Karma/Jasmine', 'Git'];

  activeSection = 'inicio';
  isDarkMode = false;

  private sectionObserver?: IntersectionObserver;
  private revealObserver?: IntersectionObserver;

  ngOnInit(): void {
    const storedTheme = localStorage.getItem(this.themeStorageKey);
    this.isDarkMode = storedTheme ? storedTheme === 'dark' : false;
    this.applyTheme();
  }

  ngAfterViewInit(): void {
    this.initSectionObserver();
    this.initRevealObserver();
  }

  ngOnDestroy(): void {
    this.sectionObserver?.disconnect();
    this.revealObserver?.disconnect();
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem(this.themeStorageKey, this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  downloadCv(): void {
    window.print();
  }

  isActiveSection(sectionId: string): boolean {
    return this.activeSection === sectionId;
  }

  private applyTheme(): void {
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }

  private initSectionObserver(): void {
    const sections = this.navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target?.id) {
          this.activeSection = visibleEntry.target.id;
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.2, 0.45, 0.7]
      }
    );

    sections.forEach((section) => this.sectionObserver?.observe(section));
  }

  private initRevealObserver(): void {
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

    this.revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.1
      }
    );

    revealElements.forEach((item) => this.revealObserver?.observe(item));
  }
}
