import { IconShoe, IconHorse, IconHouse } from '../UI';

export const links = [
  {
    icon: <IconShoe className="w-9 h-9 md:h-8 md:w-8 lg:h-9 lg:w-9" />,
    label: 'Aktiviteter',
    slug: 'aktiviteter',
    subLinks: [
      {
        label: 'Anslagstavlan',
        slug: 'anslagstavlan',
      },
      {
        label: 'Kalender',
        slug: 'kalender',
      },
      {
        label: 'Schema',
        slug: 'schema',
      },
    ],
  },
  {
    icon: <IconHorse className="w-9 h-9 md:h-8 md:w-8 lg:h-9 lg:w-9" />,
    label: 'Ridskolan',
    slug: 'ridskolan',
    subLinks: [
      {
        label: 'Introduktion',
        slug: 'introduktion',
      },
      {
        label: 'Utbildningsplan',
        slug: 'utbildningsplan',
      },
      {
        label: 'Prislista',
        slug: 'prislista',
      },
      {
        label: 'Personal',
        slug: 'personal',
      },
      {
        label: 'Hästar',
        slug: 'hastar',
      },
      {
        label: 'Kontakt',
        slug: 'kontakt',
      },
      {
        label: 'Frågor',
        slug: 'fragor',
      },
    ],
  },
  {
    icon: <IconHouse className="w-9 h-9 md:h-8 md:w-8 lg:h-9 lg:w-9" />,
    label: 'Föreningen',
    slug: 'foreningen',
    subLinks: [
      {
        label: 'Om Oss',
        slug: 'om-oss',
      },
      {
        label: 'Vision & Policy',
        slug: 'vision-policy',
      },
      {
        label: 'Bli Medlem',
        slug: 'medlem',
      },
      {
        label: 'Sektioner',
        slug: 'sektioner',
      },
      {
        label: 'Styrelsen',
        slug: 'styrelsen',
      },
    ],
  },
];
