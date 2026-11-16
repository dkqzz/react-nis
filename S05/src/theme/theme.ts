export const THEME_NAMES = ['light', 'dark', 'sage'] as const;
export type ThemeName = (typeof THEME_NAMES)[number];

export const THEME_LABELS: Record<ThemeName, string> = {
  light: 'Светлая',
  dark: 'Тёмная',
  sage: 'Шалфей',
};

const lightColors = {
  background: '#f7f7f1',
  surface: '#ffffff',
  text: '#1b2a23',
  muted: '#506156',
  border: '#d3dcd3',
  controlBorder: '#76877b',
  primary: '#24553e',
  primaryHover: '#183e2d',
  onPrimary: '#ffffff',
  accentSurface: '#e9f1e8',
  danger: '#963b2b',
  dangerHover: '#783024',
  onDanger: '#ffffff',
  focus: '#316ac1',
  mediaTech: '#e6edf7',
  mediaHome: '#e9efe1',
  mediaOffice: '#f5e9da',
  mediaAccent: '#ffffff52',
  badgeNew: '#e8f4e9',
  badgeNewText: '#22563c',
  badgeDeal: '#fae8df',
  badgeDealText: '#873220',
  skeleton: '#e8ede7',
  shimmer: '#ffffffa0',
  shadow: '#192e2215',
};

export interface AppTheme {
  name: ThemeName;
  scheme: 'light' | 'dark';
  colors: typeof lightColors;
  space: (steps: number) => string;
  radius: { field: string; card: string; pill: string };
  breakpoint: { sm: string; md: string; lg: string };
}

const shared = {
  space: (steps: number) => `${steps * 4}px`,
  radius: { field: '10px', card: '20px', pill: '999px' },
  breakpoint: { sm: '560px', md: '840px', lg: '1120px' },
};

export const themes: Record<ThemeName, AppTheme> = {
  light: { ...shared, name: 'light', scheme: 'light', colors: lightColors },
  dark: {
    ...shared,
    name: 'dark',
    scheme: 'dark',
    colors: {
      background: '#151e19',
      surface: '#202c24',
      text: '#eef6ee',
      muted: '#b4c6b8',
      border: '#41564a',
      controlBorder: '#83988a',
      primary: '#9dd5b0',
      primaryHover: '#bce9ca',
      onPrimary: '#163525',
      accentSurface: '#2b4034',
      danger: '#ffb7a7',
      dangerHover: '#ffcec3',
      onDanger: '#522318',
      focus: '#a6c8ff',
      mediaTech: '#2b3a4d',
      mediaHome: '#344432',
      mediaOffice: '#4a392b',
      mediaAccent: '#ffffff13',
      badgeNew: '#2d4d3b',
      badgeNewText: '#c5efd0',
      badgeDeal: '#57372c',
      badgeDealText: '#ffccbd',
      skeleton: '#2d3b31',
      shimmer: '#ffffff16',
      shadow: '#00000040',
    },
  },
  sage: {
    ...shared,
    name: 'sage',
    scheme: 'light',
    colors: {
      ...lightColors,
      background: '#e6ebd9',
      surface: '#f9f9ef',
      text: '#26351f',
      muted: '#48583e',
      border: '#bfccb2',
      controlBorder: '#6f8263',
      primary: '#3c592c',
      primaryHover: '#2d4520',
      accentSurface: '#dce8ce',
      focus: '#3260a7',
      mediaTech: '#dce7dc',
      mediaHome: '#dce6c5',
      mediaOffice: '#efe7cd',
      skeleton: '#dce5cf',
    },
  },
};
