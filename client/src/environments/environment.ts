/**
 * Default environment for Maaruri Tools.
 * The build replaces this with environment.development or environment.production
 * via the Angular CLI file replacements configured in angular.json.
 */
export const environment = {
  production: false,
  siteName: 'Maaruri Tools',
  baseUrl: '/',
  adsClientId: 'ca-pub-XXXXXXXXXXXXXXXX', // Replace with your Google AdSense publisher ID
  defaultLocale: 'IN',
};
