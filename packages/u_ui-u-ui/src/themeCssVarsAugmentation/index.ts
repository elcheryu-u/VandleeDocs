export {};
/**
 * Enhance the theme types to include new properties from the CssVarsProvider.
 * The theme is typed with CSS variables in `styled`, `sx`, `useTheme`, etc.
 */
declare module '@u_ui/u-ui/styles' {
  interface CssThemeVariables {
    enabled: true;
  }
}
