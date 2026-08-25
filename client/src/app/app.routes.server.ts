// ============================================================
// Server-side route configuration for pre-rendering.
// Requires @angular/ssr and SSR build setup in angular.json.
// When SSR is enabled, import this from the server bootstrap.
// ============================================================

export interface PrerenderRoute {
  path: string;
  status?: number;
  headers?: Record<string, string>;
}

export const prerenderRoutes: PrerenderRoute[] = [
  { path: '', status: 200, headers: { 'Cache-Control': 'public, max-age=3600' } },
  { path: 'recent', status: 200, headers: { 'Cache-Control': 'public, max-age=3600' } },
  { path: 'about', status: 200, headers: { 'Cache-Control': 'public, max-age=3600' } },
  { path: 'contact', status: 200, headers: { 'Cache-Control': 'public, max-age=3600' } },
  { path: 'opportunities', status: 200, headers: { 'Cache-Control': 'public, max-age=3600' } },
  { path: '404', status: 404, headers: { 'Cache-Control': 'no-cache' } },
];

export async function getCategoryStaticPaths(): Promise<{ params: { categorySlug: string } }[]> {
  const registry = await import('../assets/data/tool-registry.json');
  const data = (registry as { default?: { categories: { slug: string }[] } }).default ?? registry;
  return data.categories.map((cat) => ({ params: { categorySlug: cat.slug } }));
}

export async function getToolStaticPaths(): Promise<{ params: { categorySlug: string; toolSlug: string } }[]> {
  const registry = await import('../assets/data/tool-registry.json');
  const data = (registry as { default?: { tools: { categorySlug: string; slug: string }[] } }).default ?? registry;
  return data.tools.map((tool) => ({
    params: { categorySlug: tool.categorySlug, toolSlug: tool.slug },
  }));
}
