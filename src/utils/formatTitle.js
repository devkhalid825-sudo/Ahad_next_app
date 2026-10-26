import React from 'react';

/**
 * Strips all HTML tags and converts <br> to a single space.
 * Perfect for alt attributes, aria-labels, search filtering, and plain text contexts.
 */
export const stripHtml = (text) => {
  if (!text || typeof text !== 'string') return text || '';
  return text
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Safely renders a title in JSX.
 * If the title contains HTML <br>, <br/>, <br />, or newline \n,
 * it splits them and renders actual React <br /> elements instead of literal string text.
 * Also strips any other HTML tags to prevent raw tags leaking into the UI.
 */
export const renderCardTitle = (title) => {
  if (!title) return '';
  if (typeof title !== 'string') return title;

  // Clean any HTML tags other than <br>
  const clean = title.replace(/<(?!br\s*\/?)[^>]+>/gi, '');

  if (!/<br\s*\/?>/i.test(clean) && !clean.includes('\n')) {
    return clean;
  }

  const parts = clean.split(/<br\s*\/?>|\n/gi);
  return parts.map((part, idx) => (
    <React.Fragment key={idx}>
      {idx > 0 && <br />}
      {part.trim()}
    </React.Fragment>
  ));
};
