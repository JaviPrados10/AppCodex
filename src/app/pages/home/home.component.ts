import { AfterViewInit, ChangeDetectorRef, Component, HostListener, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { CV_DATA } from '../../data/cv.data';
import { CvProfile } from '../../models/cv.model';

interface NavItem {
  id: string;
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
    { id: 'inicio' },
    { id: 'experiencia' },
    { id: 'skills' },
    { id: 'formacion' },
    { id: 'idiomas' },
    { id: 'otros' },
    { id: 'contacto' }
  ];
  readonly highlightedStack: string[] = ['Angular', 'TypeScript', 'Spring Boot', 'Microfrontends', 'Karma/Jasmine', 'Git'];

  activeSection = 'inicio';
  isDarkMode = false;
  isNavbarScrolled = false;
  isPrintMode = false;
  isMobileMenuOpen = false;

  private sectionObserver?: IntersectionObserver;
  private revealObserver?: IntersectionObserver;
  private isPrinting = false;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly ngZone: NgZone,
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

  async downloadCv(): Promise<void> {
    if (this.isPrinting) {
      return;
    }

    this.isPrinting = true;
    this.isPrintMode = true;
    this.changeDetectorRef.detectChanges();

    await this.waitForFullRender();
    window.print();
    setTimeout(() => this.onAfterPrint(), 1500);
  }

  openContactEmail(): void {
    const subject = encodeURIComponent('Contacto profesional desde CV online');
    const body = encodeURIComponent('Hola Javier,%0D%0A%0D%0ATe contacto tras revisar tu portfolio online.');
    window.location.href = `mailto:${this.cvData.contact.email}?subject=${subject}&body=${body}`;
  }

  onNavLinkClick(event: Event, sectionId: string): void {
    event.preventDefault();

    const target = document.getElementById(sectionId);
    if (!target) {
      return;
    }

    const headerOffset = 108;
    const elementPosition = target.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: Math.max(0, elementPosition - headerOffset),
      behavior: 'smooth'
    });
  }

  onMobileNavLinkClick(event: Event, sectionId: string): void {
    this.onNavLinkClick(event, sectionId);
    this.isMobileMenuOpen = false;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  onMobileDownloadClick(): void {
    this.isMobileMenuOpen = false;
    void this.downloadCv();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isNavbarScrolled = window.scrollY > 18;
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (window.innerWidth > 768 && this.isMobileMenuOpen) {
      this.isMobileMenuOpen = false;
    }
  }

  @HostListener('window:afterprint')
  onAfterPrint(): void {
    this.isPrintMode = false;
    this.isPrinting = false;
    this.changeDetectorRef.detectChanges();
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

  private waitForFullRender(): Promise<void> {
    return new Promise((resolve) => {
      this.ngZone.runOutsideAngular(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => resolve());
        });
      });
    });
  }
}
