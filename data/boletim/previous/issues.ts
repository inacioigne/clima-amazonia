export type EditionIssue = {
  id: string;
  number: number;
  title: string;
  date: string;
  pdfHref: string;
  doi?: string;
};

export type EditionVolume = {
  id: string;
  volume: number;
  year: number;
  period: string;
  description: string;
  issues: EditionIssue[];
};

export const previousEditions: EditionVolume[] = [
  {
    id: 'v3-2026',
    volume: 3,
    year: 2026,
    period: 'Jan–Mar 2026',
    description:
      'Edições recentes com boletins semanais sobre precipitação, anomalias e tendências hidrológicas.',
    issues: [
      {
        id: 'v3n4',
        number: 4,
        title: 'Boletim Clima Amazônia',
        date: '22 jan 2026',
        pdfHref: '/lib/boletim/BHA_PT_20260128.pdf',
        doi: '10.0000/climaamazonia.v3n4',
      },
      {
        id: 'v3n3',
        number: 3,
        title: 'Boletim Clima Amazônia',
        date: '15 jan 2026',
        pdfHref: '/lib/boletim/BHA_PT_20260128.pdf',
        doi: '10.0000/climaamazonia.v3n3',
      },
      {
        id: 'v3n2',
        number: 2,
        title: 'Boletim Clima Amazônia',
        date: '08 jan 2026',
        pdfHref: '/lib/boletim/BHA_PT_20260128.pdf',
        doi: '10.0000/climaamazonia.v3n2',
      },
    ],
  },
  {
    id: 'v2-2025',
    volume: 2,
    year: 2025,
    period: 'Out–Dez 2025',
    description:
      'Conjunto de boletins com síntese de condições atuais e comparação com climatologia histórica.',
    issues: [
      {
        id: 'v2n12',
        number: 12,
        title: 'Boletim Clima Amazônia',
        date: '18 dez 2025',
        pdfHref: '/lib/boletim/BHA_PT_20260128.pdf',
      },
      {
        id: 'v2n11',
        number: 11,
        title: 'Boletim Clima Amazônia',
        date: '11 dez 2025',
        pdfHref: '/lib/boletim/BHA_PT_20260128.pdf',
      },
      {
        id: 'v2n10',
        number: 10,
        title: 'Boletim Clima Amazônia',
        date: '04 dez 2025',
        pdfHref: '/lib/boletim/BHA_PT_20260128.pdf',
      },
    ],
  },
  {
    id: 'v1-2024',
    volume: 1,
    year: 2024,
    period: 'Jul–Set 2024',
    description:
      'Primeira coleção do boletim com foco em monitoramento sazonal e sinais de extremos climáticos.',
    issues: [
      {
        id: 'v1n8',
        number: 8,
        title: 'Boletim Clima Amazônia',
        date: '26 set 2024',
        pdfHref: '/lib/boletim/BHA_PT_20260128.pdf',
      },
      {
        id: 'v1n7',
        number: 7,
        title: 'Boletim Clima Amazônia',
        date: '19 set 2024',
        pdfHref: '/lib/boletim/BHA_PT_20260128.pdf',
      },
      {
        id: 'v1n6',
        number: 6,
        title: 'Boletim Clima Amazônia',
        date: '12 set 2024',
        pdfHref: '/lib/boletim/BHA_PT_20260128.pdf',
      },
    ],
  },
];

export function getVolumeById(id: string) {
  return previousEditions.find((volume) => volume.id === id);
}
