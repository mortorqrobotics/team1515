export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    lightAccent: string;
    mediumGray: string;
    bgColor?: string;
    success: '#28A745'
  };
  spacing: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
}

export const theme: Theme = {
  colors: {
    primary: '#FFA500',
    secondary: '#FFFFFF',
    accent: '#000000',
    background: '#FFFFFF',
    text: '#333333',
    lightAccent: '#FFF3E0',
    mediumGray: '#8d8d8d',
    bgColor: 'transparent',
    success: '#28A745'
  },
  spacing: {
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
};