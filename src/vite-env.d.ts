/// <reference types="vite/client" />

import { Theme } from './styles/theme';

declare module 'styled-components' {
  export type DefaultTheme = Theme;
}