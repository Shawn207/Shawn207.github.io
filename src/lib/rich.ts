import { isExternal, url } from './url';

const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Turns the small amount of markup used in the data files into HTML.
 * Supports [label](https://example.com) and [label](/internal/path/) links and nothing else,
 * so the data files stay plain text. Everything else is escaped.
 */
export const rich = (text: string): string =>
  escapeHtml(text).replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_match, label: string, href: string) => {
    const raw = href.replace(/&amp;/g, '&');
    if (isExternal(raw)) {
      return `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}<span class="sr-only"> (opens in a new tab)</span></a>`;
    }
    return `<a href="${escapeHtml(url(raw))}">${label}</a>`;
  });

/** The same text with the link markup removed, for meta descriptions and alt text. */
export const plain = (text: string): string => text.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '$1');

/** "Results and discussion" becomes "results-and-discussion". */
export const slugify = (text: string): string =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
