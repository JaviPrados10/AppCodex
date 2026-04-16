import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

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
  readonly githubUrl = 'https://github.com/';
  readonly navItems: NavItem[] = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'experiencia', label: 'Experiencia' },
    { id: 'competencias', label: 'Skills' },
    { id: 'formacion', label: 'Formación' },
    { id: 'idiomas', label: 'Idiomas' },
    { id: 'otros', label: 'Cursos' },
    { id: 'contacto', label: 'Contacto' }
  ];
  readonly highlightedStack: string[] = ['Angular', 'TypeScript', 'Spring Boot', 'Microfrontends', 'Karma/Jasmine', 'Git'];

  activeSection = 'inicio';
  isDarkMode = false;

  private sectionObserver?: IntersectionObserver;
  private revealObserver?: IntersectionObserver;

  constructor(
    private readonly title: Title,
    private readonly meta: Meta
  ) {}

  ngOnInit(): void {
    const storedTheme = localStorage.getItem(this.themeStorageKey);
    this.isDarkMode = storedTheme ? storedTheme === 'dark' : false;
    this.applyTheme();
    this.configureSeo();
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
    const cvExport = this.buildCvExport();
    const blob = new Blob([cvExport], { type: 'text/plain;charset=utf-8' });
    const fileUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = fileUrl;
    link.download = `CV-${this.cvData.name.replace(/\s+/g, '-')}.txt`;
    link.click();

    URL.revokeObjectURL(fileUrl);
  }

  openContactEmail(): void {
    const subject = encodeURIComponent('Contacto profesional desde CV online');
    const body = encodeURIComponent('Hola Javier,%0D%0A%0D%0ATe contacto tras revisar tu portfolio online.');
    window.location.href = `mailto:${this.cvData.contact.email}?subject=${subject}&body=${body}`;
  }

  isActiveSection(sectionId: string): boolean {
    return this.activeSection === sectionId;
  }

  private applyTheme(): void {
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }

  private configureSeo(): void {
    const title = `${this.cvData.name} | ${this.cvData.mainRole} | Portfolio Profesional`;
    const description =
      'Portfolio y CV online de Javier Prados Casquel, desarrollador Angular con experiencia en frontend enterprise, integración backend y buenas prácticas de calidad.';

    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
  }

  private buildCvExport(): string {
    const experienceText = this.cvData.experience
      .map(
        (item) =>
          `- ${item.dateRange} | ${item.company} | ${item.role}\n` +
          `  Responsabilidades: ${item.responsibilities.join('; ')}\n` +
          `  Stack: ${item.stackHighlights.join(', ')}`
      )
      .join('\n\n');

    const educationText = this.cvData.education
      .map((item) => `- ${item.degree} | ${item.institution} | ${item.date}`)
      .join('\n');

    const coursesText = this.cvData.courses
      .map((item) => `- ${item.title} (${item.hours ?? 'Sin especificar'}) - ${item.provider}`)
      .join('\n');

    return [
      `${this.cvData.name}`,
      `${this.cvData.mainRole}`,
      '',
      'RESUMEN PROFESIONAL',
      this.cvData.professionalSummary,
      '',
      'CONTACTO',
      `Email: ${this.cvData.contact.email}`,
      `Teléfono móvil: ${this.cvData.contact.mobilePhone}`,
      `Teléfono fijo: ${this.cvData.contact.landlinePhone}`,
      `Ubicación: ${this.cvData.contact.address}`,
      `Nacionalidad: ${this.cvData.contact.nationality}`,
      '',
      'EXPERIENCIA',
      experienceText,
      '',
      'SKILLS',
      this.cvData.technicalSkills.join(', '),
      '',
      'FORMACIÓN',
      educationText,
      '',
      'IDIOMAS',
      this.cvData.languages.join(', '),
      '',
      'CURSOS',
      coursesText,
      '',
      'OTROS DATOS',
      this.cvData.otherDetails.join('\n')
    ].join('\n');
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
