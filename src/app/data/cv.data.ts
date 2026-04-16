import { CvProfile } from '../models/cv.model';

export const CV_DATA: CvProfile = {
  name: 'Javier Prados Casquel',
  mainRole: 'Desarrollador Angular',
  professionalSummary:
    'Desarrollador Angular con experiencia en frontend, integración con backend, microservicios, testing y trabajo en entornos ágiles. Experiencia en sector público, entornos empresariales y microfrontends, con foco en mantenibilidad, calidad de código y buenas prácticas.',
  contact: {
    address: 'C/ Bélgica, 51, Pinto (Madrid)',
    mobilePhone: '+34 687825164',
    landlinePhone: '+34 912994010',
    email: 'javi.prados.casquel@gmail.com',
    birthDate: '02/06/1996',
    nationality: 'Española'
  },
  experience: [
    {
      company: 'Panel Sistemas Informáticos S.L.',
      dateRange: 'Abril 2018 – Mayo 2019',
      role: 'Desarrollador en varios proyectos',
      responsibilities: [
        'Diseño de diagramas UML lógicos y físicos',
        'Desarrollo y mantenimiento del sistema GEAR (NGAA) para Ericsson',
        'Implementación en Java, XML y entorno Linux con SQL Developer',
        'Pruebas funcionales y de integración con SoapUI',
        'Participación en proyecto de domótica con Angular y Spring'
      ],
      stackHighlights: ['Java', 'XML', 'Linux', 'SQL Developer', 'SoapUI', 'Angular', 'Spring']
    },
    {
      company: 'Alten',
      dateRange: 'Junio 2019 – Octubre 2022',
      role: 'Desarrollador en varios proyectos',
      responsibilities: [
        'Desarrollo de aplicaciones para el Ministerio de Política Territorial',
        'Liderazgo técnico del frontend',
        'Desarrollo con HTML5, CSS3, Bootstrap, JavaScript, jQuery y Thymeleaf',
        'Colaboración backend con Java 8 y Spring Boot',
        'Desarrollo y mantenimiento de microservicios',
        'Trabajo en equipos ágiles'
      ],
      stackHighlights: ['HTML5', 'CSS3', 'Bootstrap', 'JavaScript', 'jQuery', 'Thymeleaf', 'Java 8', 'Spring Boot']
    },
    {
      company: 'Arelance',
      dateRange: 'Noviembre 2022 – Diciembre 2022',
      role: 'Desarrollador Angular',
      responsibilities: [
        'Desarrollo de aplicaciones para Aqualia',
        'Implementación frontend con Angular 10',
        'Integración con arquitectura de microservicios en .NET',
        'Coordinación con backend y QA en entornos ágiles'
      ],
      stackHighlights: ['Angular 10', '.NET', 'Microservicios', 'Agile']
    },
    {
      company: 'Nttdata',
      dateRange: 'Marzo 2022 – Julio 2025',
      role: 'Desarrollador Angular',
      responsibilities: [
        'Desarrollo de soluciones para IGAE',
        'Diseño e implementación de interfaces en Angular 10, 12, 14 y 16',
        'Integración con backend Spring Boot',
        'Participación en análisis funcional, desarrollo y validación',
        'Mejora continua del código mediante buenas prácticas y revisión de calidad',
        'Uso de Copilot para optimizar desarrollo',
        'Test unitarios Angular con Karma/Jasmine',
        'Automatización de test con Copilot'
      ],
      stackHighlights: ['Angular 10/12/14/16', 'Spring Boot', 'Karma', 'Jasmine', 'Copilot']
    },
    {
      company: 'AirON Group',
      dateRange: 'Septiembre 2025 – Actualidad',
      role: 'Desarrollador Angular',
      responsibilities: [
        'Desarrollo de aplicaciones en Angular para cliente Indra-Mapfre',
        'Trabajo en arquitectura de microfrontends',
        'Implementación de un orquestador de llamadas con backend en Spring Boot',
        'Uso de Jira, Sonar, Jenkins y Git',
        'Participación en decisiones técnicas y diseño de soluciones escalables',
        'Mejora de la calidad del código mediante análisis estático y buenas prácticas',
        'Uso de Copilot',
        'Test unitarios Angular con Karma/Jasmine',
        'Automatización de test con Copilot'
      ],
      stackHighlights: ['Angular', 'Microfrontends', 'Spring Boot', 'Jira', 'Sonar', 'Jenkins', 'Git', 'Karma/Jasmine']
    }
  ],
  education: [
    {
      degree: 'CF. Grado Superior en Desarrollo de Aplicaciones Web',
      institution: 'IES Valle del Miro (Valdemoro)',
      date: 'Junio 2018'
    },
    {
      degree: 'CF. Grado Medio Sistemas Microinformáticos y Redes',
      institution: 'IES Valle del Miro (Valdemoro)',
      date: 'Junio 2016'
    },
    {
      degree: 'Ingeniería Informática',
      institution: 'Universitat Oberta de Catalunya',
      date: 'Septiembre 2019 - Actual'
    }
  ],
  technicalSkills: [
    'Java',
    'JavaScript',
    'jQuery',
    'Angular 4',
    'Spring Boot',
    'Thymeleaf',
    'HTML5',
    'CSS3',
    'Bootstrap',
    'SCSS',
    'MySQL',
    'Git',
    'Subversion'
  ],
  languages: ['Inglés A2 (no certificado)'],
  courses: [
    {
      title: 'Curso de Java',
      hours: '15 horas',
      provider: 'Panel Sistemas Informáticos'
    },
    {
      title: 'Curso de Spring',
      hours: '20 horas',
      provider: 'Panel Sistemas Informáticos'
    },
    {
      title: 'Curso de Angular 4',
      hours: '25 horas',
      provider: 'Panel Sistemas Informáticos'
    },
    {
      title: 'Curso Copilot',
      provider: 'AirON Group / Indra'
    }
  ],
  otherDetails: ['Carnet de conducir clase B']
};
