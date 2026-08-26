/**
 * Master catalog entry for a tool. Lives in tool-registry.json.
 * Contains no content text — only structural metadata.
 */
export interface Tool {
  id: string;
  slug: string;
  name: string;
  categorySlug: string;
  icon: string;
  shortDescription: string;
  searchKeywords: string[];
  /** True for tools that need the full workspace width (e.g. clocks). */
  isFullWidth: boolean;
  /** Path to the per-tool content JSON file. */
  contentFile: string;
}

/** A tool category in the registry. */
export interface Category {
  slug: string;
  name: string;
  icon: string;
  description: string;
  /** Computed at load time from the tool list. */
  toolCount: number;
}

/** A single FAQ item. */
export interface FaqItem {
  question: string;
  answer: string;
}

/** A worked example for a tool. */
export interface ToolExample {
  title: string;
  description: string;
  input: string;
  output: string;
}

/** Content metadata loaded from a per-tool JSON file. */
export interface ToolMeta {
  title: string;
  description: string;
  howItWorks: string[];
  howToUse: string[];
  faq: FaqItem[];
  formula?: string;
  examples: ToolExample[];
}

/** A country/locale entry in locales.json. */
export interface Locale {
  countryCode: string;
  countryName: string;
  flag: string;
  /** Path to the flag image file (SVG). Falls back to `flag` emoji if absent. */
  flagImage?: string;
  currencyCode: string;
  currencySymbol: string;
  languages: string[];
}

/** Generic JSON-driven page content (about, contact, opportunities). */
export interface AppContent {
  title: string;
  description: string;
  sections: Array<{
    heading: string;
    body: string;
    icon?: string;
    ctaLabel?: string;
    ctaHref?: string;
  }>;
}

/** Search index entry (search-index.json). */
export interface SearchEntry {
  label: string;
  type: 'tool' | 'category';
  slug: string;
  categorySlug?: string;
  url: string;
  keywords: string[];
}
