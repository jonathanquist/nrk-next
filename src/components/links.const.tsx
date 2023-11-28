import { IconHorse } from '../../public/images/IconHorse';
import { IconHouse } from '../../public/images/IconHouse';
import { IconShoe } from '../../public/images/IconShoe';

export const links = [
  {
    icon: <IconShoe className="w-6 h-6 md:h-9 md:w-9" />,
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
    icon: <IconHouse className="w-6 h-6 md:h-9 md:w-9" />,
    label: 'Föreningen',
    slug: 'foreningen',
    subLinks: [
      {
        label: 'Om Oss',
        slug: 'about',
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
  {
    icon: <IconHorse className="w-6 h-6 md:h-9 md:w-9" />,
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
        slug: 'faq',
      },
    ],
  },
];
