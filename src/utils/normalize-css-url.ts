/**
 * Removes the `?t=123456789` params from CSS stylesheet url in development mode.
 */
export const normalizeCssUrl = (url: string) =>
  import.meta.env.DEV ? url.split('?')[0] : url;
